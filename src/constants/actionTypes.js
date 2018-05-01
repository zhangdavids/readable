const keyMirror = require('keymirror');

const AppMode = keyMirror({
  GET_CATEGORIES: null,

  GET_POSTS_OF_CATEGORY: null,
  GET_POSTS: null,
  ADD_POST: null,
  GET_POST_BY_ID: null,
  VOTE: null,
  PUT_ID_OF_POST: null,
  DEL_ID_OF_POST: null,

  GET_COMMENTS_ID_OF_POSTS: null,
  ADD_COMMENT: null,
  GET_ID_COMMENT: null,
  COMMENT_VOTE: null,
  PUT_ID_COMMENT: null,
  DEL_ID_COMMENT: null,

  SET_SORTING: null,
  SET_COMMENT_SORTING: null,
});

module.exports = AppMode;