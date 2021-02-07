const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const checkObjectId = require('../middleware/checkObjectId');
const { check, validationResult } = require('express-validator');
const Employee = require('../models/Employee');
const User = require('../models/User');

// @route   POST api/employees
// @desc    Add/Update employees
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('nic', 'Please enter a valid NIC number').isLength({ min: 10 }),
      check('name', 'Name is required').not().isEmpty(),
      check('email', 'Please include a valid email').isEmail(),
      check('contact', 'Contact No is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { nic, name, email, address, contact, epfNo, role } = req.body;

    const employeeFields = {};
    if (nic) employeeFields.nic = nic;
    if (name) employeeFields.name = name;
    if (email) employeeFields.email = email;
    if (address) employeeFields.address = address;
    if (contact) employeeFields.contact = contact;
    if (epfNo) employeeFields.epfNo = epfNo;
    if (role) employeeFields.role = role;

    try {
      let employee = await Employee.findOne({
        _id: req.params.employee_id,
      });

      if (employee) {
        //Update
        employee = await Employee.findOneAndUpdate(
          { _id: req.params.employee_id },
          { $set: employeeFields },
          { new: true }
        );
      } else {
        //Create record
        employee = new Employee(employeeFields);
        await employee.save();

        //Create record in user table
        const password = 'admin1234';
        user = new User({ email, password, role });

        //Encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
      }
      return res.json(employee);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    GET api/employees/:employee_id
// @desc     Get employee by employee ID
// @access   Private
router.get(
  '/:employee_id',
  checkObjectId('employee_id'),
  async ({ params: { employee_id } }, res) => {
    try {
      const employee = await Employee.findOne({ _id: employee_id });

      if (!employee) return res.status(400).json({ msg: 'Employee not found' });
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server error' });
    }
  }
);

// @route    GET api/employees
// @desc     Get all employees
// @access   Private
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/employee
// @desc     Delete employee
// @access   Private
router.delete('/:employee_id', auth, async (req, res) => {
  try {
    //Remove employee
    await Employee.findOneAndRemove({ _id: req.params.employee_id });
    res.json({ msg: 'Employee deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
