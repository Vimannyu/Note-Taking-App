const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server.js'); 
const userManagement = require('../services/userServices');

chai.use(chaiHttp);

describe('User API', () => {
  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const newUser = { id: '123', name: 'John Doe', email: 'johndoe@example.com', password: 'password123' };
      const createUserStub = async () => newUser;

      const createUserOriginal = userManagement.createUser;
      userManagement.createUser = createUserStub;

      const res = await chai.request(app).post('/api/users').send(newUser);

      expect(res).to.have.status(201);
      expect(res.body).to.deep.equal(newUser);

      userManagement.createUser = createUserOriginal;
    });
  });

  describe('GET /api/users/:id', () => {
    it('should get a user by ID', async () => {
      const userId = '123';
      const user = { id: userId, name: 'John Doe', email: 'johndoe@example.com', password: 'password123' };
      const getUserByIdStub = async () => user;

      const getUserByIdOriginal = userManagement.getUserById;
      userManagement.getUserById = getUserByIdStub;

      const res = await chai.request(app).get(`/api/users/${userId}`);

      expect(res).to.have.status(200);
      expect(res.body).to.deep.equal(user);

      userManagement.getUserById = getUserByIdOriginal;
    });

    it('should return 404 if user is not found', async () => {
      const userId = '123';
      const getUserByIdStub = async () => null;

      const getUserByIdOriginal = userManagement.getUserById;
      userManagement.getUserById = getUserByIdStub;

      const res = await chai.request(app).get(`/api/users/${userId}`);

      expect(res).to.have.status(404);
      expect(res.body).to.deep.equal({ message: 'User not found' });

      userManagement.getUserById = getUserByIdOriginal;
    });
  });

  describe('PUT /api/users/:id', () => {
    it('should update a user', async () => {
      const userId = '123';
      const updatedUser = { id: userId, name: 'John Smith', email: 'johnsmith@example.com', password: 'newpassword' };
      const updateUserStub = async () => updatedUser;

      const updateUserOriginal = userManagement.updateUser;
      userManagement.updateUser = updateUserStub;

      const res = await chai.request(app).put(`/api/users/${userId}`).send(updatedUser);

      expect(res).to.have.status(200);
      expect(res.body).to.deep.equal(updatedUser);

      userManagement.updateUser = updateUserOriginal;
    });

    it('should return 404 if user is not found', async () => {
      const userId = '123';
      const updatedUser = { id: userId, name: 'John Smith', email: 'johnsmith@example.com', password: 'newpassword' };
      const updateUserStub = async () => null;

      const updateUserOriginal = userManagement.updateUser;
      userManagement.updateUser = updateUserStub;

      const res = await chai.request(app).put(`/api/users/${userId}`).send(updatedUser);

      expect(res).to.have.status(404);
      expect(res.body).to.deep.equal({ message: 'User not found' });

      userManagement.updateUser = updateUserOriginal;
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('should delete a user', async () => {
      const userId = '123';
      const deleteUserStub = async () => {};

      const deleteUserOriginal = userManagement.deleteUser;
      userManagement.deleteUser = deleteUserStub;

      const res = await chai.request(app).delete(`/api/users/${userId}`);

      expect(res).to.have.status(204);

      userManagement.deleteUser = deleteUserOriginal;
    });

    it('should return 404 if user is not found', async () => {
      const userId = '123';
      const deleteUserStub = async () => { throw new Error('User not found'); };

      const deleteUserOriginal = userManagement.deleteUser;
      userManagement.deleteUser = deleteUserStub;

      const res = await chai.request(app).delete(`/api/users/${userId}`);

      expect(res).to.have.status(404);
    

      userManagement.deleteUser = deleteUserOriginal;
    });
  });
});
