const { ObjectId } = require('mongodb');

function isValidObjectId(id) {
  return ObjectId.isValid(id);
}

module.exports = isValidObjectId;