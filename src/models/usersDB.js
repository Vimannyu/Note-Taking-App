const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  ID: { type: String, required: true },
  userID: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// Define the user model
const User = mongoose.model('User', userSchema);
