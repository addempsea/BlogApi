const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
    name: {type: String, required: true, min: [6, 'must be longer than 6'], max: 100},
    password: {type: String, required: true},
    email: {type: String, required: true},
    isAdmin: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('user', postSchema);