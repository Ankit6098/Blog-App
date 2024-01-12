const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    image: {
        type: Buffer,
    },
    contentType: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Like",
    }],
    comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
    }]
},{
    timestamps: true,
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;