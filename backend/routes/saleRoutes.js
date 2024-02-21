const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');
const Product = require('../models/Product');

// Create a new sale
router.post('/', async (req, res) => {
  try {

    const sale = await Sale.create(req.body);
    
    const product = await Product.findById(req.body.product);
    const saleQty = req.body.saleQuantity 
    const updatedProductQty = product.quantity - saleQty;
    product.quantity = updatedProductQty
    const savedProduct = await product.save();

    if (product == null) {
      return res.status(404).json({ message: 'Product not found' });
    }



    res.status(201).json(sale);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all sales
router.get('/', async (req, res) => {
  try {
    const sales = await Sale.find();
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single sale
// router.get('/:id', getSale, (req, res) => {
//   res.json(res.sale);
// });


router.get('/findbydate', async (req, res) => {
  try {
    // Get the date from the query parameters
    const { date } = req.query;

    // Parse the date string into a Date object
    const searchDate = new Date(date);

    // Check if the date is valid
    if (!searchDate || isNaN(searchDate)) {
      return res.status(400).json({ message: 'Invalid date' });
    }

    // Query the database to find sales on the specified date
    const sales = await Sale.find({ saleDate: searchDate });

    res.json(sales);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});


router.get('/findBetweenTwoDates', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Parse startDate and endDate as Date objects
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    // Query the database for sales between the specified dates
    const sales = await Sale.find({
      saleDate: { $gte: startDateObj, $lte: endDateObj }
    });

    res.json(sales);
  } catch (error) {
    console.error('Error retrieving sales:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});





// Middleware to get a single sale by ID
async function getSale(req, res, next) {
  let sale;
  try {
    sale = await Sale.findById(req.params.id);
    if (sale == null) {
      return res.status(404).json({ message: 'Sale not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.sale = sale;
  next();
}




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
