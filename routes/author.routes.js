module.exports = (app) => {
    const author = require('../controller/author.controller.js');

    // Create a new author
    app.post('/author', author.create);

    // Retrieve all authors
    app.get('/author', author.findAll);

    // Retrieve a single author with authorId
    app.get('/user/:userId', author.findOne);

    // Update a author with authorId
    app.put('/author/:userId', author.update);

    // Delete a author with authorId
    app.delete('/author/:userId', author.delete);
}
