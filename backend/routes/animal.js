const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const Animal = require('../models/Animal');

// @route   POST api/animal
// @desc    Create account for animal
// @access  private
router.post(
  '/',
  [
    [
      check('name', 'Name is required').not().isEmpty(),
      check('species', 'Species is required').not().isEmpty(),
      check('breed', 'Breed is required').not().isEmpty(),
      check('gender', 'Gender is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      gender,
      bloodGroup,
      dateOfBirth,
      specialRemarks,
      species,
      breed,
      customer,
    } = req.body;

    const animalFields = {};
    if (name) animalFields.name = name;
    if (gender) animalFields.gender = gender;
    if (bloodGroup) animalFields.bloodGroup = bloodGroup;
    if (dateOfBirth) animalFields.dateOfBirth = dateOfBirth;
    if (specialRemarks) animalFields.specialRemarks = specialRemarks;
    if (species) animalFields.species = species;
    if (breed) animalFields.breed = breed;
    if (customer) animalFields.customer = customer;

    try {
      //Create record
      const animal = new Animal(animalFields);
      await animal.save();
      res.json(animal);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/animals
// @desc    View all animals details
// @access  private
router.get('/', async (req, res) => {
  try {
    const animal = await Animal.find().populate('customer', [
      'name',
      'contact',
      'email',
    ]);
    res.json(animal);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/animal/:animal_id
// @desc    View an animal's details
// @access  private
router.get('/:animal_id', async (req, res) => {
  try {
    const animal = await Animal.findOne({
      _id: req.params.animal_id,
    }).populate('customer', ['name', 'contact', 'email']);
    if (!animal) {
      return res.status(400).json({ msg: 'Animal Details Not Found' });
    }
    res.json(animal);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Animal Not Found' });
    }
    res.status(500).send('Server error');
  }
});

// @route    DELETE api/animal/:animal_id
// @desc     Delete animal profile
// @access   Private
router.delete('/:animal_id', async (req, res) => {
  try {
    await Animal.findOneAndRemove({ _id: req.params.animal_id });
    res.json({ msg: 'Item deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/animal/:animal_id
// @desc    Update animal details
// @access  private
router.put(
  '/:animal_id',
  [
    [
      check('name', 'Name is required').not().isEmpty(),
      check('species', 'Species is required').not().isEmpty(),
      check('breed', ' Breed is required').not().isEmpty(),
      check('gender', 'Gender is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      bloodGroup,
      dateOfBirth,
      specialRemarks,
      species,
      breed,
      gender,
      customer,
    } = req.body;

    const animalFields = {};

    if (name) animalFields.name = name;
    if (specialRemarks) animalFields.specialRemarks = specialRemarks;
    if (species) animalFields.species = species;
    if (bloodGroup) animalFields.bloodGroup = bloodGroup;
    if (breed) animalFields.breed = breed;
    if (dateOfBirth) animalFields.dateOfBirth = dateOfBirth;
    if (customer) animalFields.customer = customer;
    if (gender) animalFields.gender = gender;

    try {
      let animal = await Animal.findOne({
        _id: req.params.animal_id,
      });

      if (animal) {
        //Update
        animal = await Animal.findOneAndUpdate(
          { _id: req.params.animal_id },
          { $set: animalFields },
          { new: true }
        );
        return res.json(animal);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
