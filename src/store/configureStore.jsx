const prodConfig = require('./configureStore.prod');
const devConfig = require('./configureStore.dev');

if (process.env.NODE_ENV === 'production') {
  module.exports = prodConfig;
} else {
  module.exports = devConfig;
}

