const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../src/app");
const { PrismaClient } = require("../src/generated/prisma");

const prisma = new PrismaClient();

const generateToken = (user) => {
  return jwt.sign(
    // CHANGED: used 'id' instead of 'user_id' to match controller expectation (req.user.id)
    { id: user.id, email: user.email, role: user.role }, 
    process.env.JWT_SECRET || "test_secret",
    { expiresIn: "1h" }
  );
};

describe("Notification Routes", () => {
  let user;
  let token;

  beforeEach(async () => {
    // 1. Create User
    user = await prisma.user.create({
      data: {
        id: `user_notif_${Date.now()}`,
        name: "Notification User",
        email: `notif_${Date.now()}@test.com`,
        password: "pass",
        role: "user",
      },
    });
    token = generateToken(user);
  });

  afterEach(async () => {
    await prisma.notification.deleteMany();
    await prisma.user.deleteMany();
  });

  describe("POST /api/notifications", () => {
    it("should create a notification successfully for self", async () => {
      const res = await request(app)
        .post("/api/notifications")
        .set("Authorization", `Bearer ${token}`)
        .send({
          message: "Welcome to AgroTrack",
          type: "info",
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.message).toBe("Welcome to AgroTrack");
      expect(res.body.data.userId).toBe(user.id);
    });

    it("should fail validation if message is missing", async () => {
      const res = await request(app)
        .post("/api/notifications")
        .set("Authorization", `Bearer ${token}`)
        .send({
          type: "alert",
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Message is required");
    });
  });

  describe("GET /api/notifications", () => {
    it("should fetch user notifications", async () => {
      // Seed a notification
      await prisma.notification.create({
        data: {
          userId: user.id,
          message: "Test Notification",
          type: "alert",
          read: false,
        },
      });

      const res = await request(app)
        .get("/api/notifications")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].message).toBe("Test Notification");
    });
  });

  describe("GET /api/notifications/stats", () => {
    it("should return correct statistics", async () => {
      await prisma.notification.createMany({
        data: [
          { userId: user.id, message: "Info 1", type: "info", read: true },
          { userId: user.id, message: "Alert 1", type: "alert", read: false },
        ],
      });

      const res = await request(app)
        .get("/api/notifications/stats")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.data.total).toBe(2);
      expect(res.body.data.unread).toBe(1);
      expect(res.body.data.read).toBe(1);
    });
  });

  describe("PATCH /api/notifications/:id/read", () => {
    it("should mark a notification as read", async () => {
      const notification = await prisma.notification.create({
        data: {
          userId: user.id,
          message: "Unread Message",
          read: false,
        },
      });

      const res = await request(app)
        .patch(`/api/notifications/${notification.id}/read`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.data.read).toBe(true);
    });
  });

  describe("PATCH /api/notifications/read-all", () => {
    it("should mark all notifications as read", async () => {
      await prisma.notification.createMany({
        data: [
          { userId: user.id, message: "1", read: false },
          { userId: user.id, message: "2", read: false },
        ],
      });

      const res = await request(app)
        .patch("/api/notifications/read-all")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.count).toBe(2);

      // Verify in DB
      const unreadCount = await prisma.notification.count({
        where: { userId: user.id, read: false },
      });
      expect(unreadCount).toBe(0);
    });
  });

  describe("DELETE /api/notifications/:id", () => {
    it("should delete a notification", async () => {
      const notification = await prisma.notification.create({
        data: {
          userId: user.id,
          message: "Delete Me",
        },
      });

      const res = await request(app)
        .delete(`/api/notifications/${notification.id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Notification deleted successfully");

      const check = await prisma.notification.findUnique({
        where: { id: notification.id },
      });
      expect(check).toBeNull();
    });
  });
});