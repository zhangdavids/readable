export const fetchCategories = () =>
  fetch(`http://localhost:3001/categories`, {
    method: 'GET',
    headers: {
      'Authorization': 'whatever-you-want'
    }
  })
      .then(data => data.json())
      .then(data => data.categories);

// GET /categories
// USAGE:
// Get all of the categories available for the app. List is found in categories.js.
// Feel free to extend this list as you desire.

// HERE endpoints 0 1
// finally move endpoint 1 to post api
