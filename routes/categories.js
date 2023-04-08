const express = require('express');

// controller functions
const {
  createCategory,
  getCategory,
  getCategories,
  deleteCategory,
  updateCategory,
} = require('../controllers/CategoriesController');

const router = express.Router();

// GET all items
router.get('/', getCategories);

//GET a single item
router.get('/:id', getCategory);

// POST a new item
router.post('/', createCategory);

// DELETE a item
router.delete('/:id', deleteCategory);

// UPDATE a item
router.patch('/:id', updateCategory);

module.exports = router;
