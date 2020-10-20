const mongoose = require('mongoose');

const ProductCategorySchema = new mongoose.Schema({
  catID: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = ProductCategory = mongoose.model(
  'product-category',
  ProductCategorySchema
);
