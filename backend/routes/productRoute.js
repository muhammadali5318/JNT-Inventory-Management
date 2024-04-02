const express = require('express');
const router = express.Router();
const verifyAuth = require('../middleware/authMiddleware')
const {createNewProduct, getAllProducts, getSingleProdct, deleteProduct, updateProduct} = require('../controllers/productController')

// Create a new product
router.post('/',verifyAuth, createNewProduct);

// Get all products
router.get('/', verifyAuth ,getAllProducts);

// Get a single product
router.get('/:id',verifyAuth, getSingleProdct);

// deleteProduct
router.delete('/:id',verifyAuth, deleteProduct)


// update Product's any attribute, by id
router.put('/:id',verifyAuth, updateProduct)


module.exports = router;
