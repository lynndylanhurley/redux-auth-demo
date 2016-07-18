import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import config from './config';
import favicon from 'serve-favicon';
import compression from 'compression';
import path from 'path';
import Html from './helpers/Html';
import PrettyError from 'pretty-error';
import http from 'http';
import qs from 'query-string';
import { initialize } from './app';
import { match } from 'react-router';
import { loadOnServer } from 'redux-connect';

const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);
const apiUrl = config.apiUrl;

app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));
app.use(Express.static(path.join(__dirname, '..', 'static')));

app.use((req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }
  const query = qs.stringify(req.query);
  const location = `${req.path}${(query.length ? `?${query}` : '')}`;

  function hydrateOnClient(store) {
    const html = ReactDOM.renderToString(
      <Html
        assets={webpackIsomorphicTools.assets()}
        store={store}
      />
    );
    res.send(`<!doctype html>\n ${html}`);
  }

  initialize({
    apiUrl,
    isServer: true,
    cookies: req.headers.cookie,
    currentLocation: location,
    userAgent: req.headers['user-agent']
  })
    .then(({ store, provider, blank, routes, history }) => {
      if (blank) {
        res.send('<!doctype html><body>loading...</body>');
        return;
      }

      if (__DISABLE_SSR__) {
        hydrateOnClient(store);
        return;
      }

      match({ routes, location, history }, (error, redirectLocation, renderProps) => {
        if (redirectLocation) {
          res.redirect(redirectLocation.pathname + redirectLocation.search);
        } else if (error) {
          console.error('ROUTER ERROR:', pretty.render(error));
          res.status(500);
          hydrateOnClient(store);
        } else if (renderProps) {
          loadOnServer({ ...renderProps, store, helpers: {} }).then(() => {
            res.status(200);
            global.navigator = { userAgent: req.headers['user-agent'] };
            const html = ReactDOM.renderToString(
              <Html
                apiUrl={apiUrl}
                assets={webpackIsomorphicTools.assets()}
                component={provider}
                store={store}
              />
            );
            res.send(`<!doctype html>\n${html}`);
          });
        } else {
          res.status(404).send('Not found');
        }
      });
    }).catch(e => console.log('@-->server error', e, e.stack));
});

if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info(
      '----\n==> ✅  %s is running, talking to API server on %s.',
      config.app.title,
      config.apiPort
    );
    console.info(
      '==> 💻  Open http://%s:%s in a browser to view the app.',
      config.host,
      config.port
    );
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
