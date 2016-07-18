const jsdom = require('jsdom').jsdom;
const fetchMock = require('fetch-mock');
const mockery = require('mockery');

const exposedProperties = ['window', 'navigator', 'document'];

mockery.enable({
  warnOnReplace: false,
  warnOnUnregistered: false
});
mockery.registerMock('isomorphic-fetch', fetchMock.fetchMock);

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};
