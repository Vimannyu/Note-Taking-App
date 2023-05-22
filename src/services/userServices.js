const { User } = require('../models/usersDB.js');

class UserManagement {
   async createUser(name, email, password) {
    const newUser = new User({ name, email, password });
    await newUser.save();
    return newUser;
  }

   async getUserById(id) {
    const user = await User.findById(id);
    return user;
  }

   async updateUser(id, name, email, password) {
    const updates = { name, email, password };
    const user = await User.findByIdAndUpdate(id, updates, { new: true });
    return user;
  }

   async deleteUser(id) {
    await User.findByIdAndRemove(id);
  }
}

module.exports = UserManagement;
