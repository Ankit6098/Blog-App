const express = require('express');
const router = express.Router();


const usersController = require('../controllers/usersController');
const blogController = require('../controllers/blogController');

router.get('/authentication', usersController.signinsignout);
router.use('/user' , require('./user'));
router.get('/', blogController.blog);
router.use('/blog', require('./blog'));

module.exports = router;