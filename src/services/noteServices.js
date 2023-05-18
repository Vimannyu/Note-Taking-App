

const Note = require('../models/notesDB.js');

class NoteManagement {
    // Retrieve a list of all notes
    static async getAllNotes() {
      try {
        const notes = await Note.find();
        return notes;
      } catch (error) {
        throw new Error('Failed to retrieve notes.');
      }
    }
  
    // Retrieve a specific note by its ID
    static async getNoteById(id) {
      try {
        const note = await Note.findById(id);
        return note;
      } catch (error) {
        throw new Error('Failed to retrieve the note.');
      }
    }
  
    // Create a new note
    static async createNote(userID, categoryID, title, content) {
        try {
          const currentTime = new Date();
          const note = await Note.create({ userID, categoryID, title, content, createdAt: currentTime, updatedAt: currentTime });
          return note;
        } catch (error) {
          throw new Error('Failed to create the note.');
        }
      }
    
  
    // Update an existing note
    static async updateNote(id, updates) {
        try {
          updates.updatedAt = new Date();
          const note = await Note.findByIdAndUpdate(id, updates, { new: true });
          return note;
        } catch (error) {
          throw new Error('Failed to update the note.');
        }
      }
    
  
    // Delete a note
    static async deleteNote(id) {
      try {
        const note = await Note.findByIdAndDelete(id);
        return note;
      } catch (error) {
        throw new Error('Failed to delete the note.');
      }
    }
  }
  
  module.exports = NoteManagement;