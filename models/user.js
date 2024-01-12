const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    avatar: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    blog: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;