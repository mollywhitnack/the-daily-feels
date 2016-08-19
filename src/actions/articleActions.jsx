import * as types from './actionTypes';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';
import { get } from 'jquery';


export function loadArticlesSuccess(articles) {
  return { type: types.LOAD_ARTICLES_SUCCESS, articles };
}

export function loadArticles(searchTerm) {
  return dispatch => {
    dispatch(beginAjaxCall());
    return get(`/api/articles/${searchTerm}`)
      .done(articles => {
        dispatch(loadArticlesSuccess(articles));
      })
      .fail(err => {
        dispatch(ajaxCallError(err));
        throw (err);
      });
  };
}
