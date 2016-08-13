import { combineReducers } from 'redux';
import ajaxCallsInProgress from './ajaxStatusReducer';
import articles from './articleReducer';

const rootReducer = combineReducers({
  articles,
  ajaxCallsInProgress,
});

export default rootReducer;
