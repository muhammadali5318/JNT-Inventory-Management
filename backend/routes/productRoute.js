const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Create a new product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single product
router.get('/:id', getProduct, (req, res) => {
  res.json(res.product);
});

router.delete('/:id', async (req, res) => {
  const deletedRecord = await Product.findOneAndDelet({ _id: req.params.id })
  res.send(deletedRecord)
})


router.put('/:id', async (req, res) => {

  // let updatededRecord = await Product.findById({ _id: req.params.id })
  // updatededRecord.quantity = req.body.quantity
  // updatededRecord = await updatededRecord.save()
  // res.send(updatededRecord)


  let updatededRecord = await Product.findByIdAndUpdate(req.params.id, req.body)
  // updatededRecord.quantity = req.body.quantity
  // updatededRecord = await updatededRecord.save()
  res.send(updatededRecord)
})

// Middleware to get a single product by ID
async function getProduct(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.product = product;
  next();
}

module.exports = router;
