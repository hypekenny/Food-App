/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  id: 'c34e856d-6624-40be-b9b1-98860bee0b40',
  title: 'Milanea a la napolitana',
  summary: 'xxxxx'
};

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  describe('GET /recipes', () => {
    it('should get 200', () =>
      agent.get('/recipes').expect(200)
    );
  });
  describe('POST /recipes', () => {
    it('should get 200 and the recipe just added', () => {
      agent.post('/recipes')
      .send({title: 'Milanesa', summary: 'xxx'})
      .expect(200);      
    });
  })
});
