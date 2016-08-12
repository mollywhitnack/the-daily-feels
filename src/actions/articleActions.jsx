import * as types from './actionTypes';
import { beginAjaxCall } from './ajaxStatusActions';
import { get } from 'jquery';


const mockUrl = `/api/articles/${searchTerm}`
const realUrl = `https://gateway-a.watsonplatform.net/calls/data/GetNews?apikey=339b0fd1a3561f37566508b88677559f27c553df&outputMode=json&start=now-1d&end=now&q.enriched.url.title=${searchTerm}&return=enriched.url.text,enriched.url.title,original.url`


export function loadArticlesSuccess(articles) {
  return { type: types.LOAD_ARTICLES_SUCCESS, articles };
}

export function loadArticles(searchTerm) {
  return dispatch => {
    dispatch(beginAjaxCall());
    return get(realUrl)
      .done(articles => {
        dispatch(loadArticlesSuccess(articles));
      })
      .fail(err => {
        throw err;
      });
  };
}

