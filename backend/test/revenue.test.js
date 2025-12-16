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

describe("Revenue Routes", () => {
  let user;
  let token;
  let farm;
  let cropType;
  let cropCycle;

  beforeEach(async () => {
    // 1. Create User
    user = await prisma.user.create({
      data: {
        id: `user_${Date.now()}`,
        name: "Revenue Tester",
        email: `revenue_${Date.now()}@test.com`,
        password: "pass",
      },
    });
    token = generateToken(user);

    // 2. Create Farm
    farm = await prisma.farm.create({
      data: {
        id: `farm_${Date.now()}`,
        name: "Revenue Farm",
        location: "Nakuru",
        ownerId: user.id,
        latitude: -0.3,
        longitude: 36.0,
      },
    });

    // 3. Create Static Crop
    cropType = await prisma.crops.create({
      data: {
        cropName: `Wheat_${Date.now()}`,
        cropType: "Cereal",
        region: "Rift Valley",
        growthData: {},
      },
    });

    // 4. Create CropCycle
    cropCycle = await prisma.cropCycle.create({
      data: {
        id: `cycle_${Date.now()}`,
        farmId: farm.id,
        cropId: cropType.id,
        plantingDate: new Date("2024-01-01"),
        status: "harvested",
      },
    });
  });

  afterEach(async () => {
    await prisma.revenue.deleteMany();
    await prisma.expense.deleteMany();
    await prisma.cropCycle.deleteMany();
    await prisma.farm.deleteMany();
    await prisma.user.deleteMany();
    await prisma.crops.deleteMany();
  });

  describe("POST /api/revenues", () => {
    it("should create a revenue record successfully", async () => {
      const res = await request(app)
        .post("/api/revenues")
        .set("Authorization", `Bearer ${token}`)
        .send({
          cropCycleId: cropCycle.id,
          amount: 50000,
          quantity: 20, // e.g. bags
          buyerName: "National Mills",
          date: "2024-06-01",
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.amount).toBe(50000);
      expect(res.body.data.buyerName).toBe("National Mills");
    });

    it("should fail with missing fields", async () => {
      const res = await request(app)
        .post("/api/revenues")
        .set("Authorization", `Bearer ${token}`)
        .send({
          amount: 50000, // Missing cropCycleId
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe("GET /api/revenues/crop/:cropId", () => {
    it("should get revenues for a specific crop cycle", async () => {
      await prisma.revenue.create({
        data: {
          cropCycleId: cropCycle.id,
          amount: 10000,
          buyerName: "Local Market",
          date: new Date(),
        },
      });

      const res = await request(app)
        // Note: Route uses :cropId but controller treats as cropCycleId
        .get(`/api/revenues/crop/${cropCycle.id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.totalRevenue).toBe(10000);
    });
  });

  describe("GET /api/revenues/profit/:cropId", () => {
    it("should calculate profit correctly", async () => {
      // 1. Add Expense
      await prisma.expense.create({
        data: {
          cropCycleId: cropCycle.id,
          type: "Seeds",
          amount: 5000,
          date: new Date(),
        },
      });

      // 2. Add Revenue
      await prisma.revenue.create({
        data: {
          cropCycleId: cropCycle.id,
          amount: 15000,
          buyerName: "Buyer A",
          date: new Date(),
        },
      });

      const res = await request(app)
        .get(`/api/revenues/profit/${cropCycle.id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      // Profit = 15000 - 5000 = 10000
      expect(res.body.data.profit).toBe(10000);
      expect(res.body.data.totalExpenses).toBe(5000);
      expect(res.body.data.totalRevenue).toBe(15000);
    });
  });

  describe("GET /api/revenues/by-buyer", () => {
    it("should group revenue by buyer", async () => {
      await prisma.revenue.createMany({
        data: [
          { cropCycleId: cropCycle.id, amount: 2000, buyerName: "John Doe", date: new Date() },
          { cropCycleId: cropCycle.id, amount: 3000, buyerName: "John Doe", date: new Date() },
          { cropCycleId: cropCycle.id, amount: 1000, buyerName: "Jane Smith", date: new Date() },
        ],
      });

      const res = await request(app)
        .get("/api/revenues/by-buyer")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      const john = res.body.data.find((b) => b.buyerName === "John Doe");
      expect(john).toBeDefined();
      expect(john.totalAmount).toBe(5000); // 2000 + 3000
    });
  });
});