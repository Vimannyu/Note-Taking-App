const express = require('express');
const router = express.Router();

const {
  createUser,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/userController');

// Route for creating a user
router.post('/users', createUser);

// Route for getting a user by ID
router.get('/users/:id', getUserById);

// Route for updating a user
router.put('/users/:id', updateUser);

// Route for deleting a user
router.delete('/users/:id', deleteUser);

module.exports = router;
