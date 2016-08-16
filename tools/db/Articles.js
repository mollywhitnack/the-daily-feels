/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

require('dotenv').config();
const cheerio = require('cheerio');
const request = require('request');
const uuid = require('uuid');
import mockNewsApi from '../../src/api/mockNewsApi';
import mockToneApi from '../../src/api/mockToneApi';

const toneAnalyzerUsername = process.env.TONE_ANALYZER_USERNAME || null;
const toneAnalyzerPassword = process.env.TONE_ANALYZER_PASSWORD || null;

const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
const toneAnalyzer = new ToneAnalyzerV3({
  username: toneAnalyzerUsername,
  password: toneAnalyzerPassword,
  version_date: '2016-05-19',
});


function formatArticles(articles) {
  let parsedArticles;
  try {
    parsedArticles = JSON.parse(articles);
  } catch (e) {
    parsedArticles = articles;
  }
  // console.log("parsedArticles", parsedArticles);

  let formattedArticles;

  //  articles are from alchemy
  if (parsedArticles.result) {
    formattedArticles = parsedArticles.result.docs.map(el => {
      if (!Object.keys(el).length) {
        return null;
      }
      return {
        title: el.source.enriched.url.title,
        snippet: el.source.enriched.url.text,
        url: el.source.original.url,
        id: uuid(),
      };
    })
      .filter(el => el !== null);
  } 
  //  articles are from bing
  else if (parsedArticles.value) {
    formattedArticles = parsedArticles.value.map(el => {
      if (!Object.keys(el).length) {
        return null;
      }
      return {
        title: el.name,
        snippet: el.description,
        url: el.url,
        id: uuid(),
      };
    })
      .filter(el => el !== null);
  }


  return Promise.resolve(formattedArticles);
}


function scrapeArticles(formattedArticles) {

  const scrapedArticlePromises = formattedArticles.map(formattedArticle =>
    scrapeOneArticle(formattedArticle)
      .then(scrapedText => {
        const scrapedArticle = Object.assign({}, formattedArticle);
        console.log('scrapedArticle: ', scrapedArticle);
        scrapedArticle.text = scrapedText;
        return scrapedArticle;
      })
      .catch(err => console.log(err))
  );

  return Promise.all(scrapedArticlePromises)
    .then(scrapedArticles => {
      // console.log('scrapedArticles', scrapedArticles)
      const articlesToReturn = scrapedArticles.filter(article => article.text);
      return articlesToReturn;
    });
}

function scrapeOneArticle(article) {
  let configObj = {
    url: article.url,
    searchText: createScrapeSearchText(article.snippet, article.snippet.length - 6),
    maxRedirects: 100,
    followRedirects: false 

  }
  return new Promise((resolve, reject) => {
    // const url = article.url;
    const searchText = createScrapeSearchText(article.snippet, article.snippet.length - 6);
    // // console.log("searchtext",searchText)
    request(configObj, (err, response, body) => {
      // console.log('scrapeOneArticles body', body )
      if (err) reject(err);
      if(!body) {return resolve("")};
      const $ = cheerio.load(body);
      let searchResult = $(`p:contains(${searchText})`);
      if (!searchResult.length) {
        searchResult = $(`span:contains(${searchText})`);
      }
      // console.log('searchResult:', searchResult.text());

      const textResult = searchResult.text() +
        searchResult.siblings(':not(:has("script"))').not('script').text();
      resolve(textResult);
    });
  });
}

function createScrapeSearchText(snippet, lastChar) {
  if (snippet.length < 20) {
    return snippet.replace(/\W/g, ' ');
  }
  const searchText = snippet.slice(lastChar - 20, lastChar);
  const matchResult = searchText.match(/[)("]/);
  if (lastChar - 20 < 0) {
    return null;
  }
  if (matchResult) {
    return createScrapeSearchText(snippet, lastChar - matchResult.index - 1);
  }
  return searchText;
}


function analyzeTones(articles) {
  const tonePromises = articles.map(article =>
    analyzeOneTone(article)
      .then(tone => {
        const newArticle = Object.assign({}, article);
        newArticle.tone = tone.document_tone.tone_categories[0].tones;
        return newArticle;
      })
      .catch(err => console.log(err))
  );
  return Promise.all(tonePromises);
}

function analyzeOneTone(article) {

  return new Promise((resolve, reject) => {
    toneAnalyzer.tone({ text: article.text },
      (err, tone) => {
        if (err) reject(err);
        return resolve(tone);
      });
  });
   // return mockToneApi.getTone(article)

}

// Bing Search 
exports.get = searchTerm => {
  const bingApiKey = process.env.BING_API || null;
  console.log(bingApiKey);
  const newsConfigObj = {
    url: `https://api.cognitive.microsoft.com/bing/v5.0/news/search?q=${searchTerm}&count=30&offset=0&mkt=en-us&safeSearch=Off`,
    headers: {
      'Ocp-Apim-Subscription-Key': bingApiKey
    }
  } 
  const newsRequestPromise = new Promise((resolve, reject) => {
    request(newsConfigObj, (err, response, body) => {
      if (err) reject(err);
      // console.log(body)
      return resolve(body);
    });
  });
  return newsRequestPromise
    .then(formatArticles)
    .then(stuff => {
      // console.log('afterformat',stuff)
      return stuff; 
    })
    .then(scrapeArticles)
    .then(analyzeTones)
    .then(stuff => {
      console.log(stuff);
      return stuff;
    })
    .catch(err => console.log(err));

}

//   return mockNewsApi.getArticles(searchTerm)
//     .then(formatArticles)
//     .then(scrapeArticles)
//     .then(analyzeTones);
// };
// exports.get = searchTerm => {  //  eslint-disable-line arrow-body-style
//   const newsApiKey = process.env.ALCH_API || null;
//   const newsUrl = `https://gateway-a.watsonplatform.net/calls/data/GetNews?apikey=${newsApiKey}&outputMode=json&start=now-1d&end=now&dedup=true&q.enriched.url.title=${searchTerm}&return=enriched.url.text,enriched.url.title,original.url`;

//   const newsRequestPromise = new Promise((resolve, reject) => {
//     request(newsUrl, (err, response, body) => {
//       if (err) reject(err);
//       return resolve(body);
//     });
//   });
//   return newsRequestPromise
//     .then(formatArticles)
//     .then(scrapeArticles)
//     .then(analyzeTones)
//     .then(stuff => {
//       console.log(stuff);
//       return stuff;
//     })
//     .catch(err => console.log(err));

