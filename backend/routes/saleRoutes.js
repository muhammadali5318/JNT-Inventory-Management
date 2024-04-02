const express = require('express');
const router = express.Router();

const  {findSalesBetweenTwoDates, findByDate, getAllSales, createNewSale} = require('../controllers/salesController')

// Create a new sale
router.post('/', createNewSale);

// Get all sales
router.get('/', getAllSales);

router.get('/findbydate', findByDate);

router.get('/findBetweenTwoDates', findSalesBetweenTwoDates);

module.exports = router;
