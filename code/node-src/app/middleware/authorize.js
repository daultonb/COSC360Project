const jwt = require('express-jwt');
const db = require("../models");
const {secret} = require('../config/jwt.config.js');


module.exports = authorize;

function authorize() {
    return [
        jwt({ secret, algorithms: ['HS256'] }),

        async (req, res, next) => {
            const account = await db.account.findByPk(req.user.sub);

            if (!account)
                return res.status(401).json({ message: 'Unauthorized' });

            req.account = account.get();
            next();
        }
    ];
}
