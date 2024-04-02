const express = require('express');
const router = express.Router();
const verifyAuth = require('../middleware/authMiddleware')


const  {findSalesBetweenTwoDates, findByDate, getAllSales, createNewSale} = require('../controllers/salesController')

// Create a new sale
router.post('/',verifyAuth, createNewSale);

// Get all sales
router.get('/',verifyAuth, getAllSales);

router.get('/findbydate',verifyAuth, findByDate);

router.get('/findBetweenTwoDates', verifyAuth,findSalesBetweenTwoDates);

module.exports = router;
