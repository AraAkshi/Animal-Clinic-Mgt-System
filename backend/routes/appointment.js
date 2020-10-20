const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Appointment = require('../models/Appointment');
const Customer = require('../models/OnlineCustomer');

// @route   POST api/appointments
// @desc    Create Appointments
// @access  private
router.post(
  '/',
  [
    auth,
    [
      check('scheduleDate', 'Date is required').not().isEmpty(),
      check('scheduleTime', 'Time is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { scheduleDate, scheduleTime, remarks, animal } = req.body;
    const userId = req.user.id;

    const appointmentFields = {};
    appointmentFields.customer = userId;
    if (scheduleDate) appointmentFields.scheduleDate = scheduleDate;
    if (scheduleTime) appointmentFields.scheduleTime = scheduleTime;
    if (remarks) appointmentFields.remarks = remarks;
    if (animal) appointmentFields.animal = animal;

    try {
      //Create record
      appointment = new Appointment(appointmentFields);
      await appointment.save();
      res.json(appointment);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/appointments/my-appointments
// @desc    View appointments of logged in user
// @access  private
router.get('/my-appointments', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const appointments = await Appointment.find({
      customer: userId,
    }).populate('customer', ['name', 'contact', 'email']);

    if (!appointments) {
      return res.status(400).json({ msg: 'You have not made any Appointments' });
    }
    res.json(appointments);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Appointments Not Found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   GET api/appointments/:customer_id
// @desc    View appointments of an user
// @access  private
router.get('/:customer_id', auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({
      customer: req.params.customer_id,
    }).populate('customer', ['name', 'contact', 'email'])
    if (!appointments) {
      return res.status(400).json({ msg: 'You have not made any Appointments' });
    }
    res.json(appointments);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Appointments Not Found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   GET api/appointments
// @desc    View all appointments
// @access  private
router.get('/', auth, async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('customer', ['name', 'contact', 'email'])
    res.json(appointments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/appointments/:appointment_id
// @desc    View an appointment
// @access  private
router.get('/:appointment_id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      _id: req.params.appointment_id,
    }).populate('customer', ['name', 'contact', 'email'])
    if (!appointment) {
      return res.status(400).json({ msg: 'Appointment Details Not Found' });
    }
    res.json(appointment);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Appointment Not Found' });
    }
    res.status(500).send('Server error');
  }
});

// @route    DELETE api/appointments/:appointment_id
// @desc     Delete appointment
// @access   Private
router.delete('/:appointment_id', auth, async (req, res) => {
  try {
    await Appointment.findOneAndRemove({ _id: req.params.appointment_id });
    res.json({ msg: 'Appointment deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/appointments/:appointment_id
// @desc    Update Appointments
// @access  private
router.put(
  '/:appointment_id',
  [
    auth,
    [
      check('scheduleDate', 'Date is required').not().isEmpty(),
      check('scheduleTime', 'Time is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      scheduleDate,
      scheduleTime,
      remarks,
      name,
      contact,
      email,
      animal,
      isAttended,
    } = req.body;

    const appointmentFields = {};

    if (name) appointmentFields.name = name;
    if (contact) appointmentFields.contact = contact;
    if (email) appointmentFields.email = email;
    if (isAttended) appointmentFields.isAttended = isAttended;
    if (scheduleDate) appointmentFields.scheduleDate = scheduleDate;
    if (scheduleTime) appointmentFields.scheduleTime = scheduleTime;
    if (animal) appointmentFields.animal = animal;
    if (remarks) appointmentFields.remarks = remarks;

    try {
      let appointment = await Appointment.findOne({
        _id: req.params.appointment_id,
      });

      if (appointment) {
        //Update
        appointment = await Appointment.findOneAndUpdate(
          { _id: req.params.appointment_id },
          { $set: appointmentFields },
          { new: true }
        );
        return res.json(appointment);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
