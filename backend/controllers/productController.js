const Product = require('../models/Product');


const createNewProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}


const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const getSingleProdct = async (req, res) => {

  let product;
  try {
    product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: 'Product not found' });
    }else {
    res.json(product);      
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

const deleteProduct = async (req, res) => {
  const deletedRecord = await Product.findOneAndDelet({ _id: req.params.id })
  res.send(deletedRecord)
}


const updateProduct = async (req, res) => {

  const options = {
    returnDocument: 'after'
  }

  let updatededRecord = await Product.findByIdAndUpdate(req.params.id, req.body, options)
  res.send(updatededRecord)
}

module.exports = {createNewProduct, getAllProducts, getSingleProdct, deleteProduct, updateProduct}