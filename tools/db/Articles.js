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

const scrapeOneArticle = article =>
  new Promise((resolve, reject) => {
    const url = article.url;
    //  last characters of snippet are ' ...'
    const searchText = article.snippet.slice(-26, -6).replace(/\)/g,"\\)").replace(/"/g,"\\\"");
    request(url, (err, response, body) => {
      if (err) reject(err);
      const $ = cheerio.load(body);
      const searchResult = $(`p:contains(${searchText})`);
      if (!searchResult) reject(new Error("Scraper can't find snippet"));
      const textResult = searchResult.text() + searchResult.siblings(':not("script")').text();
      resolve(textResult);
    });
  });


const analyzeOneTone = article => {
  const toneRequestPromise = new Promise((resolve, reject) => {
    toneAnalyzer.tone({ text: article.text },
      (err, body) => {
        if (err) reject(err);
        return resolve(body);
      });
  });
  return toneRequestPromise;

  // return mockToneApi.getTone(article)
};


const scrapeArticles = articles => {
  try {
    var parsedArticles = JSON.parse(articles);
  } catch (e) {
    var parsedArticles = articles;
  }

  const scrapedArticlePromises = parsedArticles.result.docs.map(article => {
    const formattedArticle = {
      title: article.source.enriched.url.title,
      snippet: article.source.enriched.url.text,
      url: article.source.original.url,
      id: article.id,
    };

    return scrapeOneArticle(formattedArticle)
      .then(scrapedText => {
        formattedArticle.text = scrapedText;
        return formattedArticle;
      })
      .catch(err => console.log(err));
  });

  return Promise.all(scrapedArticlePromises)
    .then(scrapedArticles => {
      const articlesToReturn = scrapedArticles.filter(article => article.text);
      return articlesToReturn;
    });
};


const analyzeTones = articles => {
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
};


exports.get = searchTerm => {

  // const newsApiKey = process.env.ALCH_API || null;
  // const newsUrl = `https://gateway-a.watsonplatform.net/calls/data/GetNews?apikey=${newsApiKey}&outputMode=json&start=now-1d&end=now&q.enriched.url.title=${searchTerm}&return=enriched.url.text,enriched.url.title,original.url`;
  // const newsRequestPromise = new Promise((resolve, reject) => {
  //   request(newsUrl, (err, response, body) => {
  //     if (err) reject(err);
  //     return resolve(body);
  //   });
  // });
  // return newsRequestPromise
  //   .then(scrapeArticles)
  //   .then(analyzeTones)
  //   .catch(err => console.log(err))


  return mockNewsApi.getArticles(searchTerm)
    .then(scrapeArticles)
    .then(analyzeTones);
  
};

