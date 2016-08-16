const webpack = require('webpack');
const path = require('path');

let config = {}

const port = process.env.PORT || 3000;
console.log('in webpack');

if(process.env.NODE_ENV === 'development'){

  console.log('dev');
  config = {
    debug: true,
    devtool: 'cheap-module-eval-source-map',
    noInfo: false,
    entry: [
      'webpack-hot-middleware/client?reload=true',
      './src/index',
    ],
    target: 'web',
    output: {
      path: path.join(__dirname, '/dist'),
      publicPath: `http://localhost:${port}/`,  //  absolute path is a necessary workaround for css sourcemaps and background-images
      filename: 'bundle.js',
    },
    devServer: {
      contentBase: '/',
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
          test: /\.eot(\?v=\d+\.\d+\.d+)?$/,
          loader: 'file',
        },
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
        {
          test: /\.(jpe?g|png|gif)$/i,
          loader: 'file?name=[name].[ext]',
        },
        {
          test: /(\.css|\.scss)$/,
          loaders: ['style', 'css?sourceMap', 'sass?sourceMap'],
        },
      ],
    },
    resolve: {
      extensions: ['', '.js', '.jsx'],
    },
  };
}

else{
console.log('prod');
  config = {
    devtool: 'source-map',

    entry: [
      './src/styles/styles.scss',
      './src/styles/splashPage.scss',
      './src/index'
    ],

    target: 'web',
    output: {
      path: path.join(__dirname, 'production/client'),
      publicPath: '/',
      filename: 'bundle.js'
    },
    plugins: [
      new webpack.NoErrorsPlugin()
    ],
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          include: path.join(__dirname, 'src'),
          loaders: ['babel'],
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.d+)?$/,
          loader: 'file',
        },
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
        {
          test: /\.(jpe?g|png|gif)$/i,
          loader: 'file?name=[name].[ext]',
        },
        {
          test: /(\.css|\.scss)$/,
          loaders: ['style', 'css?sourceMap', 'sass?sourceMap'],
        },
      ],
    },
    resolve: {
      extensions: ['', '.js', '.jsx'],
    },
  };

}

module.exports = config;
