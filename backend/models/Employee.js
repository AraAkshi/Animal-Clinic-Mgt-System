const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  nic: {
    type: String,
    required: true,
    unique: true
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
  epfNo: {
    type: Number
  },
  enteredDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Employee = mongoose.model(
  'employees',
  EmployeeSchema
);
