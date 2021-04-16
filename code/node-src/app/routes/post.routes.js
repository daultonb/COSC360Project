module.exports = app => {
    const posts = require("../controllers/post.controller.js");
    const authorize = require('../middleware/authorize.js')

    var router = require("express").Router();

    // Create a new post
    router.post("/", authorize(), posts.create);

    // Retrieve all posts
    router.get("/", posts.findAll);

    // Retrieve a single post by id
    router.get("/viewpost/:id", posts.findOne);

    // Retrieve posts with search string
    router.get("/search", posts.searchPosts);

    // Update a post with id
    router.put("/:id", authorize(), posts.update);

    // Delete a post with id
    router.delete("/:id", authorize(), posts.delete);

    app.use('/api/posts', router);
};

