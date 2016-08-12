import mockNewsApi from '../api/mockNewsApi';
import * as types from './actionTypes';
import { beginAjaxCall } from './ajaxStatusActions';

export function loadArticlesSuccess(authors) {
  return { type: types.LOAD_ARTICLES_SUCCESS, authors };
}

export function loadArticles(searchTerm) {
  return dispatch => {
    dispatch(beginAjaxCall());
    return mockNewsApi.getArticles(searchTerm)
      .then(articles => {
        dispatch(loadArticlesSuccess(articles));
      })
      .catch(err => {
        throw err;
      });
  };
}

