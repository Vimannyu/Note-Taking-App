const NoteManagement = require('../services/noteServices.js');

const validator = require('validator');

const utils = require('../utils/helpers.js');

const noteManagement = new NoteManagement();

// GET /api/notes
const getAllNotes = async (req, res, next) => {
  try {
    const notes = await noteManagement.getAllNotes();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

// GET /api/notes/:id
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
    next(error);
  }
};

// POST /api/notes
const createNote = async (req, res, next) => {
  try {
    const { userID, categoryID, title, content } = req.body;
    const errors = [];

    if (!validator.isUUID(userID)) {
      errors.push({ message: 'Invalid userID.' });
    }

    if (!validator.isUUID(categoryID)) {
      errors.push({ message: 'Invalid categoryID.' });
    }

    if (validator.isEmpty(title)) {
      errors.push({ message: 'Title is required.' });
    }

    if (validator.isEmpty(content)) {
      errors.push({ message: 'Content is required.' });
    }

    if (errors.length > 0) {
      const error = new Error('Invalid input.');
      error.data = errors;
      error.code = 422;
      throw error;
    }

    const completeCheck = await utils.checkCategoryID(categoryID);

    if (completeCheck) {
      console.error('categoryID already exists use some different category which is not used yet');
    } else {
      const newNote = await noteManagement.createNote(
        userID,
        categoryID,
        title,
        content
      );
      res.status(201).json(newNote);
    }

    const newNote = await noteManagement.createNote(
      userID,
      categoryID,
      title,
      content
    );
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

// PUT /api/notes/:id
const updateNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const errors = [];

    if (!validator.isUUID(req.body.userID)) {
      errors.push({ message: 'Invalid userID.' });
    }

    if (!validator.isUUID(req.body.categoryID)) {
      errors.push({ message: 'Invalid categoryID.' });
    }

    if (validator.isEmpty(req.body.title)) {
      errors.push({ message: 'Title is required.' });
    }

    if (validator.isEmpty(req.body.content)) {
      errors.push({ message: 'Content is required.' });
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
    next(error);
  }
};

// DELETE /api/notes/:id
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
