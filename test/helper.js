import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import demoButtons from '../src/reducers/request-test-buttons';
import demoUi from '../src/reducers/demo-ui';

export const apiUrl = 'https://redux-auth.dev';

export async function makeStore() {
  const { configure, authStateReducer } = require('redux-auth');

  const reducer = combineReducers({
    auth: authStateReducer,
    demoButtons,
    demoUi
  });

  // create the redux store
  const store = createStore(
    reducer,
    compose(
      applyMiddleware(thunk)
    )
  );

  // init redux auth
  await store.dispatch(configure({ apiUrl }));

  return { store };
}
