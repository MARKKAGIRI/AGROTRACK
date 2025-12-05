const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const { validationResult } = require("express-validator");

// Controller to get all farms for the logged-in user
const getAllFarms = async (req, res) => {
  try {
    const userId = req.user.user_id;

    // Fetch all farms for this user
    const farms = await prisma.farm.findMany({
      where: { ownerId: userId },
      include: {
        cropCycles: true, // Include crop cycles for analytics
      },
    });

    // Map farms to include analytics
    const formattedFarms = farms.map((farm) => {
      const totalCrops = farm.cropCycles.length || 0;
      const totalHarvested =
        farm.cropCycles.filter((c) => c.harvestDate).length || 0;
      const upcomingHarvest =
        farm.cropCycles.filter(
          (c) => c.harvestDate && new Date(c.harvestDate) > new Date()
        ).length || 0;

      return {
        id: farm.id,
        name: farm.name,
        size: farm.size,
        unit: farm.unit,
        type: farm.type,
        location: farm.location,
        crops: farm.crops || [], // legacy
        notes: farm.notes,
        cropType: farm.cropType,
        createdAt: farm.createdAt,
        updatedAt: farm.updatedAt,
        analytics: {
          totalCrops,
          totalHarvested,
          upcomingHarvest,
        },
      };
    });

    return res.status(200).json({
      success: true,
      message: "Farms retrieved successfully",
      farms: formattedFarms,
    });
  } catch (error) {
    console.error("Get farms error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Controller to get a single farm by ID
const getSingleFarm = async (req, res) => {
  try {
    const { farmId } = req.params;
    const userId = req.user.user_id;

    const farm = await prisma.farm.findUnique({
      where: { id: farmId },
    });

    if (!farm) {
      return res.status(404).json({
        success: false,
        message: "Farm not found",
      });
    }

    if (farm.ownerId !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to access this farm",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Farm retrieved successfully",
      farm,
    });
  } catch (error) {
    console.error("Get farm error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Controller to add a new farm
const addFarm = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const userId = req.user.user_id; // taken from authenticated token
    const { name, location, size, unit, type, crops, notes } = req.body;

    // ensure that the required fields are there
    if (!name || !location) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing!!",
      });
    }

    // Verify user exists
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Create farm
    const farm = await prisma.farm.create({
      data: {
        name,
        location,
        size,
        unit,
        type,
        crops: crops || [],
        notes,
        ownerId: userId, // Always the logged-in user
      },
    });

    return res.status(201).json({
      success: true,
      message: "Farm created successfully",
      farm,
    });
  } catch (error) {
    console.error("Add farm error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Controller to update an existing farm
const updateFarm = async (req, res) => {
  try {
    const { farmId } = req.params;
    const { name, location, size, unit, type, crops, notes } = req.body;

    // check for missing values
    if (!name && !location && !size && !unit && !type && !crops && !notes) {
      return res.status(400).json({
        success: false,
        message: "No update fields provided",
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.user.user_id;

    const farm = await prisma.farm.findUnique({ where: { id: farmId } });
    if (!farm) {
      return res
        .status(404)
        .json({ success: false, message: "Farm not found" });
    }

    if (farm.ownerId !== userId) {
      return res
        .status(403)
        .json({
          success: false,
          message: "You are not authorized to update this farm",
        });
    }

    const updatedFarm = await prisma.farm.update({
      where: { id: farmId },
      data: {
        name: name || farm.name,
        location: location || farm.location,
        size: size || farm.size,
        unit: unit || farm.unit,
        type: type || farm.type,
        crops: crops || farm.crops,
        notes: notes || farm.notes,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Farm updated successfully",
      farm: updatedFarm,
    });
  } catch (error) {
    console.error("Update farm error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Controller to delete a farm
const deleteFarm = async (req, res) => {
  try {
    const { farmId } = req.params;
    const userId = req.user.user_id;

    const farm = await prisma.farm.findUnique({ where: { id: farmId } });
    if (!farm) {
      return res
        .status(404)
        .json({ success: false, message: "Farm not found" });
    }

    if (farm.ownerId !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this farm",
      });
    }

    await prisma.farm.delete({ where: { id: farmId } });

    return res
      .status(200)
      .json({ success: true, message: "Farm deleted successfully" });
  } catch (error) {
    console.error("Delete farm error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

module.exports = {
  deleteFarm,
  addFarm,
  updateFarm,
  getAllFarms,
  getSingleFarm,
};
