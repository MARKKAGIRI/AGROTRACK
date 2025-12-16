const request = require("supertest");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const app = require("../src/app");
const { PrismaClient } = require("../src/generated/prisma");

const prisma = new PrismaClient();

jest.mock("axios");

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || "test_secret",
    { expiresIn: "1h" }
  );
};

describe("Weather Routes", () => {
  let user;
  let token;
  let farm;

  const mockCurrentWeather = {
    data: {
      weather: [{ description: "clear sky", icon: "01d" }],
      main: {
        temp: 25.5,
        feels_like: 26.0,
        humidity: 60,
        pressure: 1013,
      },
      wind: { speed: 5.5, deg: 180 },
      clouds: { all: 0 },
      sys: { country: "KE", sunrise: 1618311234, sunset: 1618354321 },
      name: "Nairobi",
      dt: 1618334455,
    },
  };

  const mockForecast = {
    data: {
      city: { name: "Nairobi", country: "KE" },
      list: [
        {
          dt: 1618334455,
          main: { temp: 24, feels_like: 25, humidity: 65 },
          weather: [{ description: "light rain", icon: "10d" }],
          wind: { speed: 4 },
          rain: { "3h": 2.5 },
        },
      ],
    },
  };

  beforeEach(async () => {
    user = await prisma.user.create({
      data: {
        id: `user_weather_${Date.now()}`,
        name: "Weather User",
        email: `weather_${Date.now()}@test.com`,
        password: "pass",
      },
    });
    token = generateToken(user);

    farm = await prisma.farm.create({
      data: {
        id: `farm_weather_${Date.now()}`,
        name: "Weather Farm",
        location: "Nairobi",
        ownerId: user.id,
        latitude: -1.2921,
        longitude: 36.8219,
      },
    });
  });

  afterEach(async () => {
    jest.clearAllMocks();
    
    // FIXED: Clean up in correct order (Children -> Parents)
    // 1. Delete leaf nodes (depend on Farm or CropCycle)
    await prisma.weatherLog.deleteMany();
    await prisma.task.deleteMany();       
    await prisma.expense.deleteMany();    
    await prisma.revenue.deleteMany();    

    // 2. Delete CropCycles (depends on Farm)
    await prisma.cropCycle.deleteMany();  // <--- This was missing

    // 3. Delete Farm (depends on User)
    await prisma.farm.deleteMany();

    // 4. Delete User
    await prisma.user.deleteMany();
  });

  describe("GET /api/weather/live", () => {
    it("should fetch current weather from API", async () => {
      axios.get.mockResolvedValue(mockCurrentWeather);

      const res = await request(app)
        .get("/api/weather/live")
        .query({ lat: -1.29, lon: 36.82 })
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.temperature).toBe(25.5);
      expect(res.body.data.location).toBe("Nairobi");
    });

    it("should return 400 for invalid coordinates", async () => {
      const res = await request(app)
        .get("/api/weather/live")
        .query({ lat: "invalid", lon: 36.82 })
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(400);
    });
  });

  describe("POST /api/weather/log/:farmId", () => {
    it("should fetch and log weather data for a farm", async () => {
      axios.get.mockResolvedValue(mockCurrentWeather);

      const res = await request(app)
        .post(`/api/weather/log/${farm.id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.temperature).toBe(25.5);

      const log = await prisma.weatherLog.findFirst({
        where: { farmId: farm.id },
      });
      expect(log).toBeDefined();
      expect(log.temperature).toBe(25.5);
    });
  });

  describe("GET /api/weather/logs/:farmId", () => {
    it("should retrieve logged weather history", async () => {
      await prisma.weatherLog.createMany({
        data: [
          {
            farmId: farm.id,
            temperature: 20,
            humidity: 50,
            rainfall: 0,
            windSpeed: 5,
            date: new Date(),
          },
          {
            farmId: farm.id,
            temperature: 22,
            humidity: 55,
            rainfall: 0,
            windSpeed: 6,
            date: new Date(),
          },
        ],
      });

      const res = await request(app)
        .get(`/api/weather/logs/${farm.id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.count).toBe(2);
      expect(res.body.statistics.averageTemperature).toBe(21);
    });
  });

  describe("GET /api/weather/forecast", () => {
    it("should fetch 5-day forecast", async () => {
      axios.get.mockResolvedValue(mockForecast);

      const res = await request(app)
        .get("/api/weather/forecast")
        .query({ lat: -1.29, lon: 36.82 })
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.data.forecast.length).toBeGreaterThan(0);
      expect(res.body.data.location).toBe("Nairobi");
    });
  });

  describe("DELETE /api/weather/logs/:id", () => {
    it("should delete a weather log", async () => {
      const log = await prisma.weatherLog.create({
        data: {
          farmId: farm.id,
          temperature: 20,
          humidity: 50,
          rainfall: 0,
          windSpeed: 5,
          date: new Date(),
        },
      });

      const res = await request(app)
        .delete(`/api/weather/logs/${log.id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Weather log deleted successfully");
    });
  });
});