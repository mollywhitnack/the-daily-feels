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


const analyzeOneTone = article =>
  mockToneApi.getTone(article)
;


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


exports.get = searchTerm =>
  mockNewsApi.getArticles(searchTerm)
  .then(scrapeArticles)
  .then(analyzeTones)
  .then(analyzed =>
    analyzed
  );

