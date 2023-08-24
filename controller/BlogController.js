// controllers/BlogController.js

const blogModel = require("../models/blogModel");


exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const blog = new blogModel({ title, content, author: req.user._id });
    await blog.save();
    res.status(201).json({ message: 'Blog created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

//get all blogs
// controllers/BlogController.js


exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find({ author: req.user._id }).populate('author');
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

//search blog route

// controllers/BlogController.js


exports.searchBlogsByTitle = async (req, res) => {
  try {
    const { title } = req.query;

    const blogs = await blogModel.find({
      title: { $regex: title, $options: 'i' }, // Case-insensitive search
    }).populate('author');

    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

//for search use this localhost:8080/blogs/search?title=


//category
// controllers/BlogController.js


exports.getBlogsByCategory = async (req, res) => {
  try {
    const { category } = req.query;

    const blogs = await blogModel.find({ category }).populate('author');

    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

//sort by date asc
// controllers/BlogController.js


exports.getSortedBlogs = async (req, res) => {
  try {
    const { sort, order } = req.query;

    const sortOrder = order === 'asc' ? 1 : order === 'desc' ? -1 : 1;
    const sortField = sort === 'date' ? 'createdAt' : 'title';

    const blogs = await blogModel.find().sort({ [sortField]: sortOrder }).populate('author');

    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

//update delete

// controllers/BlogController.js


exports.updateBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const blogId = req.params.id;

    const blog = await blogModel.findById(blogId);

    // Check if the logged-in user is the author of the blog
    if (!blog || blog.author.toString() !== req.user._id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    blog.title = title;
    blog.content = content;
    blog.updatedAt = new Date();

    await blog.save();

    res.status(200).json({ message: 'Blog updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

//like 
// controllers/BlogController.js


exports.likeBlog = async (req, res) => {
  try {
    const blogId = req.params.id;

    const blog = await blogModel.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Check if the user has already liked the blog
    if (blog.likes.includes(req.user._id)) {
      return res.status(400).json({ message: 'You have already liked this blog' });
    }

    blog.likes.push(req.user._id);
    await blog.save();

    res.status(200).json({ message: 'Blog liked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

//comments
// controllers/BlogController.js


exports.commentOnBlog = async (req, res) => {
  try {
    const { text } = req.body;
    const blogId = req.params.id;

    const blog = await blogModel.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const newComment = {
      user: req.user._id,
      text,
    };

    blog.comments.push(newComment);
    await blog.save();

    res.status(200).json({ message: 'Comment added successfully', comment: newComment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};







