var cheerio = require('cheerio');
var request = require('request');

let url = 'http://411mania.com/music/president-obama-reveals-summer-playlist-nas-prince-beach-boys-more/';

let text = "President Obama has revealed his playlist for the summer. Obama posted his playlist online which includes tracks from Nas, Prince, the Beach Boys, Mary J. Blige and more." 

let searchText = text.slice(-26,-6);

request(url, (err,response,body) => {
  if(err) throw err;
  let $ = cheerio.load(body);

  let searchResult = $(`p:contains("${searchText}")`);

  let textResult = searchResult.text() + searchResult.siblings(':not("script")').text();
  console.log('result', textResult);

});

