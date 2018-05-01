import {
  GET_CATEGORIES,
  GET_POSTS_OF_CATEGORY,
  GET_POSTS,
  ADD_POST,
  GET_POST_BY_ID,
  VOTE,
  PUT_ID_OF_POST,
  DEL_ID_OF_POST,
  GET_COMMENTS_ID_OF_POSTS,
  ADD_COMMENT,
  COMMENT_VOTE,
  DEL_ID_COMMENT,
  SET_SORTING,
  SET_COMMENT_SORTING
} from '../constants/actionTypes';
import { combineReducers } from 'redux';


function setSorting (state = null, action) {
    switch (action.type) {
      case SET_SORTING:
        return { ...state, sort: action.sortBy };
      default:
        return state
    }
  }
  
function setCommentSorting (state = null, action) {
  switch (action.type) {
    case SET_COMMENT_SORTING:
      return { ...state, sort: action.sortCommentsBy };
    default:
      return state
}
}
  
function receiveCategories (state = null, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories;
    default:
      return state
}
}
  
function makeObj (items) {
  const newObj = {};
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const itemId = item.id;
    newObj[itemId] = item
  }
  return newObj
}
  
function postsById (state = {}, action) {
  switch (action.type) {
    case GET_POSTS:
    case GET_POSTS_OF_CATEGORY:
      return { ...state, ...makeObj(action.posts) };

    case ADD_POST:
    case GET_POST_BY_ID:
    case VOTE:
    case PUT_ID_OF_POST:
    case DEL_ID_OF_POST:
      return { ...state, ...makeObj([action.posts]) };

    default:
      return state
  }
}
  
function receiveComments (state = {}, action) {
  switch (action.type) {
    case GET_COMMENTS_ID_OF_POSTS:
      return { ...state, ...makeObj(action.comments) };

    case ADD_COMMENT:
    case COMMENT_VOTE:
    case DEL_ID_COMMENT:
      return { ...state, ...makeObj([action.comments]) };

    default:
      return state
}
}
  
export default combineReducers({
    receiveCategories,
    receiveComments,
    setSorting,
    postsById,
    setCommentSorting
})