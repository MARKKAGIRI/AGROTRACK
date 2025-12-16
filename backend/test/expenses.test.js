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

describe("Expense Routes", () => {
  let user;
  let token;
  let farm;
  let cropType; // The static crop info (e.g., Maize)
  let cropCycle; // The specific planting season

  beforeEach(async () => {
    // 1. Create User
    user = await prisma.user.create({
      data: {
        id: `user_${Date.now()}`,
        name: "Expense Tester",
        email: `expense_${Date.now()}@test.com`,
        password: "hashedpassword",
      },
    });
    token = generateToken(user);

    // 2. Create Farm
    farm = await prisma.farm.create({
      data: {
        id: `farm_${Date.now()}`,
        name: "Test Farm",
        location: "Test Location",
        ownerId: user.id,
        latitude: -1.2,
        longitude: 36.8,
      },
    });

    // 3. Create Static Crop Data (if it doesn't exist)
    cropType = await prisma.crops.create({
      data: {
        cropName: `Maize_${Date.now()}`,
        cropType: "Cereal",
        region: "Rift Valley",
        growthData: { idealTemp: 25 },
      },
    });

    // 4. Create CropCycle (The actual season we are testing expenses for)
    cropCycle = await prisma.cropCycle.create({
      data: {
        id: `cycle_${Date.now()}`,
        farmId: farm.id,
        cropId: cropType.id, // Links to static crop
        plantingDate: new Date("2024-01-01"),
        status: "growing",
      },
    });
  });

  // Cleanup handled by global setup/teardown usually, or strictly here:
  afterEach(async () => {
    await prisma.expense.deleteMany();
    await prisma.cropCycle.deleteMany();
    await prisma.farm.deleteMany();
    await prisma.user.deleteMany();
    await prisma.crops.deleteMany();
  });

  describe("POST /api/expenses", () => {
    it("should return 400 if required fields are missing", async () => {
      const res = await request(app)
        .post("/api/expenses")
        .set("Authorization", `Bearer ${token}`)
        .send({
          amount: 100, // Missing cropCycleId, type, etc.
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain("Missing required fields");
    });

    it("should create an expense successfully", async () => {
      const expenseData = {
        cropCycleId: cropCycle.id, // Correct Field Name
        type: "Fertilizer",
        amount: 1500.00,
        description: "Bought NPK",
        date: "2024-02-15",
      };

      const res = await request(app)
        .post("/api/expenses")
        .set("Authorization", `Bearer ${token}`)
        .send(expenseData);

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.amount).toBe(1500);
      expect(res.body.data.cropCycleId).toBe(cropCycle.id);
    });
  });

  describe("GET /api/expenses/crop/:cropId", () => {
    it("should get expenses for a specific crop cycle", async () => {
      // Seed an expense
      await prisma.expense.create({
        data: {
          cropCycleId: cropCycle.id,
          type: "Seeds",
          amount: 500,
          date: new Date(),
        },
      });

      // Note: URL param is :cropId, but controller treats it as cropCycleId
      const res = await request(app)
        .get(`/api/expenses/crop/${cropCycle.id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(1);
      expect(res.body.totalExpenses).toBe(500);
    });
  });

  describe("GET /api/expenses (All Expenses)", () => {
    it("should return all expenses for the user across farms", async () => {
      await prisma.expense.create({
        data: {
          cropCycleId: cropCycle.id,
          type: "Labor",
          amount: 300,
          date: new Date(),
        },
      });

      const res = await request(app)
        .get("/api/expenses")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("GET /api/expenses/summary", () => {
    it("should return expense summary grouped by type", async () => {
      await prisma.expense.createMany({
        data: [
          { cropCycleId: cropCycle.id, type: "Pesticide", amount: 100, date: new Date() },
          { cropCycleId: cropCycle.id, type: "Pesticide", amount: 50, date: new Date() },
        ],
      });

      const res = await request(app)
        .get("/api/expenses/summary")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      const pesticide = res.body.data.byType.find((x) => x.type === "Pesticide");
      expect(pesticide).toBeDefined();
      expect(pesticide.totalAmount).toBe(150);
    });
  });

  describe("PUT /api/expenses/:id", () => {
    it("should update an expense", async () => {
      const expense = await prisma.expense.create({
        data: {
          cropCycleId: cropCycle.id,
          type: "Old Type",
          amount: 100,
          date: new Date(),
        },
      });

      const res = await request(app)
        .put(`/api/expenses/${expense.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          type: "Updated Type",
          amount: 200,
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.data.type).toBe("Updated Type");
      expect(res.body.data.amount).toBe(200);
    });
  });

  describe("DELETE /api/expenses/:id", () => {
    it("should delete an expense", async () => {
      const expense = await prisma.expense.create({
        data: {
          cropCycleId: cropCycle.id,
          type: "To Delete",
          amount: 100,
          date: new Date(),
        },
      });

      const res = await request(app)
        .delete(`/api/expenses/${expense.id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Expense deleted successfully");

      const check = await prisma.expense.findUnique({ where: { id: expense.id } });
      expect(check).toBeNull();
    });
  });
});