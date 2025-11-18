const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let app;
let mongoServer;

beforeAll(async () => {
  process.env.NODE_ENV = "test";
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  process.env.MONGO_URI = uri;
  app = require("../index");
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

test("should create and fetch a bug", async () => {
  const newBug = { title: "Test Bug", description: "Sample bug", priority: "high" };

  const createRes = await request(app).post("/api/bugs").send(newBug);
  expect(createRes.status).toBe(201);
  expect(createRes.body.title).toBe("Test Bug");

  const listRes = await request(app).get("/api/bugs");
  expect(listRes.status).toBe(200);
  expect(listRes.body.length).toBe(1);
});
