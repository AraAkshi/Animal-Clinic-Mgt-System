const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const Treatment = require('../models/Treatment');

// @route   POST api/treatment
// @desc    Create Treatment
// @access  private
router.post(
  '/',
  [auth],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { treatmentType, decription, dateReceived, timeReceived, customer, animal } = req.body;

    const treatmentFields = {};
    if (treatmentType) treatmentFields.treatmentType = treatmentType;
    if (decription) treatmentFields.decription = decription;
    if (dateReceived) treatmentFields.dateReceived = dateReceived;
    if (timeReceived) treatmentFields.timeReceived = timeReceived;
    if (customer) treatmentFields.customer = customer;
    if (animal) treatmentFields.animal = animal;

    try {
      //Create record
      const treatment = new Treatment(treatmentFields);
      await treatment.save();
      res.json(treatment);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/treatments
// @desc    View all treatments
// @access  private
router.get('/', auth, async (req, res) => {
  try {
    const treatments = await Treatment.find().populate('customer', ['name', 'contact', 'email']).populate('animal', ['species', 'breed', 'gender', 'name'])
    res.json(treatments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/treatments/:treatment_id
// @desc    View an treatment
// @access  private
router.get('/:treatment_id', auth, async (req, res) => {
  try {
    const treatment = await Treatment.findOne({
      _id: req.params.treatment_id,
    }).populate('customer', ['name', 'contact', 'email']).populate('animal', ['species', 'breed', 'gender', 'name'])
    if (!treatment) {
      return res.status(400).json({ msg: 'Treatment Details Not Found' });
    }
    res.json(treatment);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Treatment Not Found' });
    }
    res.status(500).send('Server error');
  }
});

// @route    DELETE api/treatments/:treatment_id
// @desc     Delete treatment
// @access   Private
router.delete('/:treatment_id', auth, async (req, res) => {
  try {
    await Treatment.findOneAndRemove({ _id: req.params.treatment_id });
    res.json({ msg: 'Treatment deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/treatments/:treatment_id
// @desc    Update treatments
// @access  private
router.put(
  '/:treatment_id',
  [auth],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      treatmentType,
      decription,
      dateReceived,
      timeReceived,
      customer,
      animal,
    } = req.body;

    const treatmentFields = {};

    if (customer) treatmentFields.customer = customer;
    if (timeReceived) treatmentFields.timeReceived = timeReceived;
    if (dateReceived) treatmentFields.dateReceived = dateReceived;
    if (treatmentType) treatmentFields.treatmentType = treatmentType;
    if (decription) treatmentFields.decription = decription;
    if (animal) treatmentFields.animal = animal;

    try {
      let treatment = await Treatment.findOne({
        _id: req.params.treatment_id,
      });

      if (treatment) {
        //Update
        treatment = await Treatment.findOneAndUpdate(
          { _id: req.params.treatment_id },
          { $set: treatmentFields },
          { new: true }
        );
        return res.json(treatment);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
