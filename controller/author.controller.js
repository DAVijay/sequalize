const db = require('../config/database.config.js');
const author = db.author;

// Create and Save a new author
exports.create = (req, res) =>{

    var result = {};
    var status = 201;

    // Create a author
    const Author = new author({
        id: req.body.id ,
        firstname: req.body.firstname ,
        lastname: req.body.lastname ,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt
    });

    // create author in the database
    Author.create((err, author) => {
        if (!err) {
          result.status = status;
          result.result = author;
        } else {
          status = 500;
          result.status = status;
          result.error = err;
        }
        res.status(status).send(result);
      });
};

// Retrieve and return all authors from the database.
exports.findAll = (req, res) => {
    author.findAll()
    .then(authors => {
        res.send(authors);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving authors."
        });
    });
};

// Find a single author with a authorId
exports.findOne = (req, res) => {
    author.findById(req.params.authorId)
    .then(author => {
        if(!author) {
            return res.status(404).send({
                message: "author not found with id " + req.params.authorId
            });
        }
        res.send(author);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "author not found with id " + req.params.authorId
            });
        }
        return res.status(500).send({
            message: "Error retrieving author with id " + req.params.authorId
        });
    });
};


// Update a author identified by the authorId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.email) {
        return res.status(400).send({
            message: "author email can not be empty"
        });
    }

    // Find author and update it with the request body
    author.Update(req.params.authorId, {
      id: req.body.id ,
      firstname: req.body.firstname ,
      lastname: req.body.lastname ,
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt
    }, {new: true})
    .then(author => {
        if(!author) {
            return res.status(404).send({
                message: "author not found with id " + req.params.authorId
            });
        }
        res.send(author);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "author not found with id " + req.params.authorId
            });
        }
        return res.status(500).send({
            message: "Error updating author with id " + req.params.authorId
        });
    });
};


// Delete a author with the specified authorId in the request
exports.delete = (req, res) => {
    author.destroy(req.params.authorId)
    .then(author => {
        if(!author) {
            return res.status(404).send({
                message: "author not found with id " + req.params.authorId
            });
        }
        res.send({message: "author deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "author not found with id " + req.params.authorId
            });
        }
        return res.status(500).send({
            message: "Could not delete author with id " + req.params.authorId
        });
    });
};
