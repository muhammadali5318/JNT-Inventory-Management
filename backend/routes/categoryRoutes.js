const {createNewCategory, getAllCategories} = require('../controllers/categoryController')
const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const verifyAuth = require('../middleware/authMiddleware')



// Create a new category
router.post('/', verifyAuth,createNewCategory);

// Get all category
router.get('/', verifyAuth,getAllCategories);


module.exports = router;