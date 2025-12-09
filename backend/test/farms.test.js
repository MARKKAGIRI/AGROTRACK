const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../src/app");
const { PrismaClient } = require("../src/generated/prisma");

const prisma = new PrismaClient();

// Generate real JWT for tests
const generateToken = (user) => {
  return jwt.sign(
    { user_id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

describe("POST /api/farms/addFarm - Add Farm", () => {
  // 1. Validation error
  it("should return 400 when required fields are missing", async () => {
    const user = await prisma.user.create({
      data: {
        id: "missingfieldsuser",
        name: "User",
        email: "u@test.com",
        password: "pass",
      },
    });

    const token = generateToken(user);

    const res = await request(app)
      .post("/api/farms/addFarm")
      .set("Authorization", `Bearer ${token}`)
      .send({}); // invalid data

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  // 2. Auth user not found in DB
  it("should return 404 if authenticated user does not exist", async () => {
    const user = {
      id: "ghost_user",
      email: "ghostuser@example.com",
    };
    const token = generateToken(user);

    const res = await request(app)
      .post("/api/farms/addFarm")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Farm A",
        location: "Meru",
        size: 10,
        unit: "acres",
        type: "crop",
      });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("User not found");
  });

  // 3. Successful farm creation
  it("should create a farm successfully (201)", async () => {
    const user = await prisma.user.create({
      data: {
        id: "auth2",
        name: "Farmer",
        email: "farmer@test.com",
        password: "pass",
      },
    });

    const token = generateToken(user);

    const res = await request(app)
      .post("/api/farms/addFarm")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Green Farm",
        location: "Nairobi",
        size: 5,
        unit: "acres",
        type: "mixed",
        latitude: -1.286389,
        longitude: 36.817223,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.farm).toMatchObject({
      name: "Green Farm",
      location: "Nairobi",
      size: 5,
      unit: "acres",
      type: "mixed",
      latitude: -1.286389,
      longitude: 36.817223,
      ownerId: user.id,
    });
  });
});

describe("PUT /api/farms/updateFarm/:farmId - update farm", () => {
  it("Should return 'missing values'", async () => {
    // mock users
    const user = await prisma.user.create({
      data: {
        id: "auth1",
        name: "User",
        email: "u@test.com",
        password: "pass",
      },
    });

    const token = generateToken(user);

    // mock farm
    const farm = await prisma.farm.create({
      data: {
        id: "mock-id",
        name: "Mock farm",
        location: "mock location",
        ownerId: user.id,
      },
    });

    const res = await request(app)
      .put("/api/farms/updateFarm/mock-id")
      .set("Authorization", `Bearer ${token}`)
      .send({});

    // assertion
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("No update fields provided");
  });

  // farm not found test
  it("Should return 'farm not found'", async () => {
    // mock users
    const user = await prisma.user.create({
      data: {
        id: "auth1",
        name: "User",
        email: "u@test.com",
        password: "pass",
      },
    });

    const token = generateToken(user);

    const res = await request(app)
      .put("/api/farms/updateFarm/nonexistent-farmId")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Test Farm"
      });

    expect(res.statusCode).toBe(404)
    expect(res.body.success).toBe(false)
    expect(res.body.message).toBe("Farm not found")
  });

  // unauthorised user trying to change farm details
  it("Should return Unauthorized", async () => {
    const user = await prisma.user.create({
      data: {
        id: "auth1",
        name: "User",
        email: "u@test.com",
        password: "pass",
      },
    });

    // simulate second user to try and access first users farm
    const user2 = await prisma.user.create({
      data: {
        id: "auth2",
        name: "User Second",
        email: "user2@gmail.com",
        password: "pass2"
      }
    })

    const token = generateToken(user2);

    const farm = await prisma.farm.create({
      data: {
        id: "mock-id",
        name: "Mock farm",
        location: "mock location",
        ownerId: "auth1",
      },
    });

    const res = await request(app)
      .put("/api/farms/updateFarm/mock-id")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Test Farm"
      });

    expect(res.statusCode).toBe(403)
    expect(res.body.success).toBe(false)
    expect(res.body.message).toBe("Unauthorized")
  })

  // successful update the farm
  it("Should return 'Farm updated'", async () => {
    const user = await prisma.user.create({
      data: {
        id: "auth1",
        name: "User",
        email: "u@test.com",
        password: "pass",
      },
    });

    const token = generateToken(user);

    const farm = await prisma.farm.create({
      data: {
        id: "mock-id",
        name: "Mock farm",
        location: "mock location",
        ownerId: "auth1",
      },
    });

    const res = await request(app)
      .put("/api/farms/updateFarm/mock-id")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Test Farm"
      });

    expect(res.statusCode).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.message).toBe("Farm updated")
  })

});

describe("GET /api/farms/getAllFarms - Get All Farms", () => {
  // 1. Should return empty array when user has no farms
  it("should return empty array when user has no farms", async () => {
    const user = await prisma.user.create({
      data: {
        id: "user-no-farms",
        name: "No Farms User",
        email: "nofarms@test.com",
        password: "pass",
      },
    });

    const token = generateToken(user);

    const res = await request(app)
      .get("/api/farms/getAllFarms")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.farms).toEqual([]);
  });

  // 2. Should return all farms for authenticated user with analytics
  it("should return all farms with analytics for authenticated user", async () => {
    const user = await prisma.user.create({
      data: {
        id: "user-with-farms",
        name: "Farm Owner",
        email: "owner@test.com",
        password: "pass",
      },
    });

    // Create a crop in the Crops table
    const uniqueCropName = `maizeCrop_${Date.now()}`; // Ensure unique crop name
    const maizeCrop = await prisma.crops.create({
      data: {
        cropName: uniqueCropName,
        cropType: "Cereal",
        region: "Kenya",
        growthData: {
          idealTemp: "20-30°C",
          soilType: "Loamy",
          wateringFrequency: "Regular"
        }
      }
    });

    const uniqueBeanCropName = `beansCrop_${Date.now()}`
    const beansCrop = await prisma.crops.create({
      data: {
        cropName: uniqueBeanCropName,
        cropType: "Legume",
        region: "Kenya",
        growthData: {
          idealTemp: "18-25°C",
          soilType: "Well-drained",
          wateringFrequency: "Moderate"
        }
      }
    });

    // Create multiple farms for the user
    const farm1 = await prisma.farm.create({
      data: {
        id: "farm1",
        name: "Green Valley Farm",
        location: "Nairobi",
        size: 10,
        unit: "acres",
        type: "crop",
        ownerId: user.id,
      },
    });

    const farm2 = await prisma.farm.create({
      data: {
        id: "farm2",
        name: "Sunshine Farm",
        location: "Meru",
        size: 5,
        unit: "hectares",
        type: "livestock",
        ownerId: user.id,
      },
    });

    // Create crop cycles for analytics
    await prisma.cropCycle.create({
      data: {
        id: "cycle1",
        farmId: farm1.id,
        cropId: maizeCrop.id,
        plantingDate: new Date("2024-01-01"),
        harvestDate: new Date("2024-06-01"),
        status: "growing"
      },
    });

    await prisma.cropCycle.create({
      data: {
        id: "cycle2",
        farmId: farm1.id,
        cropId: beansCrop.id,
        plantingDate: new Date("2024-03-01"),
        harvestDate: new Date("2025-12-01"),
        status: "growing"
      },
    });

    const token = generateToken(user);

    const res = await request(app)
      .get("/api/farms/getAllFarms")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.farms).toHaveLength(2);
    expect(res.body.farms[0]).toHaveProperty("analytics");
    expect(res.body.farms[0].analytics).toMatchObject({
      totalCrops: expect.any(Number),
      totalHarvested: expect.any(Number),
      upcomingHarvest: expect.any(Number),
    });
  });

  // 3. Should only return farms belonging to the authenticated user
  it("should only return farms belonging to authenticated user", async () => {
    const user1 = await prisma.user.create({
      data: {
        id: "user1",
        name: "User One",
        email: "user1@test.com",
        password: "pass",
      },
    });

    const user2 = await prisma.user.create({
      data: {
        id: "user2",
        name: "User Two",
        email: "user2@test.com",
        password: "pass",
      },
    });

    // Create farms for both users
    await prisma.farm.create({
      data: {
        id: "farm-user1",
        name: "User 1 Farm",
        location: "Location 1",
        ownerId: user1.id,
      },
    });

    await prisma.farm.create({
      data: {
        id: "farm-user2",
        name: "User 2 Farm",
        location: "Location 2",
        ownerId: user2.id,
      },
    });

    const token = generateToken(user1);

    const res = await request(app)
      .get("/api/farms/getAllFarms")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.farms).toHaveLength(1);
    expect(res.body.farms[0].name).toBe("User 1 Farm");
  });
});

describe("GET /api/farms/getSingleFarm/:farmId - Get Single Farm", () => {
  // 1. Should return 404 when farm does not exist
  it("should return 404 when farm does not exist", async () => {
    const user = await prisma.user.create({
      data: {
        id: "user-single",
        name: "User",
        email: "single@test.com",
        password: "pass",
      },
    });

    const token = generateToken(user);

    const res = await request(app)
      .get("/api/farms/getSingleFarm/nonexistent-farm-id")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Farm not found");
  });

  // 2. Should return 403 when user tries to access another user's farm
  it("should return 403 when user is not authorized to access farm", async () => {
    const owner = await prisma.user.create({
      data: {
        id: "owner-user",
        name: "Owner",
        email: "owner@test.com",
        password: "pass",
      },
    });

    const otherUser = await prisma.user.create({
      data: {
        id: "other-user",
        name: "Other User",
        email: "other@test.com",
        password: "pass",
      },
    });

    const farm = await prisma.farm.create({
      data: {
        id: "protected-farm",
        name: "Protected Farm",
        location: "Secret Location",
        ownerId: owner.id,
      },
    });

    const token = generateToken(otherUser);

    const res = await request(app)
      .get("/api/farms/getSingleFarm/protected-farm")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(403);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Unauthorized");
  });

  // 3. Should successfully return farm details for authorized user
  it("should return farm details successfully for authorized user", async () => {
    const user = await prisma.user.create({
      data: {
        id: "farm-owner",
        name: "Farm Owner",
        email: "farmowner@test.com",
        password: "pass",
      },
    });

    const farm = await prisma.farm.create({
      data: {
        id: "my-farm",
        name: "My Beautiful Farm",
        location: "Nairobi County",
        size: 20,
        unit: "acres",
        type: "mixed",
        latitude: -1.286389,
        longitude: 36.817223,
        ownerId: user.id,
      },
    });

    const token = generateToken(user);

    const res = await request(app)
      .get("/api/farms/getSingleFarm/my-farm")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.farm).toMatchObject({
      id: "my-farm",
      name: "My Beautiful Farm",
      location: "Nairobi County",
      size: 20,
      unit: "acres",
      type: "mixed",
      latitude: -1.286389,
      longitude: 36.817223,
      ownerId: user.id,
    });
  });
});

describe("DELETE /api/farms/deleteFarm/:farmId - Delete Farm", () => {
  // 1. Should return 404 when farm does not exist
  it("should return 404 when farm does not exist", async () => {
    const user = await prisma.user.create({
      data: {
        id: "delete-user",
        name: "Delete User",
        email: "delete@test.com",
        password: "pass",
      },
    });

    const token = generateToken(user);

    const res = await request(app)
      .delete("/api/farms/deleteFarm/nonexistent-farm")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Farm not found");
  });

  // 2. Should return 403 when user tries to delete another user's farm
  it("should return 403 when user is not authorized to delete farm", async () => {
    const owner = await prisma.user.create({
      data: {
        id: "farm-owner-delete",
        name: "Owner",
        email: "ownerdelete@test.com",
        password: "pass",
      },
    });

    const attacker = await prisma.user.create({
      data: {
        id: "attacker",
        name: "Attacker",
        email: "attacker@test.com",
        password: "pass",
      },
    });

    const farm = await prisma.farm.create({
      data: {
        id: "farm-to-protect",
        name: "Protected Farm",
        location: "Safe Location",
        ownerId: owner.id,
      },
    });

    const token = generateToken(attacker);

    const res = await request(app)
      .delete("/api/farms/deleteFarm/farm-to-protect")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(403);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Unauthorized");

    // Verify farm still exists
    const farmCheck = await prisma.farm.findUnique({
      where: { id: "farm-to-protect" },
    });
    expect(farmCheck).not.toBeNull();
  });

  // 3. Should successfully delete farm when user is authorized
  it("should delete farm successfully when user is authorized", async () => {
    const user = await prisma.user.create({
      data: {
        id: "delete-owner",
        name: "Delete Owner",
        email: "deleteowner@test.com",
        password: "pass",
      },
    });

    const farm = await prisma.farm.create({
      data: {
        id: "farm-to-delete",
        name: "Farm to Delete",
        location: "Temporary Location",
        ownerId: user.id,
      },
    });

    const token = generateToken(user);

    const res = await request(app)
      .delete("/api/farms/deleteFarm/farm-to-delete")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Farm deleted");

    // Verify farm is actually deleted
    const deletedFarm = await prisma.farm.findUnique({
      where: { id: "farm-to-delete" },
    });
    expect(deletedFarm).toBeNull();
  });
});