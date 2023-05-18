const CategoryManagement = require('../service/categoryServices.js');
const validator = require('validator');

const categoryManagement = new CategoryManagement();

// GET /api/categories
const getCategories = async (req, res, next) => {
  try {
    const categories = await categoryManagement.getCategories();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

// GET /api/categories/:id
const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await categoryManagement.getCategoryById(id);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    next(error);
  }
};

// POST /api/categories
const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    const errors = [];

    if (validator.isEmpty(name) || !validator.isLength(password, { min: 10 })) {
      errors.push({ message: 'Category name should not be empty!' });
    }

    if (errors.length > 0) {
      const error = new Error('Invalid input.');
      error.data = errors;
      error.code = 422;
      throw error;
    }
    const newCategory = await categoryManagement.createCategory(name);
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};

// PUT /api/categories/:id
const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const errors = [];

    if (validator.isEmpty(name) || !validator.isLength(password, { min: 10 })) {
      errors.push({ message: 'Category name should not be empty!' });
    }

    if (errors.length > 0) {
      const error = new Error('Invalid input.');
      error.data = errors;
      error.code = 422;
      throw error;
    }
    const updatedCategory = await categoryManagement.updateCategory(id, name);
    if (updatedCategory) {
      res.status(200).json(updatedCategory);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    next(error);
  }
};

// DELETE /api/categories/:id
const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    await categoryManagement.deleteCategory(id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
