import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import tasks from './tasks';
import authenticate from './authentication';

const rootReducer = combineReducers({authenticate, tasks, routing: routerReducer});

export default rootReducer;
