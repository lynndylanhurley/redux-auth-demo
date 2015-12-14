# Redux Auth Demo

## [See It In Action][demo]

View a live demo of this project [here][demo].

Deploy this project to your own [Heroku][heroku] instance by clicking this button:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/lynndylanhurley/redux-auth-demo)

## What is this?

This is a fully configured [redux-auth][redux-auth] application. It includes the following:

* [React.js][react]
* [Babel 6][babel]
* [Redux][redux]
* Both [Material UI][material-ui] and [React Bootstrap][react-bootstrap] themes. (Just remove the one(s) that you don't want.)
* [Heroku][heroku] deployment. Click the "deploy" button at the top of this page to create your own instance.
* [Webpack][webpack] with live code reloading.
* Isomorphic / universal rendering. (The server renders the initial content.)

## Installation

~~~sh
git clone git@github.com:lynndylanhurley/redux-auth-demo.git
cd redux-auth-demo
npm install
~~~

## Usage

### Run The Dev Server

~~~sh
npm run watch
~~~

### Deploy to Heroku

Assuming that your production git remote is named `heroku`:

~~~sh
git push heroku master
~~~

### Project map

The following files are used in the configuration of this app:

~~~
config/
  default.json
  production.json

src/
  app.js
  client.js
  server.js
~~~

##### `config/default.json`
Set the url for your development API.

##### `config/production.json`
Set the url for your production API.

##### `src/app.js`
Configure your redux store, routes, and redux-auth settings.

##### `src/client.js`
Render your app client-side.

##### `src/server.js`
Initialize your app server-side.

## License

WTFPL © Lynn Dylan Hurley

[demo]: http://redux-auth.herokuapp.com
[heroku]: http://heroku.com/
[redux-auth]: https://github.com/lynndylanhurley/redux-auth
[react]: https://facebook.github.io/react
[material-ui]: http://www.material-ui.com
[react-bootstrap]: https://react-bootstrap.github.io
[webpack]: https://webpack.github.io
[redux]: https://github.com/rackt/redux
[babel]: https://babeljs.io
