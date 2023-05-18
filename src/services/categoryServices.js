

const Category = require('../models/categoriesDB.js');

class CategoryManagement {
   
  
    async getCategories() {
      const categories = await Category.find();
      return categories;
    }
  
    async getCategoryById(id) {
      const category = await Category.findById(id);
      return category;
    }
  
    async createCategory( name) {
      const newCategory = new Category({  name });
      await newCategory.save();
      return newCategory;
    }
  
    async updateCategory(id, name) {
      const updates = { name };
      const category = await Category.findByIdAndUpdate(id, updates, { new: true });
      return category;
    }
  
    async deleteCategory(id) {
      await Category.findByIdAndRemove(id);
    }
  }
  
  module.exports = CategoryManagement;