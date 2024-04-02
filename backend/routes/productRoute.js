const express = require('express');
const router = express.Router();
const {createNewProduct, getAllProducts, getSingleProdct, deleteProduct, updateProduct} = require('../controllers/productController')

// Create a new product
router.post('/', createNewProduct);

// Get all products
router.get('/', getAllProducts);

// Get a single product
router.get('/:id', getSingleProdct);

// deleteProduct
router.delete('/:id', deleteProduct)


// update Product's any attribute, by id
router.put('/:id', updateProduct)


module.exports = router;
