const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product-category'
  },
  brand: {
    type: String,
  },
  unitPurchasePrice: {
    type: Number,
  },
  unitSellingPrice: {
    type: Number,
  },
  quantity: {
    type: Number,
    required: true
  },
  bufferQuantity: {
    type: Number,
    default: 0
  },
  isEmpty: {
    type: Boolean,
    default: false,
  },
  purchasedDate: {
    type: Date,
  },
  manufacturedDate: {
    type: Date,
  },
  expireDate: {
    type: Date,
  },
  notifyExpBefore: {
    type: Date,
  },
  addedDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Inventory = mongoose.model(
  'inventory',
  InventorySchema
);
