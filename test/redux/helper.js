import { authStateReducer } from 'redux-auth';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import demoButtons from '../../src/reducers/request-test-buttons';
import demoUi from '../../src/reducers/demo-ui';

export function makeStore() {
  const reducer = combineReducers({
    auth: authStateReducer,
    demoButtons,
    demoUi
  });

  // create the redux store
  return createStore(
    reducer,
    compose(
      applyMiddleware(thunk)
    )
  );
}
