const db = require("../models");
const Comment = db.comment;
const Op = db.Sequelize.Op;

// Create a new comment
exports.create = (req, res) => {
    let inputData = req.body;
    if (!inputData.post_id) {
        res.status(400).send({
            message: "No post id specified."
        });
        return;
    }
    if (!inputData.text) {
        res.status(400).send({
            message: "No comment text given."
        });
        return;
    }

    //All checks passed, create object
    const newComment = {
        post_id: inputData.post_id,
        text: inputData.text,
        data: inputData.file,
        username: inputData.username
    };

    //Save in the db
    Comment.create(newComment)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Unknown error."
            });
        });
};

// Retrieve all comments, with post_id param
exports.findAll = (req, res) => {
    const post_id = req.query.post_id;

    let condition = post_id ? { post_id: post_id } : null;

    let options = {where: condition, limit: limit, order: order};
    
    Comment.findAll(options)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Unknown error."
            });
        });
};

// Find a single comment with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    //FindByPrimaryKey
    Comment.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Unknown error."
            });
        });
};

// Update a comment by ID
exports.update = (req, res) => {
    const id = req.params.id;

    Comment.update(req.body, {
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

// Delete a comment with an id
exports.delete = (req, res) => {
    const id = req.params.id;

    Comment.destroy({
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

// Find all comments by a certain date
exports.findAllDate = (req, res) => {

};

// Find all comments by a certain user
exports.findAllUser = (req, res) => {

};

// Find all comments before a date
exports.findAllBefore = (req, res) => {

};

// Find all comments after a date
exports.findAllAfter = (req, res) => {

};
