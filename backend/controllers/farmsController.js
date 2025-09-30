const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const { validationResult } = require("express-validator");

// Controller to add a new farm
const addFarm = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, size, ownerId, location } = req.body;
    const userId = req.user.user_id;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (userId !== ownerId) {
      return res
        .status(403)
        .json({
          success: false,
          message: "You can only add farms for yourself",
        });
    }
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const farm = await prisma.farm.create({
      data: {
        name,
        size,
        location,
        ownerId: userId,
      },
    });

    //await farm.save();

    res.status(201).json({ message: "Farm added successfully", farm });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const updateFarm = async (req, res) => {
  try {
    const { farmId } = req.params;
    const { name, location, size } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const userId = req.user.user_id;

    const farm = await prisma.farm.findUnique({
      where: { id: farmId },
    });

    if (!farm) {
      return res.status(404).json({ success: false, message: "Farm not found" });
    }

    if (farm.ownerId !== userId) {
      return res.status(403).json({ success: false, message: "You are not authorized to update this farm" });
    }

    const updatedFarm = await prisma.farm.update({
      where: { id: farmId },
      data: {
        name: name || farm.name,
        location: location || farm.location,
        size: size || farm.size,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Farm updated successfully",
      farm: updatedFarm,
    });
  } catch (error) {
    console.error("Update farm error:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

const deleteFarm = async (req, res) => {
  try {
    const { farmId } = req.params;
    const userId = req.user.user_id;

    // Find the farm
    const farm = await prisma.farm.findUnique({
      where: { id: farmId },
    });

    if (!farm) {
      return res
        .status(404)
        .json({ success: false, message: "Farm not found" });
    }

    // Check ownership
    if (farm.ownerId !== userId) {
      return res
        .status(403)
        .json({
          success: false,
          message: "You are not authorized to delete this farm",
        });
    }

    // Delete the farm
    await prisma.farm.delete({
      where: { id: farmId },
    });

    res
      .status(200)
      .json({ success: true, message: "Farm deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

module.exports = { deleteFarm, addFarm, updateFarm };
