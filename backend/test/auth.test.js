const request = require("supertest");
const app = require("../src/app"); 
const { PrismaClient } = require('../src/generated/prisma')

const prisma = new PrismaClient();

describe("POST /api/users/register", () => {
  it("should register a new user successfully", async () => {
    const res = await request(app)
      .post("/api/users/register")
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it("should return 400 for missing fields", async () => {
    const res = await request(app)
      .post("/api/users/register")
      .send({
        email: "missing@example.com",
        password: "123456",
      });

    expect(res.statusCode).toBe(400);
  });

  it("should return 409 if email already exists", async () => {
    // Prisma cleanup is already handled globally.
    await prisma.user.create({
      data: {
        name: "Existing",
        email: "exist@example.com",
        password: "12345",
      },
    });

    const res = await request(app)
      .post("/api/users/register")
      .send({
        name: "Another",
        email: "exist@example.com",
        password: "password123",
      });

    expect(res.statusCode).toBe(409);
  });
});

