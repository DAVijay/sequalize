module.exports = (app) => {
    const post = require('../controller/post.controller.js');

    // Create a new post
    app.post('/post', post.create);

    // Retrieve all posts
    app.get('/post', post.findAll);

    // Retrieve a single post with postId
    app.get('/user/:userId', post.findOne);

    // Update a post with postId
    app.put('/post/:userId', post.update);

    // Delete a post with postId
    app.delete('/post/:userId', post.delete);
}
