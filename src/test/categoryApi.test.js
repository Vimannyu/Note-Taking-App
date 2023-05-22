const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const app = require('../server');


chai.use(chaiHttp);

describe('Category API', () => {
  let categoryManagementMock;
  let createdCategoryId; // Variable to store the ID of the created category

  beforeEach(() => {
    categoryManagementMock = {
      getCategories: () => Promise.resolve([
        { _id: new mongoose.Types.ObjectId(), name: 'Category 1' },
        { _id: new mongoose.Types.ObjectId(), name: 'Category 2' },
      ]),
      getCategoryById: (id) => Promise.resolve({ _id: id, name: 'Category' }),
      createCategory: () => {
        const newCategory = { _id: new mongoose.Types.ObjectId(), name: 'New Category' };
        createdCategoryId = newCategory._id; // Store the ID of the created category
        return Promise.resolve(newCategory);
      },
      updateCategory: () => Promise.resolve({ _id: new mongoose.Types.ObjectId(), name: 'Updated Category' }),
      deleteCategory: () => Promise.resolve(),
    };
  });

  it('should return all categories', async () => {
    // Make a request to the endpoint that fetches all categories
    const res = await chai.request(app).get('/api/categories');

    // Assert the response status code and the response body
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.have.lengthOf.at.least(2);
;
  });

  it('should return a category by ID', async () => {
    const categoryId = '646b68509eab78b2f9a1b08c'; // Generate a random category ID

     // Make a request to the endpoint that fetches a category by ID
    const res = await chai.request(app).get(`/api/categories/${categoryId}`);

    // Assert the response status code and the response body
    expect(res).to.have.status(200);
   expect(res.body).to.be.an('object');
   expect(res.body).to.have.property('_id', categoryId);
   expect(res.body).to.have.property('name', 'Category');
   });

  it('should create a new category', async () => {
   // Make a request to the endpoint that creates a new category
   const res = await chai.request(app).post('/api/categories').send({ name: 'New Category' });

    // Assert the response status code and the response body
    expect(res).to.have.status(201);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('_id').that.is.a('string');
    expect(res.body).to.have.property('name', 'New Category');

    // Store the created category ID for later use
    createdCategoryId = res.body._id;
  });

  it('should update a category', async () => {
    const updatedName = 'Updated Category';

    // Make a request to the endpoint that updates a category
    const res = await chai
      .request(app)
      .put(`/api/categories/${createdCategoryId}`)
      .send({ name: updatedName });

    // Assert the response status code and the response body
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('_id', createdCategoryId);
    expect(res.body).to.have.property('name', updatedName);
  });

  it('should delete a category', async () => {
    // Make a request to the endpoint that deletes a category
    const res = await chai.request(app).delete(`/api/categories/${createdCategoryId}`);

    // Assert the response status code
    expect(res).to.have.status(204);
  });
});