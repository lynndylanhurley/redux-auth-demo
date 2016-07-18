#!/usr/bin/env node
require('../server.babel'); // babel registration (runtime transpilation for node)
const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
const path = require('path');
const rootDir = path.resolve(__dirname, '..');
/**
 * Define isomorphic constants.
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = false;  // <----- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

if (__DEVELOPMENT__) {
  if (!require('piping')({
    hook: true,
    ignore: /(\/\.|~$|\.json|\.scss$)/i
  })) {
    return;
  }
}

global.webpackIsomorphicTools = new WebpackIsomorphicTools(
  require('../webpack/webpack-isomorphic-tools')
)
  .development(__DEVELOPMENT__)
  .server(rootDir, () => {
    require('../src/server');
  });
