const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Customer = require('../models/Customer');
const auth = require('../middleware/auth');
const checkObjectId = require('../middleware/checkObjectId');

// @route   POST api/customers
// @desc    Register user
// @access  Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('contact', 'Contact No is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, address, contact } = req.body;
    try {
      let customer = await Customer.findOne({ email });
      //Check if user already exists
      if (customer) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists!' }] });
      }
      customer = new Customer({ name, email, address, contact });
      const user = await customer.save();
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    GET api/customer/me
// @desc     Get current users customer
// @access   Private
router.get('/me', async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.user.id });
    res.json(customer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/customers/:customer_id
// @desc     Get customer by user ID
// @access   Private
router.get(
  '/:customer_id',
  checkObjectId('customer_id'),
  async ({ params: { customer_id } }, res) => {
    try {
      const customer = await Customer.findOne({ _id: customer_id });

      if (!customer) return res.status(400).json({ msg: 'customer not found' });
      return res.json(customer);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server error' });
    }
  }
);

// @route    GET api/customer
// @desc     Get all customers
// @access   Private
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/customers
// @desc    Update customer
// @access  private
router.post('/:customer_id', async (req, res) => {
  const { name, email, contact, address } = req.body;

  const customerFields = {};
  if (name) customerFields.name = name;
  if (email) customerFields.email = email;
  if (contact) customerFields.contact = contact;
  if (address) customerFields.address = address;

  try {
    let customer = await Customer.findOne({ _id: req.params.customer_id });

    if (customer) {
      //Update
      customer = await Customer.findOneAndUpdate(
        { _id: req.params.customer_id },
        { $set: customerFields },
        { new: true }
      );
      return res.json(customer);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/customer
// @desc     Delete user
// @access   Private
router.delete('/:customer_id', async (req, res) => {
  try {
    //Remove User
    await Customer.findOneAndRemove({ _id: req.params.customer_id });
    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
