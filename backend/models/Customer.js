const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
  },
  enteredDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Customer = mongoose.model('customers', CustomerSchema);
