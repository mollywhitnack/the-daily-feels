/* eslint-disable no-console */
const cheerio = require('cheerio');
const request = require('request');
import mockNewsApi from '../../src/api/mockNewsApi';
import mockToneApi from '../../src/api/mockToneApi';


const scrapeOneArticle = article =>
  new Promise((resolve, reject) => {
    const url = article.url;
    //  last characters of snippet are ' ...'
    const searchText = article.snippet.slice(-26, -6);
    request(url, (err, response, body) => {
      if (err) reject(err);
      const $ = cheerio.load(body);
      const searchResult = $(`p:contains("${searchText}")`);
      if (!searchResult) reject(new Error("Scraper can't find snippet"));
      const textResult = searchResult.text() + searchResult.siblings(':not("script")').text();
      resolve(textResult);
    });
  });


const analyzeOneTone = article => {
  const toneAnalyzerUsername = process.env.TONE_ANALYZER_USERNAME || null;
  const toneAnalyzerPassword = process.env.TONE_ANALYZER_PASSWORD || null;

  const toneUrl = `https://${toneAnalyzerUsername}:${toneAnalyzerPassword}@gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2016-05-19&text=${article.text}`;

  const toneRequestPromise = new Promise((resolve, reject) => {
    request({ toneUrl }, (err, response, body) => {
      if (err) reject(err);
      return resolve(body);
    });
  });

  return toneRequestPromise;
  // return mockToneApi.getTone(article);
};


const scrapeArticles = articles => {
  const scrapedArticlePromises = articles.result.docs.map(article => {
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
        newArticle.tone = tone;
        return newArticle;
      })
      .catch(err => console.log(err))
  );
  return Promise.all(tonePromises);
};


exports.get = searchTerm => {
  const newsApiKey = process.env.ALCHEMY_API_KEY || null;
  const newsUrl = `https://gateway-a.watsonplatform.net/calls/data/GetNews?apikey=${newsApiKey}&outputMode=json&start=now-1d&end=now&q.enriched.url.title=${searchTerm}&return=enriched.url.text,enriched.url.title,original.url`;

  const newsRequestPromise = new Promise((resolve, reject) => {
    request({ newsUrl }, (err, response, body) => {
      if (err) reject(err);
      return resolve(body);
    });
  });

  // return mockNewsApi(searchTerm)
  return newsRequestPromise
    .then(scrapeArticles)
    .then(analyzeTones);
};

