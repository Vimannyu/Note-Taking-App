


class CategoryManagement {
   
  
    async getCategories() {
      const categories = await Category.find();
      return categories;
    }
  
    async getCategoryById(id) {
      const category = await Category.findById(id);
      return category;
    }
  
    async createCategory(ID, userID, name) {
      const newCategory = new Category({ ID, userID, name });
      await newCategory.save();
      return newCategory;
    }
  
    async updateCategory(id, ID, userID, name) {
      const updates = { ID, userID, name };
      const category = await Category.findByIdAndUpdate(id, updates, { new: true });
      return category;
    }
  
    async deleteCategory(id) {
      await Category.findByIdAndRemove(id);
    }
  }
  
  module.exports = CategoryManagement;