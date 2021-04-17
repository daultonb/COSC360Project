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
            message: "No title given."
        });
        return;
    }
    if (!inputData.description) {
        //empty description
        res.status(400).send({
            message: "No description given."
        });
        return;
    }

    //All checks passed, create object
    const newPost = {
        title: inputData.title,
        description: inputData.description,
        data: inputData.file,
        username: inputData.username,
        genre: inputData.genre
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

// Retrieve all posts
exports.findAll = (req, res) => {
    const n = req.query.n;
    const total = req.query.total;

    const genre = req.query.genre;

    //This is adding a LIKE statement to the db call.
    let condition = genre ? { genre: genre } : null;
    
    let limit = n? Number(n):null;
    let order = (n || genre) ?[['updatedAt', 'DESC']]: null;

    let options = {where: condition, limit: limit, order:order};
    
    if(total){
        Post.count()
        .then(data => {
            res.send({data});
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Unknown error."
            });
        });
    }
    else
        Post.findAll(options)
            .then(data => {
                res.send(data);
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
    Post.scope('withMedia').findByPk(id)
        .then(data => {
            res.send(data);
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

exports.searchPosts = (req, res) => {
    const searchString = req.params.searchString;
    if (!searchString) {
        res.status(500).send({
            message: "No search string given."
        });
    }

    //This is adding a LIKE statement to the db call.
    let condition = { [Op.or]: {title: {[Op.like]: `%${searchString}%` }, description: {[Op.like]: `%${searchString}%`}, genre: {[Op.like]: `%${searchString}%`}, username: {[Op.like]: `%${searchString}%`} }};
    let order = [['updatedAt', 'DESC']];

    let options = {where: condition, order: order};
    Post.findAll(options)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Unknown error."
                });
            });
}

// Find all posts by a certain date
exports.findAllDate = (req, res) => {

};

// Find all posts by a certain user
exports.findAllUser = (req, res) => {
    const username = req.params.username;
    if (!username) {
        res.status(500).send({
            message: "No username given."
        });
    }

    let condition = { username: username };
    let order = [['updatedAt', 'DESC']];

    let options = {where: condition, order: order};
    Post.findAll(options)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Unknown error."
                });
            });
};
