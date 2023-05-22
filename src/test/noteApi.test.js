// const { expect } = require('chai');
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const mongoose = require('mongoose');
// const app = require('../server.js');

// chai.use(chaiHttp);

// describe('Note API', () => {
//   let createdNoteId; // Variable to store the ID of the created note

//   beforeEach(() => {
//     noteManagementMock = {
//       getAllNotes: () => Promise.resolve([
//         { _id: new mongoose.Types.ObjectId(), userID: new mongoose.Types.ObjectId(), categoryID: new mongoose.Types.ObjectId(), title: 'Note 1', content: 'Content 1' },
//         { _id: new mongoose.Types.ObjectId(), userID: new mongoose.Types.ObjectId(), categoryID: new mongoose.Types.ObjectId(), title: 'Note 2', content: 'Content 2' },
//       ]),
//       getNoteById: (id) => Promise.resolve({ _id: id, userID: new mongoose.Types.ObjectId(), categoryID: new mongoose.Types.ObjectId(), title: 'Note', content: 'Content' }),
//       createNote: () => {
//         const newNote = { _id: new mongoose.Types.ObjectId(), userID: new mongoose.Types.ObjectId(), categoryID: new mongoose.Types.ObjectId(), title: 'New Note', content: 'New Content' };
//         createdNoteId = newNote._id; // Store the ID of the created note
//         return Promise.resolve(newNote);
//       },
//       updateNote: () => Promise.resolve({ _id: new mongoose.Types.ObjectId(), userID: new mongoose.Types.ObjectId(), categoryID: new mongoose.Types.ObjectId(), title: 'Updated Note', content: 'Updated Content' }),
//       deleteNote: () => Promise.resolve(),
//     };
//   });

//   it('should return all notes', async () => {
//     // Make a request to the endpoint that fetches all notes
//     const res = await chai.request(app).get('/api/notes');

//     // Assert the response status code and the response body
//     expect(res).to.have.status(200);
//     expect(res.body).to.be.an('array');
//     expect(res.body).to.have.lengthOf.at.least(2);
// ;
// ;
//   });

//   it('should return a note by ID', async () => {
//     const noteId = '6468b151a441c46b5239b1ef'; 

//     // Make a request to the endpoint that fetches a note by ID
//     const res = await chai.request(app).get(`/api/notes/${noteId}`);

//     // Assert the response status code and the response body
//     expect(res).to.have.status(200);
//     expect(res.body).to.be.an('object');
//     expect(res.body).to.have.property('_id', noteId);
//     expect(res.body).to.have.property('title', 'Sample Title');
//     expect(res.body).to.have.property('content', 'Content');
//   });

//   it('should create a new note', async () => {
//     // Make a request to the endpoint that creates a new note
//     const res = await chai.request(app).post('/api/notes').send({
//       userID: new mongoose.Types.ObjectId(),
//       categoryID: new mongoose.Types.ObjectId(),
//       title: 'New Note',
//       content: 'New Content',
//     });

//     // Assert the response status code and the response body
//     expect(res).to.have.status(201);
//     expect(res.body).to.be.an('object');
//     expect(res.body).to.have.property('_id').that.is.a('string');
//     expect(res.body).to.have.property('userID').that.is.a('string');
//     expect(res.body).to.have.property('categoryID').that.is.a('string');
//     expect(res.body).to.have.property('title', 'New Note');
//     expect(res.body).to.have.property('content', 'New Content');

//     createdNoteId = res.body._id; // Update the createdNoteId with the ID of the created note
//   });

//   it('should update a note', async () => {
//     const updatedTitle = 'Updated Note';
//     const updatedContent = 'Updated Content';

//     // Make a request to the endpoint that updates a note using the createdNoteId
//     const res = await chai.request(app).put(`/api/notes/${createdNoteId}`).send({
      
//       title: updatedTitle,
//       content: updatedContent,
//     });

//     // Assert the response status code and the response body
//     expect(res).to.have.status(200);
//     expect(res.body).to.be.an('object');
//     expect(res.body).to.have.property('title', updatedTitle);
//     expect(res.body).to.have.property('content', updatedContent);
//   });

//   it('should delete a note', async () => {
//     // Make a request to the endpoint that deletes the note using the createdNoteId
//     const res = await chai.request(app).delete(`/api/notes/${createdNoteId}`);

//     // Assert the response status code
//     expect(res).to.have.status(204);
//   });
// });
