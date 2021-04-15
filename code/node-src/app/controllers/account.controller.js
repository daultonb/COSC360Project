const db = require("../models");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/jwt.config.js');
const Account = db.account;
const Op = db.Sequelize.Op;

exports.authenticate = async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        res.send({
            message: "No username or password"
        })
        return;
    }

    const account = await Account.scope('withPassword').findOne({ where: { username: username} });

    if (!username || !account || !(await bcrypt.compare(password, account.password))) {
        res.send({
            message: "Invalid username or password"
        })
        return;
    }

    const token = jwt.sign({ sub: account.id }, config.secret, { expiresIn: '7d' });
    account.password = undefined;
    res.send({account, token});
}

exports.create = async (req, res) => {
    let inputData = req.body;
    if (!inputData.username) {
        //empty username
        res.status(400).send({
            message: "empty username"
        });
        return;
    }
    if (!inputData.password) {
        //empty password
        res.status(400).send({
            message: "empty password"
        });
        return;
    }
    if (!inputData.email) {
        //empty email
        res.status(400).send({
            message: "empty email"
        });
        return;
    }
    //Check for dupe username
    let condition = { username: inputData.username };
    let usernames = await Account.findAll({ where: condition })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Unknown error."
            });
        });
    if (usernames && usernames.length > 0) {
        res.send({
            message: "Username already in use."
        });
        return;
    }
    let condition2 = { email: { [Op.eq]: inputData.email } };
    let emails = await Account.findAll({ where: condition2 })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Unknown error."
            });
        });
    if (emails && emails.length > 0) {
        res.send({
            message: "Email already in use."
        });
        return;
    }

    const hashPassword = await bcrypt.hash(inputData.password, bcrypt.genSaltSync(10));

    //All checks passed, create object
    const newAccount = {
        username: inputData.username,
        password: hashPassword,
        email: inputData.email,
        first_name: inputData.first_name,
        last_name: inputData.last_name,
    };

    //Save in the db
    Account.create(newAccount)
        .then(data => {
            data.password = undefined;
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Unknown error."
            });
        });
};

// Retrieve all accounts, optional username,email input
exports.findAll = (req, res) => {
    const name = req.query.username;
    const email = req.query.email;
    //console.log(name);
    //This is adding a LIKE statement to the db call.
    let condition = name ? { username: { [Op.eq]: name } } : null;
    let condition2 = email ? { email: { [Op.eq]: email } } : null;
    let oper = condition && condition2 ? Op.and : Op.or;
    let whereClause = { [oper]: [condition, condition2] }

    Account.findAll({ where: whereClause })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Unknown error."
            });
        });
};

// Find a single account with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    //FindByPrimaryKey
    Account.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Unknown error."
            });
        });
};

// Update an account by ID
exports.update = async (req, res) => {
    const id = req.params.id;

    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.params.password, bcrypt.genSaltSync(10));
    }else {
        delete req.body.password;
    }

    delete req.body.id;
    if (!req.body.first_name) delete req.body.first_name;
    if (!req.body.last_name) delete req.body.last_name;
    if (!req.body.email) delete req.body.email;
    if (!req.body.about) delete req.body.about;

    Account.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                Account.findByPk(id)
                    .then(data => {
                        res.send(data);
                    })
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

// Delete an account with an id
exports.delete = (req, res) => {
    const id = req.params.id;

    Account.destroy({
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
