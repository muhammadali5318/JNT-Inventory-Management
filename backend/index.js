const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

// Middleware
app.use(express.json());

// Routes
app.use('/api/products', require('./routes/productRoute'));
app.use('/api/sales', require('./routes/saleRoutes'));
app.use('/api/category', require('./routes/categoryRoutes'));


// Add routes for sales, purchases, etc.

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
