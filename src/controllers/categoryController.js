const logger = require('../middleware/logger.js');
const CategoryManagement = require('../services/categoryServices.js');
const validator = require('validator');
const utils = require('../utils/helper');

const categoryManagement = new CategoryManagement();
//-----------------------------------------------------------------------------------------------------------
const getCategories = async (req, res, next) => {
  try {
    const categories = await categoryManagement.getCategories();
    res.status(200).json(categories);
  } catch (error) {
    logger.error('An error occurred while getting categories:', error);
    next(error);
  }
};
//--------------------------------------------------------------------------------------------------------------
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
    logger.error('An error occurred while getting a category by ID:', error);
    next(error);
  }
};
//-------------------------------------------------------------------------------------------------------------
const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    const errors = [];
    const existingCategory = await utils.getCategoryByName(name);

    if (existingCategory) {
      logger.info('Category name  already exists');
      res.status(422).message('Category already present in DB');
    }


    if (validator.isEmpty(name) || !validator.isLength(name, { min: 3 })) {
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
    logger.error('An error occurred while creating a category:', error);
    next(error);
  }
};
//---------------------------------------------------------------------------------------------------------------
const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const errors = [];

    if (validator.isEmpty(name) || !validator.isLength(name, { min: 3})) {
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
    logger.error('An error occurred while updating a category:', error);
    next(error);
  }
};
//----------------------------------------------------------------------------------------------------------------
const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    await categoryManagement.deleteCategory(id);
    res.sendStatus(204);
  } catch (error) {
    logger.error('An error occurred while deleting a category:', error);
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
