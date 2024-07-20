var express = require('express');
const { createBlog, createBlogPost, allBlogs, blogDetail, comments } = require('../controllers/blogController');
const { isLoggedIn } = require('../utils/middleware');
var router = express.Router();

router.get('/',allBlogs)

router.get('/create',isLoggedIn,createBlog)

router.post('/create',createBlogPost)

router.get('/blogDetail/:id',blogDetail)

router.post('/comments/:id',isLoggedIn,comments)

module.exports = router;
