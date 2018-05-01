import * as CategoryAPI from '../apis/categories_api';
import * as PostAPI from '../apis/posts_api';
import * as CommentAPI from '../apis/comments_api';
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
  GET_ID_CONTENT,
  COMMENT_VOTE,
  PUT_ID_COMMENT,
  DEL_ID_COMMENT,
  SET_SORTING,
  SET_COMMENT_SORTING
} from '../constants/actionTypes'

export const Sorting = {
  BY_DATE_NEWEST: 'BY_DATE_NEWEST',
  BY_DATE_OLDEST: 'BY_DATE_OLDEST',
  BY_SCORE_HIGHEST: 'BY_SCORE_HIGHEST',
  BY_SCORE_LOWEST: 'BY_SCORE_LOWEST'
};

export const setSorting = sortBy => ({
  type: SET_SORTING,
  sortBy
});

export const setCommentSorting = sortCommentsBy => ({
  type: SET_COMMENT_SORTING,
  sortCommentsBy
});

export const postsById = (posts, actionType) => ({
  type: actionType,
  posts
});

export const receiveCategories = categories => ({
  type: GET_CATEGORIES,
  categories
});

export const fetchCategories = () => dispatch =>
  CategoryAPI.fetchCategories().then(categories =>
    dispatch(receiveCategories(categories))
);

export const getPostsByCategory = posts => ({
  type: GET_POSTS_OF_CATEGORY,
  posts
});

export const fetchPostsByCategory = category => dispatch =>
  PostAPI.fetchPostsByCategory(category)
    .then(posts =>
      Promise.all(
        posts.map(post =>
          CommentAPI.fetchComments(post.id)
            .then(comments => (post.comments = comments))
            .then(() => post)
        )
      )
    )
    .then(posts => dispatch(postsById(posts, GET_POSTS_OF_CATEGORY)));

export const fetchPosts = () => dispatch =>
  PostAPI.fetchPosts()
    .then(posts =>
      Promise.all(
        posts.map(post =>
          CommentAPI.fetchComments(post.id)
            .then(comments => (post.comments = comments))
            .then(() => post)
        )
      )
    )
    .then(posts => dispatch(postsById(posts, GET_POSTS)));

export const addPost = data => dispatch =>
  PostAPI.addPost(data)
    .then(post =>
    CommentAPI.fetchComments(post.id)
        .then(comments => (post.comments = comments))
        .then(() => post)
    )
    .then(post => dispatch(postsById(post, ADD_POST)));

export const fetchPost = id => dispatch =>
  PostAPI.fetchPost(id)
    .then(post =>
    CommentAPI.fetchComments(post.id)
        .then(comments => (post.comments = comments))
        .then(() => post)
    )
    .then(post => dispatch(postsById(post, GET_POST_BY_ID)));

export const vote = (id, vote) => dispatch =>
  PostAPI.vote(id, vote)
    .then(post =>
    CommentAPI.fetchComments(post.id)
        .then(comments => (post.comments = comments))
        .then(() => post)
    )
    .then(post => dispatch(postsById(post, VOTE)));
  
export const editPost = (data, id) => dispatch =>
  PostAPI.editPost(data, id)
    .then(post =>
    CommentAPI.fetchComments(post.id)
        .then(comments => (post.comments = comments))
        .then(() => post)
    )
    .then(post => dispatch(postsById(post, PUT_ID_OF_POST)));

export const deletePost = id => dispatch =>
  PostAPI.deletePost(id)
    .then(post =>
    CommentAPI.fetchComments(post.id)
        .then(comments => (post.comments = comments))
        .then(() => post)
    )
    .then(post => dispatch(postsById(post, DEL_ID_OF_POST)));

export const receiveComments = (comments, actionType) => ({
  type: actionType,
  comments
});

export const fetchComments = id => dispatch =>
  CommentAPI.fetchComments(id).then(comments =>
    dispatch(receiveComments(comments, GET_COMMENTS_ID_OF_POSTS))
);

export const addComment = data => dispatch =>
  CommentAPI.addComment(data).then(comment =>
    dispatch(receiveComments(comment, ADD_COMMENT))
);

export const voteComment = (id, vote) => dispatch =>
  CommentAPI.voteComment(id, vote).then(comment =>
    dispatch(receiveComments(comment, COMMENT_VOTE))
        );

export const deleteComment = id => dispatch =>
  CommentAPI.deleteComment(id).then(comment =>
    dispatch(receiveComments(comment, DEL_ID_COMMENT))
);