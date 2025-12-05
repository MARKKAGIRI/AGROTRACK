const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../src/app");
const { PrismaClient } = require("../src/generated/prisma");

const prisma = new PrismaClient();

// generate the tokens for tests

const generateToken = (payload = {}) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

describe("GET /api/users/:userId Get User Profile", () => {
  // missing id in the endpoing
  it("should return 404 if userId is missing", async () => {
    const token = generateToken({ id: "testUser" });

    const res = await request(app)
      .get("/api/users/")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
  });

  // non existent id
  it("should return 404 if user does not exist", async () => {
    const token = generateToken({ id: "testUser" });

    const res = await request(app)
      .get("/api/users/nonexistent-id")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });

  // success profile retriaval
  it("should return 200 and user profile", async () => {
    const user = await prisma.user.create({
      data: {
        id: "123",
        name: "Test User",
        email: "test@example.com",
        role: "farmer",
        location: "Nairobi",
        password: "hashedpass",
      },
    });

    const token = generateToken({ id: user.id, email: user.email });

    const res = await request(app)
      .get(`/api/users/${user.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toMatchObject({
      id: user.id,
      name: "Test User",
      email: "test@example.com",
      role: "farmer",
      location: "Nairobi",
    });
  });
});

describe("PUT /api/users/:userId - Update User Profile", () => {

  it("should return 400 when no fields are provided", async () => {
    const token = generateToken({ id: "123" });

    const res = await request(app)
      .put("/api/users/123")
      .set("Authorization", `Bearer ${token}`)
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("At least one field is required to update");
  });

  it("should return 404 if user is not found", async () => {
    const token = generateToken({ id: "123" });

    const res = await request(app)
      .put("/api/users/nonexistent-id")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "New Name" });

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });

  it("should return 409 if email is already taken", async () => {
    const user1 = await prisma.user.create({
      data: {
        id: "u1",
        name: "User One",
        email: "one@example.com",
        password: "pass",
      },
    });

    const user2 = await prisma.user.create({
      data: {
        id: "u2",
        name: "User Two",
        email: "two@example.com",
        password: "pass",
      },
    });

    const token = generateToken({ id: user2.id, email: user2.email });

    const res = await request(app)
      .put(`/api/users/${user2.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ email: "one@example.com" });

    expect(res.statusCode).toBe(409);
    expect(res.body.message).toBe("Email is already in use");
  });

  it("should successfully update the user profile", async () => {
    const user = await prisma.user.create({
      data: {
        id: "u10",
        name: "Initial Name",
        email: "initial@example.com",
        role: "farmer",
        location: "Old Location",
        password: "pass",
      },
    });

    const token = generateToken({ id: user.id, email: user.email });

    const res = await request(app)
      .put(`/api/users/${user.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Updated Name",
        location: "New Location",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toMatchObject({
      id: "u10",
      name: "Updated Name",
      email: "initial@example.com",
      location: "New Location",
      role: "farmer",
    });
  });
});
