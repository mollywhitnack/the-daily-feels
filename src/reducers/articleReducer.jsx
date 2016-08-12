// doesnt need name, could jsut export state
//setting empty array means start with no articles
import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function articleReducer(state = initialState.articles, action){

  switch(action.type){

    case types.LOAD_ARTICLES_SUCCESS:
      console.log('action.articles:',action.articles )
      return action.articles;

    default: 
      return state;
  }

}