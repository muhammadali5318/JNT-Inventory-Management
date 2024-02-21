const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
  buyingDate: Date,
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
