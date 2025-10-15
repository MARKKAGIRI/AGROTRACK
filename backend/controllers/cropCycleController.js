const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const { validationResult } = require("express-validator");

// Controller to add a new crop
const addCrop = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { cropName, farmId, plantingDate, harvestDate, status } = req.body;
    const userId = req.user.user_id;

    // Check if farm exists and belongs to the user
    const farm = await prisma.farm.findUnique({ where: { id: farmId } });
    if (!farm) {
      return res.status(404).json({ success: false, message: "Farm not found" });
    }
    if (farm.ownerId !== userId) {
      return res.status(403).json({ success: false, message: "You can only add crops to your own farm" });
    }

    const cropCycles = await prisma.cropCycle.create({
      data: {
        cropName,
        plantingDate,
        harvestDate,
        farmId,
        status,
      },
    });

    res.status(201).json({ message: "CropCyle added successfully", cropCycles });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  addCrop,
};