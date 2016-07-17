/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
//import useScroll from 'scroll-behavior/lib/useStandardScroll';

import { initialize } from "./app";

//const _browserHistory = useScroll(() => browserHistory)();
const dest = document.getElementById('content');

console.log('@-->api url', window.__API_URL__);

initialize({apiUrl: window.__API_URL__}).then(({provider}) => {
  ReactDOM.render(
    provider,
    dest
  );
})

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger

  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}
