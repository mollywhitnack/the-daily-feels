import morgan from 'morgan';
import bodyParser from 'body-parser';
import express from 'express';
import webpack from 'webpack';
import path from 'path';
import api from './api';

import config from '../webpack.config';

/* eslint-disable no-console */

const port = process.env.config || 3000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`listening on :${port}`);
  }
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

