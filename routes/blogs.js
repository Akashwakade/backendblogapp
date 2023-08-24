// routes/blogs.js
const express = require('express');
const router = express.Router();
const BlogController=require("../controller/BlogController");
const authMiddleware = require('../middelware/authMiddleware');

router.post('/', authMiddleware, BlogController.createBlog);
router.get('/', authMiddleware, BlogController.getAllBlogs);
router.get('/search', authMiddleware, BlogController.searchBlogsByTitle);
router.get('/category', authMiddleware, BlogController.getBlogsByCategory);
router.get('/sorted', authMiddleware, BlogController.getSortedBlogs);
router.put('/:id', authMiddleware, BlogController.updateBlog);
router.post('/:id/like', authMiddleware, BlogController.likeBlog);
router.post('/:id/comments', authMiddleware, BlogController.commentOnBlog)




module.exports = router;
