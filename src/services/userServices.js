


class UserManagement {
   
  
    async createUser(ID, userID, name, email, password) {
      const newUser = new User({ ID, userID, name, email, password });
      await newUser.save();
      return newUser;
    }
  
    async getUserById(id) {
      const user = await User.findById(id);
      return user;
    }
  
    async updateUser(id, ID, userID, name, email, password) {
      const updates = { ID, userID, name, email, password };
      const user = await User.findByIdAndUpdate(id, updates, { new: true });
      return user;
    }
  
    async deleteUser(id) {
      await User.findByIdAndRemove(id);
    }
  }
  
  module.exports = UserManagement;