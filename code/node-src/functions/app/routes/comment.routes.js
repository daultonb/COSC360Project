module.exports = app => {
    const comments = require("../controllers/comment.controller.js");
    const authorize = require('../middleware/authorize.js')

    var router = require("express").Router();

    // Create a new comment
    router.post("/", authorize(), comments.create);

    // Retrieve all comments
    router.get("/", comments.findAll);

    // Retrieve comment by user
    router.get("/user/:username", comments.findAllUser);

    // Retrieve a single comment by id
    router.get("/comment/:id", comments.findOne);

    // Update a comment with id
    router.put("/:id", authorize(), comments.update);

    // Delete a comment with id
    router.delete("/:id", authorize(), comments.delete);

    app.use('/api/comments', router);
};

