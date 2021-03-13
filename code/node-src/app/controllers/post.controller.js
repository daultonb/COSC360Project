const db = require("../models");
const Post = db.post;
const Op = db.Sequelize.Op;


//TODO: implement these properly
// Create a new post
exports.create = (req, res) => {
    let inputData = req.body;
    if (!inputData.title) {
        //empty title
        res.status(400).send({
            message: "empty"
        });
        return;
    }
    if (!inputData.description) {
        //empty description
        res.status(400).send({
            message: "empty"
        });
        return;
    }

    //All checks passed, create object
    const newPost = {
        title: inputData.title,
        description: inputData.description
    };

    //Save in the db
    Post.create(newPost)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Unknown error."
            });
        });
};

// Retrieve all posts, optional title input
exports.findAll = (req, res) => {
    const title = req.query.title;
    //This is adding a LIKE statement to the db call.
    let condition = title ? { title: { [Op.like]: `%$title}%` } } : null;

    Post.findAll({ where: condition })
        .then(data => {
            res.end(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Unknown error."
            });
        });
};

// Find a single post with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    //FindByPrimaryKey
    Post.findByPk(id)
        .then(data => {
            res.end(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Unknown error."
            });
        });
};

// Update a post by ID
exports.update = (req, res) => {
    const id = req.params.id;

    Post.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Updated."
                });
            } else {
                res.send({
                    message: `Could not update ${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Could not update ${id}`
            });
        });
};

// Delete a post with an id
exports.delete = (req, res) => {
    const id = req.params.id;

    Post.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Deleted."
                });
            } else {
                res.send({
                    message: `Could not delete ${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Could not delete ${id}`
            });
        });
};

// Find all posts by a certain date
exports.findAllDate = (req, res) => {

};

// Find all posts by a certain user
exports.findAllUser = (req, res) => {

};

// Find all posts before a date
exports.findAllBefore = (req, res) => {

};

// Find all posts after a date
exports.findAllAfter = (req, res) => {

};

//etc. add other methods here.
