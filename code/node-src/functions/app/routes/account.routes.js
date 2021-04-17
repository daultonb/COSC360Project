module.exports = app => {
    const account = require("../controllers/account.controller.js");
    const authorize = require('../middleware/authorize.js')

    var router = require("express").Router();

    // Create a new account
    router.post("/create", account.create);

    // Login
    router.post("/login", account.authenticate);

    // Retrieve all accounts
    router.get("/", account.findAll);

    // Retrieve a single account by id
    router.get("/find/:id", account.findOne);

    // Update an account with id
    router.put("/update/:id", authorize(), account.update);

    // Delete an account with id
    router.delete("/delete/:id", authorize(), account.delete);

    app.use('/api/account', router);
};
