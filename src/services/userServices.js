const {User} = require('../models/usersDB.js');

const createUser = async (name, email, password) => {
  const newUser = new User({ name, email, password });
  await newUser.save();
  return newUser;
};

const getUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};

const updateUser = async (id, name, email, password) => {
  const updates = { name, email, password };
  const user = await User.findByIdAndUpdate(id, updates, { new: true });
  return user;
};

const deleteUser = async (id) => {
  await User.findByIdAndRemove(id);
};

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser
};
