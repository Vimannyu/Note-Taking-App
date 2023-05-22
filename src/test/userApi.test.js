const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server.js');
const UserManagement = require('../services/userServices');
const { ObjectId } = require('mongodb');

const userManagement = new UserManagement();
chai.use(chaiHttp);

describe('User API', () => {
  let createdUserId;

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const newUser = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
      };

      const res = await chai.request(app).post('/api/users').send(newUser);

      expect(res).to.have.status(201);
      expect(res.body).to.have.property('_id');
      expect(res.body.name).to.equal(newUser.name);
      expect(res.body.email).to.equal(newUser.email);

      createdUserId = res.body._id;
    });
  });

  describe('GET /api/users/:id', () => {
    it('should get a user by ID', async () => {
      const res = await chai.request(app).get(`/api/users/${createdUserId}`);

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('_id');
      expect(res.body.name).to.equal('John Doe');
      expect(res.body.email).to.equal('johndoe@example.com');
    });

    it('should return 404 if user is not found', async () => {
      const nonExistingUserId = new ObjectId().toString();

      const res = await chai.request(app).get(`/api/users/${nonExistingUserId}`);

      expect(res).to.have.status(404);
      expect(res.body).to.deep.equal({ message: 'User not found' });
    });
  });

  describe('PUT /api/users/:id', () => {
    it('should update a user', async () => {
      const updatedUser = {
        name: 'John Smith',
        email: 'johnsmith@example.com',
        password: 'newpassword',
      };

      const res = await chai.request(app).put(`/api/users/${createdUserId}`).send(updatedUser);

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('_id');
      expect(res.body.name).to.equal(updatedUser.name);
      expect(res.body.email).to.equal(updatedUser.email);
    });

    it('should return 404 if user is not found', async () => {
      const nonExistingUserId = new ObjectId().toString();
      const updatedUser = {
        name: 'John Smith',
        email: 'johnsmith@example.com',
        password: 'newpassword',
      };

      const res = await chai.request(app).put(`/api/users/${nonExistingUserId}`).send(updatedUser);

      expect(res).to.have.status(404);
      expect(res.body).to.deep.equal({ message: 'User not found' });
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('should delete a user', async () => {
      const res = await chai.request(app).delete(`/api/users/${createdUserId}`);

      expect(res).to.have.status(204);
    });

    it('should return 404 if user is not found', async () => {

      const nonExistingUserId = '123';

      const res = await chai.request(app).delete(`/api/users/${nonExistingUserId}`);

      expect(res).to.have.status(404);
    
    });
  });
});
