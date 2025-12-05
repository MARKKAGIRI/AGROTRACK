const request = require("supertest");
const app = require("../src/app");
const { PrismaClient } = require("../src/generated/prisma");

const prisma = new PrismaClient();

describe("Authentication tests", () => {
  describe("Registration", () => {
    it("should register a new user successfully", async () => {
      const res = await request(app).post("/api/users/register").send({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
    });

    it("should return 400 for missing fields", async () => {
      const res = await request(app).post("/api/users/register").send({
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

      const res = await request(app).post("/api/users/register").send({
        name: "Another",
        email: "exist@example.com",
        password: "password123",
      });

      expect(res.statusCode).toBe(409);
    });
  });

  describe("Login", () => {
    // successful login
    it("Should Login a user", async () => {
      await request(app).post("/api/users/register").send({
        name: "Test User",
        email: "test@example.com",
        password: "test123",
      });

      const res = await request(app).post("/api/users/login").send({
        email: "test@example.com",
        password: "test123",
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });

    // invalid password
    it("Should return, Password is invalid", async () => {
      await request(app).post("/api/users/register").send({
        name: "Test User",
        email: "test@example.com",
        password: "test123",
      });

      const res = await request(app).post("/api/users/login").send({
        email: "test@example.com",
        password: "wrongpassword",
      });

      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
    });

    // non existent user
    it("Should return, Email not found", async () => {
      const res = await request(app).post("/api/users/login").send({
        email: "invaliduser@gmail.com",
        password: "password123",
      });
      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
    });

    // missing fields
    it("Should return, All fields are required", async () => {
      const res = await request(app).post("/api/users/login").send({
        email: "test@example.com",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });
});
