const { ObjectId } = require('mongodb');
const {User}   = require('../models/usersDB')
const {Category}  = require('../models/categoriesDB')

function isValidObjectId(id) {
  return ObjectId.isValid(id);
}

//---------------------------------------------------------------------------------------------------------------

const getUserByEmail = async (email) => {
    const existingUser = await User.findOne({ email });
    return existingUser;
  };

  const getCategoryByName = async (name) => {
    const existingCategoryName = await Category.findOne({ name });
    return existingCategoryName;
  };



module.exports ={ isValidObjectId,
                   getUserByEmail,
                   getCategoryByName };