const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const AnimalType = require('../models/AnimalType');

// @route   POST api/animal_type
// @desc    Create Animal Type
// @access  private
router.post(
  '/',
  [[check('name', 'Name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;

    let animalType = await AnimalType.findOne({ name });
    const AnimalTypeFields = {};
    if (name) AnimalTypeFields.name = name.toUpperCase();

    try {
      //Create record
      const animalType = new AnimalType(AnimalTypeFields);
      await animalType.save();
      res.json(animalType);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/animal_types
// @desc    View all Animal Types
// @access  private
router.get('/', async (req, res) => {
  try {
    const animalTypes = await AnimalType.find();
    res.json(animalTypes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/animal_types/:type_id
// @desc    View a Animal Type
// @access  private
router.get('/:type_id', async (req, res) => {
  try {
    const animalType = await AnimalType.findOne({
      _id: req.params.type_id,
    });
    if (!animalType) {
      return res.status(400).json({ msg: 'Animal Type Details Not Found' });
    }
    res.json(animalType);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Animal Type Not Found' });
    }
    res.status(500).send('Server error');
  }
});

// @route    DELETE api/animal_types/:type_id
// @desc     Delete a Animal Type
// @access   Private
router.delete('/:type_id', async (req, res) => {
  try {
    await AnimalType.findOneAndRemove({ _id: req.params.type_id });
    res.json({ msg: 'Animal Type deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/animal_types/:type_id
// @desc    Update Animal Types
// @access  private
router.put(
  '/:type_id',
  [[check('name', 'Name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;
    const AnimalTypeFields = {};
    if (name) AnimalTypeFields.name = name.toUpperCase();

    try {
      let animalType = await AnimalType.findOne({
        _id: req.params.type_id,
      });

      if (AnimalType) {
        //Update
        animalType = await AnimalType.findOneAndUpdate(
          { _id: req.params.type_id },
          { $set: AnimalTypeFields },
          { new: true }
        );
        return res.json(animalType);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
