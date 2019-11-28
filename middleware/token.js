const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const User = require('../models/users')

module.exports = (req, res, next) => {
       
            if (req.session && req.session.isAdmin === "true")
            if (err) {
                return next(err);
            } else {
                User.find((err) => {
                    if (err) return next (err);
                    else {
                        console.log(req.user)
                        req.user = data.isAdmin;
                        next();
                    }
                })
            }
        }