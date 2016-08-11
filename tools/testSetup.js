/* eslint-disable no-var */

process.env.NODE_ENV = 'test';

require('babel-register')();

require.extensions['.css'] = () => null;
require.extensions['.png'] = () => null;
require.extensions['.jpg'] = () => null;

const exposedProperties = ['window', 'navigator', 'document'];
const jsdom = require('jsdom').jsdom;

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js',
};

documentRef = document;  //  eslint-disable-line no-undef

