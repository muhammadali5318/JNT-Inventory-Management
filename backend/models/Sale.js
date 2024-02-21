const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const saleSchema = new mongoose.Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  salePrice: Number,
  saleQuantity: Number,
  saleDate: Date
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
