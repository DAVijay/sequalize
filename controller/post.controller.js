const db = require('../config/database.config.js');
const post = db.post;

// Create and Save a new post
exports.create = (req, res) =>{

    var result = {};
    var status = 201;

    // Create a post
    const Post = new post({
        id: req.body.id ,
        title: req.body.title,
        content: req.body.content,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt
    });

    // create post in the database
    Post.create((err, post) => {
        if (!err) {
          result.status = status;
          result.result = post;
        } else {
          status = 500;
          result.status = status;
          result.error = err;
        }
        res.status(status).send(result);
      });
};

// Retrieve and return all posts from the database.
exports.findAll = (req, res) => {
    post.findAll()
    .then(posts => {
        res.send(posts);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving posts."
        });
    });
};

// Find a single post with a postId
exports.findOne = (req, res) => {
    post.findById(req.params.postId)
    .then(post => {
        if(!post) {
            return res.status(404).send({
                message: "post not found with id " + req.params.postId
            });
        }
        res.send(post);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "post not found with id " + req.params.postId
            });
        }
        return res.status(500).send({
            message: "Error retrieving post with id " + req.params.postId
        });
    });
};


// Update a post identified by the postId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.email) {
        return res.status(400).send({
            message: "post email can not be empty"
        });
    }

    // Find post and update it with the request body
    post.Update(req.params.postId, {
      id: req.body.id ,
      title: req.body.title,
      content: req.body.content,
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt
    }, {new: true})
    .then(post => {
        if(!post) {
            return res.status(404).send({
                message: "post not found with id " + req.params.postId
            });
        }
        res.send(post);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "post not found with id " + req.params.postId
            });
        }
        return res.status(500).send({
            message: "Error updating post with id " + req.params.postId
        });
    });
};


// Delete a post with the specified postId in the request
exports.delete = (req, res) => {
    post.destroy(req.params.postId)
    .then(post => {
        if(!post) {
            return res.status(404).send({
                message: "post not found with id " + req.params.postId
            });
        }
        res.send({message: "post deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "post not found with id " + req.params.postId
            });
        }
        return res.status(500).send({
            message: "Could not delete post with id " + req.params.postId
        });
    });
};
