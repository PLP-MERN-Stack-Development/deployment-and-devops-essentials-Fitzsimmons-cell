const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let app;
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongoServer.getUri();
  process.env.NODE_ENV = 'test';
  app = require('../server');
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let coll of collections) {
    await coll.deleteMany({});
  }
});

test('Create and fetch bugs', async () => {
  const bug = { title: 'Test bug', description: 'It fails', priority: 'high' };

  const createRes = await request(app).post('/api/bugs').send(bug);
  expect(createRes.status).toBe(201);
  expect(createRes.body.title).toBe('Test bug');

  const listRes = await request(app).get('/api/bugs');
  expect(listRes.status).toBe(200);
  expect(Array.isArray(listRes.body)).toBe(true);
  expect(listRes.body.length).toBe(1);
});
