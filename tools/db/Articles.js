var cheerio = require('cheerio');
var request = require('request');
import mockNewsApi from '../../src/api/mockNewsApi';
import mockToneApi from '../../src/api/mockToneApi';


exports.get = searchTerm =>
  mockNewsApi.getArticles(searchTerm)
  .then(scrapeArticles)
  .then(analyzeTones)
  .then(analyzed => {
    console.log('model 16',analyzed)
    return analyzed;
  });


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
}


const scrapeOneArticle = article =>
  new Promise((resolve, reject) => {
    let url = article.url;
    //  last characters of snippet are ' ...'
    let searchText = article.snippet.slice(-26,-6);
    request(url, (err,response,body) => {
      if(err) reject(err);
      let $ = cheerio.load(body);
      let searchResult = $(`p:contains("${searchText}")`);
      if (!searchResult) reject(new Error("Scraper can't find snippet"));
      let textResult = searchResult.text() + searchResult.siblings(':not("script")').text();
      resolve(textResult);
    });
  });


const analyzeTones = articles => {
  const tonePromises = articles.map(article => {
    return analyzeOneTone(article)
      .then(tone => {
        console.log('model 63 tone',tone);
        article.tone = tone;
        return article;
      })
      .catch(err => console.log(err));
  });
  return Promise.all(tonePromises)
}


const analyzeOneTone = article => {
  return mockToneApi.getTone(article)
}






