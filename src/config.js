require('babel-polyfill');
const config = require('config');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiUrl: config.get('apiUrl'),
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'Redux Auth',
    description: 'Simple, secure authentication for React + Redux.',
    head: {
      titleTemplate: 'Redux Auth: %s',
      meta: [
        { name: 'description', content: 'Simple, secure authentication for React + Redux.' },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: 'Redux Auth' },
        { property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:title', content: 'Redux Auth' },
        { property: 'og:description', content: 'Simple, secure authentication for React + Redux.' },
        { property: 'og:card', content: 'summary' },
        { property: 'og:site', content: '@lynndylanhurley' },
        { property: 'og:creator', content: '@lynndylanhurley' },
        { property: 'og:image:width', content: '200' },
        { property: 'og:image:height', content: '200' }
      ]
    }
  },

}, environment);
