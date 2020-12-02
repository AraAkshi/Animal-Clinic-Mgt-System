const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const ProductCategory = require('../models/ProductCategory');

// @route   POST api/product-category
// @desc    Create Product Category
// @access  private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;
    const productCategoryFields = {};
    if (name) productCategoryFields.name = name;

    try {
      //Create record
      const productCategory = new ProductCategory(productCategoryFields);
      await productCategory.save();
      res.json(productCategory);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/product-categorys
// @desc    View all Product Categorys
// @access  private
router.get('/', auth, async (req, res) => {
  try {
    const productCategorys = await ProductCategory.find()
    res.json(productCategorys);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/product-categorys/:category_id
// @desc    View a product category
// @access  private
router.get('/:category_id', auth, async (req, res) => {
  try {
    const productCategory = await ProductCategory.findOne({
      _id: req.params.category_id,
    })
    if (!productCategory) {
      return res.status(400).json({ msg: 'Product Category Details Not Found' });
    }
    res.json(productCategory);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Product Category Not Found' });
    }
    res.status(500).send('Server error');
  }
});

// @route    DELETE api/product-categorys/:category_id
// @desc     Delete a product category
// @access   Private
router.delete('/:category_id', auth, async (req, res) => {
  try {
    await ProductCategory.findOneAndRemove({ _id: req.params.category_id });
    res.json({ msg: 'Product Category deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/product-categorys/:category_id
// @desc    Update product categorys
// @access  private
router.put(
  '/:category_id',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;
    const productCategoryFields = {};
    if (name) productCategoryFields.name = name;

    try {
      let productCategory = await ProductCategory.findOne({
        _id: req.params.category_id,
      });

      if (productCategory) {
        //Update
        productCategory = await ProductCategory.findOneAndUpdate(
          { _id: req.params.category_id },
          { $set: productCategoryFields },
          { new: true }
        );
        return res.json(productCategory);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
