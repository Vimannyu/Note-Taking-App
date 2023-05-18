

const mongoose = require('mongoose');

// Define the category schema
const categorySchema = new mongoose.Schema({

  name: { type: String, required: true }
});

// Define the category model
const Category = mongoose.model('Category', categorySchema);


module.exports = {
  categorySchema,
  Category,
};