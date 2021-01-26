const mongoose = require("mongoose");

const TreatmentSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customers",
  },
  animal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "animals",
  },
  treatmentType: {
    type: String,
  },
  decription: {
    type: String,
  },
  dateReceived: {
    type: Date,
    default: Date.now,
  },
  timeReceived: {
    type: Date,
  },
  nextTreatmentDate: {
    type: Date,
  },
});

module.exports = Treatment = mongoose.model("treatments", TreatmentSchema);
