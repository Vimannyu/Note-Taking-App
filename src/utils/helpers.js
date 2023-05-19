const NoteManagement = require('../services/noteServices.js'); 

const isCategoryIDExistsInNotes = async categoryID => {
  try {


     NoteManagement = new NoteManagement();
    const notes = await NoteManagement.getAllNotes();

    const notesArray = [];

    for (const note of notes) {
      notesArray.push(note);
    }

    const isCategoryIDExists = notesArray.some(
      note => note.categoryID === categoryID
    );
    return isCategoryIDExists;
  } catch (error) {
    throw new Error('Failed to check the category ID.');
  }
};

// -----------------------------------------------------------------------------------
const checkCategoryID = async categoryID => {
  try {
    const isExists = await isCategoryIDExistsInNotes(categoryID);
    if (isExists) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
};

module.exports = {
  checkCategoryID,
};
