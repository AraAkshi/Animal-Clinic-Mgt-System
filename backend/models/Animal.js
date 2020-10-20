const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customers',
  },
  animalID: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  species: {
    type: String,
  },
  breed: {
    type: String,
  },
  gender: {
    type: String,
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
