import webpack from 'webpack';
import path from 'path';

const config = {
  debug: true,
  devtool: 'cheap-module-eval-source-map',
  noInfo: false,
  entry: [
    'webpack-hot-middleware/client?reload=true',
    './src/index.jsx',
  ],
  target: 'web',
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: './src',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'src'),
        loaders: ['babel'],
      },
      {
        test: /(\.css)$/,
        loaders: ['style', 'css'],
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.d+)?$/,
        loader: 'file' },
      {
        test: /\.(woff|woff2)$/,
        loader: 'url?prefix=font/&limit=5000',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml',
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};

export default config;
