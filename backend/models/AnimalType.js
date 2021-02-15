const mongoose = require('mongoose');

const AnimalTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = AnimalType = mongoose.model('animal-type', AnimalTypeSchema);
