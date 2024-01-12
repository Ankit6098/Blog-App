const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like',
    }],
}, {
    timestamps: true,
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;