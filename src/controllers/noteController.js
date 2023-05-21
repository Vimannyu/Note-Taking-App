const logger = require('../middleware/logger.js');
const NoteManagement = require('../services/noteServices.js');
const validator = require('validator');
const utils = require('../utils/helper.js');

const noteManagement = new NoteManagement();

const getAllNotes = async (req, res, next) => {
  try {
    const notes = await noteManagement.getAllNotes();
    res.status(200).json(notes);
  } catch (error) {
    logger.error('An error occurred while getting all notes:', error);
    next(error);
  }
};
//-----------------------------------------------------------------------------
const getNoteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const note = await noteManagement.getNoteById(id);
    if (note) {
      res.status(200).json(note);
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (error) {
    logger.error('An error occurred while getting a note by ID:', error);
    next(error);
  }
};
//-------------------------------------------------------------------------------------------------------------
const createNote = async (req, res, next) => {
  try {
    const { userID, categoryID, title, content } = req.body;

    const errors = [];

    if (!utils.isValidObjectID(userID)) {
      errors.push({ field: 'userID', message: 'Enter valid userID' });
    }

    if (!utils.isValidObjectID(categoryID)) {
      errors.push({ field: 'categoryID', message: 'Enter valid categoryID' });
    }

    if (validator.isEmpty(title)) {
      errors.push({ field: 'title', message: 'Title is required.' });
    }

    if (validator.isEmpty(content)) {
      errors.push({ field: 'content', message: 'Content is required.' });
    }

    if (errors.length > 0) {
      const error = new Error('Invalid input.');
      error.data = errors;
      error.code = 422;
      throw error;
    }

    const newNote = await noteManagement.createNote(
      userID,
      categoryID,
      title,
      content
    );
    res.status(201).json(newNote);
  } catch (error) {
    logger.error('An error occurred while creating a note:', error);
    if (error.code == 11000) {
      logger.error('Error: Category ID already exists!');
    } else {
      logger.error('Error:', error.message);
    }
    next(error);
  }
};
//-------------------------------------------------------------------------------------------------
const updateNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const errors = [];

    if (!utils.isValidObjectID(userID)) {
      errors.push({ field: 'userID', message: 'Enter valid userID' });
    }

    if (!utils.isValidObjectID(categoryID)) {
      errors.push({ field: 'categoryID', message: 'Enter valid categoryID' });
    }

    if (validator.isEmpty(title)) {
      errors.push({ field: 'title', message: 'Title is required.' });
    }

    if (validator.isEmpty(content)) {
      errors.push({ field: 'content', message: 'Content is required.' });
    }

    if (errors.length > 0) {
      const error = new Error('Invalid input.');
      error.data = errors;
      error.code = 422;
      throw error;
    }

    const updatedNote = await noteManagement.updateNote(id, updates);
    if (updatedNote) {
      res.status(200).json(updatedNote);
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (error) {
    logger.error('An error occurred while updating a note:', error);
    next(error);
  }
};
//-------------------------------------------------------------------------------------------------------------
const deleteNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedNote = await noteManagement.deleteNote(id);
    if (deletedNote) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (error) {
    logger.error('An error occurred while deleting a note:', error);
    next(error);
  }
};

module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
};
