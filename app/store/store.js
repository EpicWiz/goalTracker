import { createStore, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import rootReducer from '../reducers/index';

import tasks from '../data';

const authenticate = {
  id: '',
  username: '',
  isLoggedIn: false,
  isLoggingIn: false
};

const defaultState = {
  tasks,
  authenticate
};

const store = createStore(rootReducer, defaultState);

const createdHistory = createHistory();

export const history = syncHistoryWithStore(createdHistory, store);

export default store;
