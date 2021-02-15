const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customers',
  },
  scheduleDate: {
    type: String,
    required: true,
  },
  scheduleTime: {
    type: String,
    required: true,
  },
  animal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'animals',
  },
  remarks: {
    type: String,
  },
  enteredDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Appointment = mongoose.model(
  'appointments',
  AppointmentSchema
);
