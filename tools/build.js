/* eslint-disable no-console */
import webpack from 'webpack';
import webpackConfig from '../webpack.config';
import 'colors';

process.env.NODE_ENV = 'development';

console.log(`Generating minified bundle for production via webpack.
This will take a moment....`.blue);

webpack(webpackConfig).run((err, stats) => {
  if (err) {
    console.log(err.bold.red);
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(error.red));
  }

  if (jsonStats.hasWarnings) {
    console.log('Webpack generated the folowing warnings: '.bold.yellow);
    jsonStats.warnings.map(warning => console.log(warning.yellow));
  }

  console.log(`Webpack stats: ${stats}`);

  // if we go this far buld succedded
  console.log('Your app has been compiled in production mode and written to /dist. GOOD'.green);
  return 0;
});
