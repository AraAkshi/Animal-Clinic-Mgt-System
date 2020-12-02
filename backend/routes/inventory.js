const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const Inventory = require('../models/Inventory');

// @route   POST api/inventory-item
// @desc    Create Inventory Items
// @access  private
router.post(
  '/',
  [
    auth,
    [
      check('productName', 'Product Name is required').not().isEmpty(),
      check('quantity', 'Quantity is required').not().isEmpty(),
      check('bufferQuantity', 'Buffer Quantity is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { productName, productCategory, brand, unitPurchasePrice, unitSellingPrice, quantity, bufferQuantity, purchasedDate, manufacturedDate, expireDate, addedDate } = req.body;

    const itemFields = {};
    // itemFields.notifyExpBefore = manufacturedDate.getDate() - ;
    if (productName) itemFields.productName = productName;
    if (productCategory) itemFields.productCategory = productCategory;
    if (brand) itemFields.brand = brand;
    if (unitPurchasePrice) itemFields.unitPurchasePrice = unitPurchasePrice;
    if (unitSellingPrice) itemFields.unitSellingPrice = unitSellingPrice;
    if (quantity) itemFields.quantity = quantity;
    if (bufferQuantity) itemFields.bufferQuantity = bufferQuantity;
    if (purchasedDate) itemFields.purchasedDate = purchasedDate;
    if (manufacturedDate) itemFields.manufacturedDate = manufacturedDate;
    if (expireDate) itemFields.expireDate = expireDate;
    if (addedDate) itemFields.addedDate = addedDate;

    try {
      //Create record
      const inventory = new Inventory(itemFields);
      await inventory.save();
      res.json(inventory);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/inventory
// @desc    View all inventory items
// @access  private
router.get('/', auth, async (req, res) => {
  try {
    const items = await Inventory.find().populate('productCategory', ['name'])
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/inventory/:item_id
// @desc    View an item in inventory
// @access  private
router.get('/:item_id', auth, async (req, res) => {
  try {
    const inventory = await Inventory.findOne({
      _id: req.params.item_id,
    }).populate('productCategory', ['name'])
    if (!inventory) {
      return res.status(400).json({ msg: 'Item Details Not Found' });
    }
    res.json(inventory);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Item Not Found' });
    }
    res.status(500).send('Server error');
  }
});

// @route    DELETE api/inventory/:item_id
// @desc     Delete inventory
// @access   Private
router.delete('/:item_id', auth, async (req, res) => {
  try {
    await Inventory.findOneAndRemove({ _id: req.params.item_id });
    res.json({ msg: 'Item deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/inventory/:item_id
// @desc    Update Inventory Items
// @access  private
router.put(
  '/:item_id',
  [
    auth,
    [
      check('productName', 'Product Name is required').not().isEmpty(),
      check('quantity', 'Quantity is required').not().isEmpty(),
      check('bufferQuantity', 'Buffer Quantity is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      productName,
      brand,
      unitPurchasePrice,
      name,
      unitSellingPrice,
      quantity,
      bufferQuantity,
      isEmpty,
      purchasedDate, manufacturedDate, expireDate, notifyExpBefore, addedDate
    } = req.body;

    const itemFields = {};

    if (name) itemFields.name = name;
    if (unitSellingPrice) itemFields.unitSellingPrice = unitSellingPrice;
    if (quantity) itemFields.quantity = quantity;
    if (isEmpty) itemFields.isEmpty = isEmpty;
    if (productName) itemFields.productName = productName;
    if (brand) itemFields.brand = brand;
    if (bufferQuantity) itemFields.bufferQuantity = bufferQuantity;
    if (unitPurchasePrice) itemFields.unitPurchasePrice = unitPurchasePrice;
    if (purchasedDate) itemFields.purchasedDate = purchasedDate;
    if (manufacturedDate) itemFields.manufacturedDate = manufacturedDate;
    if (expireDate) itemFields.expireDate = expireDate;
    if (notifyExpBefore) itemFields.notifyExpBefore = notifyExpBefore;
    if (addedDate) itemFields.addedDate = addedDate;

    try {
      let inventory = await Inventory.findOne({
        _id: req.params.item_id,
      });

      if (inventory) {
        //Update
        inventory = await Inventory.findOneAndUpdate(
          { _id: req.params.item_id },
          { $set: itemFields },
          { new: true }
        );
        return res.json(inventory);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
