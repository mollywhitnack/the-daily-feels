/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

require('dotenv').config();
const cheerio = require('cheerio');
const request = require('request');
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

  const formattedArticles = parsedArticles.result.docs.map(el => {
    if (!Object.keys(el).length) {
      return null;
    }
    return {
      title: el.source.enriched.url.title,
      snippet: el.source.enriched.url.text,
      url: el.source.original.url,
      id: el.id,
    };
  })
    .filter(el => el !== null);

  console.log('formattedArticles pre', formattedArticles);
  return Promise.resolve(formattedArticles);
}


function scrapeArticles(formattedArticles) {
  console.log('formattedArticles post', formattedArticles);
  const scrapedArticlePromises = formattedArticles.map(formattedArticle =>
    scrapeOneArticle(formattedArticle)
      .then(scrapedText => {
        console.log('scrapedText', scrapedText);
        const scrapedArticle = Object.assign({}, formattedArticle);
        scrapedArticle.text = scrapedText;
        return scrapedArticle;
      })
      .catch(err => console.log(err))
  );

  return Promise.all(scrapedArticlePromises)
    .then(scrapedArticles => {
      const articlesToReturn = scrapedArticles.filter(article => article.text);
      return articlesToReturn;
    });
}

function scrapeOneArticle(article) {
  return new Promise((resolve, reject) => {
    const url = article.url;
    const searchText = createScrapeSearchText(article.snippet, article.snippet.length - 6);
    request(url, (err, response, body) => {
      if (err) reject(err);
      const $ = cheerio.load(body);
      let searchResult = $(`p:contains(${searchText})`);
      if (!searchResult.length) {
        searchResult = $(`span:contains(${searchText})`);
      }
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
  //  mockToneApi.getTone(article)
}

exports.get = searchTerm => {  //  eslint-disable-line arrow-body-style
  // const newsApiKey = process.env.ALCH_API || null;
  // const newsUrl = `https://gateway-a.watsonplatform.net/calls/data/GetNews?apikey=${newsApiKey}&outputMode=json&start=now-1d&end=now&dedup=true&q.enriched.url.title=${searchTerm}&return=enriched.url.text,enriched.url.title,original.url`;
  //
  // const newsRequestPromise = new Promise((resolve, reject) => {
  //   request(newsUrl, (err, response, body) => {
  //     if (err) reject(err);
  //     return resolve(body);
  //   });
  // });
  // return newsRequestPromise
  //   .then(formatArticles)
  //   .then(scrapeArticles)
  //   .then(analyzeTones)
  //   .then(stuff => {
  //     console.log(stuff);
  //     return stuff;
  //   })
  //   .catch(err => console.log(err));

  return mockNewsApi.getArticles(searchTerm)
    .then(formatArticles)
    .then(scrapeArticles)
    .then(analyzeTones);
};
