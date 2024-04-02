const {createNewCategory, getAllCategories} = require('../controllers/categoryController')
const express = require('express');
const router = express.Router();
const Category = require('../models/Category');


// Create a new category
router.post('/', createNewCategory);

// Get all category
router.get('/', getAllCategories);


module.exports = router;