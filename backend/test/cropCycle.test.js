const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../src/app");
const prisma = require("./setup");

const JWT_SECRET = process.env.JWT_SECRET;

function generateToken(user) {
  return jwt.sign(
    { user_id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
}

describe("Crop Routes - Full Coverage", () => {
  let user, token, farm;

  beforeEach(async () => {
    user = await prisma.user.create({
      data: {
        id: "user1",
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      },
    });

    token = generateToken(user);

    farm = await prisma.farm.create({
      data: {
        id: "farm1",
        name: "Test Farm",
        location: "Kenya",
        ownerId: user.id,
      },
    });
  });

  
  // Add crop test
  it("POST → should return 404 if farm does not exist", async () => {
    const res = await request(app)
      .post(`/api/cropCycle/unknownFarm/crops`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        cropName: "Maize",
        plantingDate: "2024-01-01",
        harvestDate: "2024-05-01",
        status: "upcoming",
      });

    expect(res.statusCode).toBe(404);
  });

  it("POST → should return 403 if farm is not owned by user", async () => {
    const otherUser = await prisma.user.create({
      data: { id: "user2", name: "Other", email: "other@test.com", password: "pass" }
    });

    const foreignFarm = await prisma.farm.create({
      data: {
        id: "farmX",
        name: "Other Farm",
        location: "Nairobi",
        ownerId: otherUser.id,
      },
    });

    const res = await request(app)
      .post(`/api/cropCycle/${foreignFarm.id}/crops`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        cropName: "Beans",
        plantingDate: "2024-01-01",
        harvestDate: "2024-05-01",
        status: "upcoming",
      });

    expect(res.statusCode).toBe(403);
  });

  it("POST → should return 400 for validation errors", async () => {
    const res = await request(app)
      .post(`/api/cropCycle/${farm.id}/crops`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        cropName: "",
        plantingDate: "invalid-date",
        harvestDate: "2020-01-01",
        status: "wrong-status",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toBeDefined();
  });

  it("POST → should add crop successfully", async () => {
    const res = await request(app)
      .post(`/api/cropCycle/${farm.id}/crops`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        cropName: "Maize",
        plantingDate: "2024-01-01",
        harvestDate: "2024-05-01",
        status: "upcoming",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.crop.cropName).toBe("Maize");
  });

  
  // get crops tests
  it("GET → should return 404 for non-existing farm", async () => {
    const res = await request(app)
      .get(`/api/cropCycle/unknown/crops`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
  });

  it("GET → should return 403 for farm not owned by user", async () => {
    const otherUser = await prisma.user.create({
      data: { id: "userX", name: "X", email: "x@test.com", password: "pass" }
    });

    const foreignFarm = await prisma.farm.create({
      data: {
        id: "farmZ",
        name: "Foreign",
        location: "Kenya",
        ownerId: otherUser.id,
      },
    });

    const res = await request(app)
      .get(`/api/cropCycle/${foreignFarm.id}/crops`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(403);
  });

  it("GET → should return empty crops list", async () => {
    const res = await request(app)
      .get(`/api/cropCycle/${farm.id}/crops`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.crops).toHaveLength(0);
  });

  
  // update crop tests
  it("PUT → should return 404 if farm not found", async () => {
    const res = await request(app)
      .put(`/api/cropCycle/unknown/crops/123`)
      .set("Authorization", `Bearer ${token}`)
      .send({ status: "completed" });

    expect(res.statusCode).toBe(404);
  });

  it("PUT → should return 404 if crop not found", async () => {
    const res = await request(app)
      .put(`/api/cropCycle/${farm.id}/crops/notfound`)
      .set("Authorization", `Bearer ${token}`)
      .send({ status: "completed" });

    expect(res.statusCode).toBe(404);
  });

  it("PUT → should update crop", async () => {
    const crop = await prisma.cropCycle.create({
      data: {
        id: "crop1",
        cropName: "Wheat",
        plantingDate: new Date("2024-02-01"),
        harvestDate: new Date("2024-06-01"),
        status: "in-progress",
        farmId: farm.id,
      },
    });

    const res = await request(app)
      .put(`/api/cropCycle/${farm.id}/crops/${crop.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ status: "completed" });

    expect(res.statusCode).toBe(200);
    expect(res.body.crop.status).toBe("completed");
  });

  
  // delete crop tests
  it("DELETE → should return 404 if crop not found", async () => {
    const res = await request(app)
      .delete(`/api/cropCycle/${farm.id}/crops/unknown`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
  });

  it("DELETE → should return 400 if crop does not belong to farm", async () => {
    const farm2 = await prisma.farm.create({
      data: {
        id: "farm3",
        name: "Another Farm",
        location: "Kenya",
        ownerId: user.id,
      },
    });

    const crop = await prisma.cropCycle.create({
      data: {
        id: "cropX",
        cropName: "Soybeans",
        plantingDate: new Date(),
        harvestDate: new Date(),
        status: "upcoming",
        farmId: farm2.id,
      },
    });

    const res = await request(app)
      .delete(`/api/cropCycle/${farm.id}/crops/${crop.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(400);
  });

  it("DELETE → should successfully delete a crop", async () => {
    const crop = await prisma.cropCycle.create({
      data: {
        id: "crop2",
        cropName: "Tomatoes",
        plantingDate: new Date("2024-03-01"),
        harvestDate: new Date("2024-07-01"),
        status: "upcoming",
        farmId: farm.id,
      },
    });

    const res = await request(app)
      .delete(`/api/cropCycle/${farm.id}/crops/${crop.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Crop cycle deleted successfully");

    const deleted = await prisma.cropCycle.findUnique({
      where: { id: crop.id },
    });

    expect(deleted).toBeNull();
  });
});
