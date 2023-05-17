

const mongoose = require('mongoose');

// Define the category schema
const categorySchema = new mongoose.Schema({
  ID: { type: String, required: true },
  userID: { type: String, required: true },
  name: { type: String, required: true }
});

// Define the category model
const Category = mongoose.model('Category', categorySchema);