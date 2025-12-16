const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../src/app");
const { PrismaClient } = require("../src/generated/prisma");

const prisma = new PrismaClient();

const generateToken = (user) => {
  return jwt.sign(
    { user_id: user.id, email: user.email },
    process.env.JWT_SECRET || "test_secret",
    { expiresIn: "1h" }
  );
};

describe("Task Routes", () => {
  let user;
  let token;
  let farm;
  let cropType;
  let cropCycle;

  beforeEach(async () => {
    user = await prisma.user.create({
      data: {
        id: `user_task_${Date.now()}`,
        name: "Task User",
        email: `task_${Date.now()}@test.com`,
        password: "pass",
      },
    });
    token = generateToken(user);

    farm = await prisma.farm.create({
      data: {
        id: `farm_task_${Date.now()}`,
        name: "Task Farm",
        location: "Nakuru",
        ownerId: user.id,
      },
    });

    cropType = await prisma.crops.create({
      data: {
        cropName: `Wheat_${Date.now()}`,
        cropType: "Cereal",
        region: "Rift Valley",
        growthData: {},
      },
    });

    cropCycle = await prisma.cropCycle.create({
      data: {
        id: `cycle_task_${Date.now()}`,
        farmId: farm.id,
        cropId: cropType.id,
        plantingDate: new Date(),
        status: "growing",
      },
    });
  });

  afterEach(async () => {
    await prisma.task.deleteMany();
    await prisma.cropCycle.deleteMany();
    await prisma.farm.deleteMany();
    await prisma.user.deleteMany();
    await prisma.crops.deleteMany();
  });

  describe("POST /api/tasks", () => {
    it("should create a task successfully", async () => {
      const res = await request(app)
        .post("/api/tasks")
        .set("Authorization", `Bearer ${token}`)
        .send({
          cropCycleId: cropCycle.id,
          title: "Fertilize",
          type: "Field Work",
          date: "2024-12-31",
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe("Fertilize");
      expect(res.body.data.status).toBe("pending");
    });
  });

  describe("GET /api/tasks/crop/:cropId", () => {
    it("should fetch tasks for a crop cycle", async () => {
      await prisma.task.create({
        data: {
          cropCycleId: cropCycle.id,
          title: "Watering",
          type: "Irrigation",
          date: new Date(),
        },
      });

      const res = await request(app)
        .get(`/api/tasks/crop/${cropCycle.id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.data.length).toBe(1);
    });
  });

  describe("PUT /api/tasks/:id", () => {
    it("should mark task as completed", async () => {
      const task = await prisma.task.create({
        data: {
          cropCycleId: cropCycle.id,
          title: "Harvest",
          type: "Harvesting",
          date: new Date(),
          status: "pending",
        },
      });

      const res = await request(app)
        .put(`/api/tasks/${task.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ status: "completed" });

      expect(res.statusCode).toBe(200);
      expect(res.body.data.status).toBe("completed");
    });
  });

  describe("DELETE /api/tasks/:id", () => {
    it("should delete a task", async () => {
      const task = await prisma.task.create({
        data: {
          cropCycleId: cropCycle.id,
          title: "Mistake",
          type: "Error",
          date: new Date(),
        },
      });

      const res = await request(app)
        .delete(`/api/tasks/${task.id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      
      const check = await prisma.task.findUnique({ where: { id: task.id } });
      expect(check).toBeNull();
    });
  });
});