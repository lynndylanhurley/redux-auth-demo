# Redux Auth Demo

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/lynndylanhurley/redux-auth-demo)

# What is this?

This is a fully configured [redux-auth][redux-auth] application. It includes the following:

* [React.js][react]
* [Babel 6][babel]
* [Redux][redux]
* Both [Material UI][material-ui] and [React Bootstrap][react-bootstrap] themes. (Just remove the one(s) that you don't want.)
* [Heroku][heroku] deployment. Click the "deploy" button at the top of this page to create your own instance.
* [Webpack][webpack] with live code reloading.
* Isomorphic / universal rendering. (The server renders the initial content.)

# Installation

~~~sh
git clone git@github.com:lynndylanhurley/redux-auth-demo.git
cd redux-auth-demo
npm install
~~~

# Usage

## Run The Dev Server

~~~sh
npm run watch
~~~

## Deploy to Heroku

Assuming that you have a git remote called `heroku`:

~~~sh
git push heroku master
~~~

# License

WTFPL © Lynn Dylan Hurley

[heroku]: http://heroku.com/
[redux-auth]: https://github.com/lynndylanhurley/redux-auth
[react]: https://facebook.github.io/react
[material-ui]: http://www.material-ui.com
[react-bootstrap]: https://react-bootstrap.github.io
[webpack]: https://webpack.github.io
[redux]: https://github.com/rackt/redux
[babel]: https://babeljs.io
