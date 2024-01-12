const express = require('express');
const router = express.Router();

const blogController = require('../controllers/blogController');

router.post('/post-blog', blogController.postBlog);

module.exports = router;