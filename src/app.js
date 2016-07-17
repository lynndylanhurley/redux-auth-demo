import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import {
  Router,
  Route,
  IndexRoute,
  createMemoryHistory,
  browserHistory
} from 'react-router';
import { configure, authStateReducer } from 'redux-auth';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { routerReducer, syncHistoryWithStore } from 'react-router-redux';
import demoButtons from './reducers/request-test-buttons';
import demoUi from './reducers/demo-ui';
import thunk from 'redux-thunk';
import Main from './containers/Main';
import Account from './containers/Account';
import SignIn from './containers/SignIn';
import Container from './components/Container';
import GlobalComponents from './components/GlobalComponents';

class App extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return (
      <Container>
        <GlobalComponents />
        {this.props.children}
      </Container>
    );
  }
}

function requireAuth(store, nextState, replace, next) {
  if (!store.getState().auth.getIn(['user', 'isSignedIn'])) {
    replace('/login');
  }
  next();
}

export function initialize({ apiUrl, cookies, isServer, currentLocation, userAgent } = {}) {
  const reducer = combineReducers({
    auth: authStateReducer,
    routing: routerReducer,
    demoButtons,
    demoUi
  });

  let history = (isServer)
    ? createMemoryHistory(currentLocation)
    : browserHistory;

  // create the redux store
  const store = createStore(
    reducer,
    compose(
      applyMiddleware(thunk)
    )
  );

  history = syncHistoryWithStore(history, store);

  // define app routes
  const routes = (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Main} />
        <Route path="login" component={SignIn} />
        <Route
          onEnter={requireAuth.bind(this, store)}
          component={Account}
          path="account"
        />
      </Route>
    </Router>
  );

  /**
   * The React Router 1.0 routes for both the server and the client.
   */
  return store.dispatch(configure([
    {
      default: { apiUrl }
    }, {
      evilUser: {
        apiUrl,
        signOutPath: '/mangs/sign_out',
        emailSignInPath: '/mangs/sign_in',
        emailRegistrationPath: '/mangs',
        accountUpdatePath: '/mangs',
        accountDeletePath: '/mangs',
        passwordResetPath: '/mangs/password',
        passwordUpdatePath: '/mangs/password',
        tokenValidationPath: '/mangs/validate_token',
        authProviderPaths: {
          github: '/mangs/github',
          facebook: '/mangs/facebook',
          google: '/mangs/google_oauth2'
        }
      }
    }
  ], {
    cookies,
    isServer,
    currentLocation
  })).then(({ redirectPath, blank } = {}) => {
    // hack for material-ui server-side rendering.
    // see https://github.com/callemall/material-ui/pull/2007
    if (userAgent) {
      global.navigator = { userAgent };
    }

    return ({
      blank,
      store,
      redirectPath,
      routes,
      history,
      provider: (
        <Provider store={store} key="provider" children={routes} />
      )
    });
  });
}
