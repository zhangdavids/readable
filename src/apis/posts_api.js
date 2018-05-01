// HERE endpoints 2 3 posts get and post
//  the single id post get post put delete 4567
// and single id post comments get 8

export const fetchPosts = () =>
  fetch('http://localhost:3001/posts', {
    headers: {Authorization: 'whatever-you-want'}
  }).then(data => data.json());

// GET /posts
// USAGE:
//   Get all of the posts. Useful for the main page when no category is selected.

export const fetchPostsByCategory = category =>
  fetch(`http://localhost:3001/${category}/posts`, {
    headers: {Authorization: 'whatever-you-want'}
  }).then(data => data.json());

// Get a single post based on id
export const fetchPost = id =>
  fetch(`http://localhost:3001/posts/${id}`, {
    headers: {
      method: 'GET',
      Authorization: 'whatever-you-want'
    }
  }).then(data => data.json());

// Add new post
export const addPost = data =>
  fetch(`http://localhost:3001/posts`, {
    method: 'POST',
    headers: {
      Authorization: 'whatever-you-want',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(data => data.json());

// Delete post
export const deletePost = id =>
  fetch(`http://localhost:3001/posts/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: 'whatever-you-want'
    }
  }).then(data => data.json());

// Edit post
export const editPost = (data, id) =>
  fetch(`http://localhost:3001/posts/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: 'whatever-you-want',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(data => data.json());

// Change voteScore for a post
export const vote = (id, vote) =>
  fetch(`http://localhost:3001/posts/${id}`, {
    method: 'POST',
    headers: {
      Authorization: 'whatever-you-want',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({option: vote})
  }).then(data => data.json());
