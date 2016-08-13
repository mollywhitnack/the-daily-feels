import * as types from './actionTypes';
import { beginAjaxCall } from './ajaxStatusActions';
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
        // throw err;
        console.log('this is an error action 19',err);
      });
  };
}

