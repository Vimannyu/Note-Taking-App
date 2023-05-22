const logger = require('../middleware/logger.js');
const UserManagement = require('../services/userServices.js');
const validator = require('validator');
const utils = require('../utils/helper');
const bcrypt = require('bcryptjs');


const userManagement = new UserManagement();


const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await utils.getUserByEmail(email);

     if (existingUser) {
       logger.info('User already exists');
       res.status(422).message('User already present in DB');
  
    }

    const errors = [];
    if (!validator.isEmail(email)) {
      errors.push({ message: 'E-Mail is invalid.' });
      res.status(422);
    }
    if (
      validator.isEmpty(password) ||
      !validator.isLength(password, { min: 8 })
    ) {
      errors.push({ message: 'Password too short!' });
    }

    if (errors.length > 0) {
      const error = new Error('Invalid input.');
      error.data = errors;
      error.code = 422;
      throw error;
    }
    const hashedPw = await bcrypt.hash(password, 12);
    const newUser = await userManagement.createUser(name, email, hashedPw);
    res.status(201).json(newUser);
  } catch (error) {
    logger.error('An error occurred while creating a user:', error);
    next(error);
  }
};
//-----------------------------------------------------------------------------------------------------------------------------
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userManagement.getUserById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    logger.error('An error occurred while fetching user by ID:', error);
    next(error);
  }
};
//--------------------------------------------------------------------------------------------------------------------------------
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const errors = [];
    if (!validator.isEmail(email)) {
      errors.push({ message: 'E-Mail is invalid.' });
    }
    if (
      validator.isEmpty(password) ||
      !validator.isLength(password, { min: 8 })
    ) {
      errors.push({ message: 'Password too short!' });
    }

    if (errors.length > 0) {
      const error = new Error('Invalid input.');
      error.data = errors;
      error.code = 422;
      throw error;
    }
    
    const updatedUser = await userManagement.updateUser(
      id,
      name,
      email,
      password
    );
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    logger.error('An error occurred while updating a user:', error);
    next(error);
  }
};
//-----------------------------------------------------------------------------------------------------------------
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await userManagement.deleteUser(id);
    res.sendStatus(204);
  } catch (error) {
    logger.error('An error occurred while deleting a user:', error);
    res.sendStatus(404);
    next(error);
  }
};

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
