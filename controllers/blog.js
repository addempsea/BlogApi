const Blog = require('../models/blog');
const dotenv = require('dotenv').config();


// Blog entry controls here
const blogEntry = async (req, res, next) => {
    const { title, author, content, img } = req.body;
    try {
        const newEntry = await new Blog({
            title,
            author,
            content,
            img
        });
        await newEntry.save();
        return res.status(201).json({
            message: "New Story created"
        });
    } catch (err) {
        return next(err)
    }
}

// Blog update

const blogUpdate = (req, res) => {
    const { title, author, content } = req.body;
    if ( req.user !== true) {
        return res.status(401).json({
            message: "You are not an admin"
        })
    } else {
        Blog.findByIdAndUpdate( req.params.id, { title: title, author: author, content: content }, (err, data) => {
            if (err) return next(err);
            if (!data) {
                return res.status(401).json({
                    message: "No Blog entry for this id"
                })
            } else {
                return res.status(201).json({
                    message: "Story Updated"
                })
            }
        })
    }
}

// Deleting a post
const blogDelete =  (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            message: "You need to be an admin to edit or delete stories"
        });
    } else {
        const id = req.params.id;
        Blog.deleteOne({ _id: id }, (err) => {
            if (err) {
                next(err)
            } else {
                res.status(204).json({
                    message: "Story deleted successfully"
                });
            }
        });
    }
}

// Display stories
const blogDisplay = (req, res, next) => {
    Blog.find((err, data) => {
        if (err) return next (err)
        res.status(200).json({
            message:"Stories here",
            data
        })
    
    })
}

// Blog display one
const blogDisplayOne = (req, res, next) => {
    Blog.findById( req.params.id, (err, data) => {
        if (err) return next (err)
        res.status(200).json({
            message: "Your Story",
            data
        })
    })
}

module.exports = { blogEntry, blogUpdate, blogDelete, blogDisplay, blogDisplayOne};