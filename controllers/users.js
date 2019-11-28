const bcrypt = require('bcryptjs');
const User = require('../models/users');
const Post = require('../models/posts');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

/*A NEW USER CAN REISTER */
const signup = async(req, res, next) => {
    const { name, email, password } = req.body;
    try {
        const data = await User.findOne({ email });
        if (data) {
            return res.status(404).json({
                message: 'There is an existing user with this email address'
            })
        } else {
            const saltRounds = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, saltRounds);
            const newUser = await new User({
                name,
                password: hash,
                email
            })
            await newUser.save();
            return res.status(201).json({
                message: 'Thank you for signing up on our Blog'
            })
        }
    } catch (err) {
        return next(err)
    }
}


/* A  REGISTERED USER CAN LOGIN AND GET AN AUTHORIZTION TOKEN */
const login = async(req, res, next) => {
    const { email, password } = req.body;
    try {
        const data = await User.findOne({ email });
        if (!data) {
            return res.status(401).json({
                message: 'User does not exist'
            })
        } else {
            const match = await bcrypt.compare(password, data.password);
            if (!match) {
                return res.status(401).json({
                    message: 'invalid login details'
                })
            } else {
                const token = await jwt.sign({ isAdmin: data.isAdmin }, process.env.SECRET, { expiresIn: "7h" })
                return res.status(200).json({
                    message: 'login successful',
                    token
                })
            }
        }
    } catch (err) {
        return next(err)
    }
};

/*  UPDATING A PARTICULAR USER TO BEIGN AN ADMIN */
const updateUser = async(req, res, next) => {
    try {
        const data = await User.findByIdAndUpdate(req.params.id, { isAdmin: true })
        return res.status(200).json('Admin status Updated successfully')
    } catch (err) {
        return next(err)
    }
}

/* GETTING TOTAL REGISTERED USERS */
const total = async(req, res, next) => {
    try {
        const data = await User.find({})
        return res.status(200).json({ data })

    } catch (err) {
        return next(err)
    }
};

module.exports = { signup, login, total, updateUser };