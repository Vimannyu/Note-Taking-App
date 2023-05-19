const express = require('express');
const router = express.Router();

const {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} = require('./controllers/noteController');

router.get('/api/notes', getAllNotes);
router.get('/api/notes/:id', getNoteById);
router.post('/api/notes', createNote);
router.put('/api/notes/:id', updateNote);
router.delete('/api/notes/:id', deleteNote);

module.exports = router;
