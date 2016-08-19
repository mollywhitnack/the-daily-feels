/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable strict */
'use strict';

require('dotenv').config();
const cheerio = require('cheerio');
const request = require('request');
const uuid = require('uuid');
const mockNewsApi = require('../../src/api/mockNewsApi');
const mockToneApi = require('../../src/api/mockToneApi');

const toneAnalyzerUsername = process.env.TONE_ANALYZER_USERNAME || null;
const toneAnalyzerPassword = process.env.TONE_ANALYZER_PASSWORD || null;

const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
const toneAnalyzer = new ToneAnalyzerV3({
  username: toneAnalyzerUsername,
  password: toneAnalyzerPassword,
  version_date: '2016-05-19',
});


function parseArticles(articles) {
  let parsedArticles;
  try {
    parsedArticles = JSON.parse(articles);
  } catch (e) {
    parsedArticles = articles;
  }
  return parsedArticles.value;
}

function scrapeArticles(articles) {
  const scrapedArticlePromises = articles.map(article =>
    scrapeOneArticle(article)
      .then(scrapedText => {
        const scrapedArticle = Object.assign({}, article);
        scrapedArticle.text = scrapedText;
        return scrapedArticle;
      })
      .catch(err => console.log('scrape err', err))
  );

  return Promise.all(scrapedArticlePromises)
    .then(scrapedArticles => {
      const articlesToReturn = scrapedArticles.filter((article, ind) => {
        if (article) {
          return article.text;
        }
        return null;
      });
      return articlesToReturn;
    });
}

function scrapeOneArticle(article) {
  const configObj = {
    url: article.url,
    'User-Agent': 'thedailyfeels',
    maxRedirects: 50,
    followRedirects: true,
  };
  return new Promise((resolve, reject) => {
    const searchText = createScrapeSearchText(article.description, article.description.length - 6);
    request(configObj, (err, response, body) => {
      if (err) return reject(err);
      if (!body) return resolve('');
      const $ = cheerio.load(body);
      let searchResult = $(`p:contains(${searchText})`);
      if (!searchResult.length) {
        searchResult = $(`span:contains(${searchText})`);
      } const textResult = searchResult.text() +
        searchResult.siblings(':not(:has("script"))').not('script').text();
      return resolve(textResult);
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
}

function formatArticles(articles) {
  const formattedArticles = articles.map(el =>
    formatOneArticleFromBing(el)
  )
    .filter(el => el !== null);

  return formattedArticles;
}

function formatOneArticleFromBing(article) {
  return (article && Object.keys(article).length) ?
    {
      title: article.name,
      snippet: article.description.slice(0, 140),
      url: article.url,
      id: uuid(),
      text: article.text,
      tone: article.tone,
    }
    : null;
}

function getDominantTone(articles) {
  return articles.map(article => {
    const articleToReturn = Object.assign({}, article);
    const stdArr = [0.1178, 0.1718, 0.1971, 0.0906, 0.0748];
    const meanArr = [0.5781, 0.4558, 0.3586, 0.1049, 0.1292];
    const toneColors = ['anger', 'disgust', 'fear', 'joy', 'sadness'];
    const std = [];
    let dominantTone;

    for (let i = 0; i < articleToReturn.tone.length; i++) {
      const toneStds = (articleToReturn.tone[i].score - meanArr[i]) / stdArr[i];
      articleToReturn.tone[i].std = (toneStds < 10) ? (toneStds + 4.6) : 9.9;
      std.push(toneStds);
    }

    for (let i = 0; i < articleToReturn.tone.length; i++) {
      const stdMax = Math.max.apply(null, std);

      if (std[i] === stdMax) {
        articleToReturn.dominantTone = toneColors[i];
      }
    }
    return articleToReturn;
  });
}

exports.get = searchTerm => {
  const bingApiKey = process.env.BING_API || null;
  const newsConfigObj = {
    url: `https://api.cognitive.microsoft.com/bing/v5.0/news/search?q=${searchTerm}&count=40&offset=0&mkt=en-us&safeSearch=Off`,
    headers: {
      'Ocp-Apim-Subscription-Key': bingApiKey,
    },
  };

  const newsRequestPromise = new Promise((resolve, reject) => {
    request(newsConfigObj, (err, response, body) => {
      if (err) reject(err);
      return resolve(body);
    });
  });

  return newsRequestPromise
    .then(parseArticles)
    .then(scrapeArticles)
    .then(analyzeTones)
    .then(formatArticles)
    .then(getDominantTone)
    .catch(err => console.log(err));
};




//   console.log('using mock news api');
//   return mockNewsApi.getArticles(searchTerm)
//     .then(parseArticles)
//     .then(scrapeArticles)
//     .then(analyzeTones)
//     .then(formatArticles)
//     .then(getDominantTone)
//     .catch(err => console.log('end err', err));
// };


// //  news from alchemy
// exports.get = searchTerm => {  //  eslint-disable-line arrow-body-style
//   const newsApiKey = process.env.ALCH_API || null;
//   const newsUrl = `https://gateway-a.watsonplatform.net/calls/data/GetNews?apikey=${newsApiKey}&outputMode=json&start=now-1d&end=now&dedup=true&q.enriched.url.title=${searchTerm}&return=enriched.url.text,enriched.url.title,original.url`;
//
//   const newsRequestPromise = new Promise((resolve, reject) => {
//     request(newsUrl, (err, response, body) => {
//       if (err) reject(err);
//       return resolve(body);
//     });
//   });
//   return newsRequestPromise
//     .then(parseArticles)
//     .then(formatArticles)
//     .then(scrapeArticles)
//     .then(analyzeTones)
//     .then(stuff => {
//       console.log(stuff);
//       return stuff;
//     })
//     .catch(err => console.log(err));
//
// function formatOneArticleFromAlchemy(article) {
//   return (Object.keys(article).length) ?
//     {
//       title: article.source.enriched.url.title,
//       snippet: article.source.enriched.url.text,
//       url: article.source.original.url,
//       id: uuid(),
//     }
//     : null;
// }
//
