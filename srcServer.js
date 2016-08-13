var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');

const port = process.env.config || 3000;
const app = express();

var api = require('./api');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '/dist')));

app.use('./api', api);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

app.listen(port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`listening on :${port}`);
  }
});

