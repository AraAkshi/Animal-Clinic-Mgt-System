const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customers',
  },
  name: {
    type: String,
    required: true,
  },
  species: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  specialRemarks: {
    type: String,
  },
  enteredDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Animal = mongoose.model(
  'animals',
  AnimalSchema
);
