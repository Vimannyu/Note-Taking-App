const express = require('express');
const router = express.Router();

const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');

// Route for getting all categories
router.get('/api/categories', getCategories);

// Route for getting a category by ID
router.get('/api/categories/:id', getCategoryById);

// Route for creating a category
router.post('/api/categories', createCategory);

// Route for updating a category
router.put('/api/categories/:id', updateCategory);

// Route for deleting a category
router.delete('/api/categories/:id', deleteCategory);

module.exports = router;
