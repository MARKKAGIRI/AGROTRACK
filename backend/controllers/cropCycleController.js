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
    const { cropName, plantingDate, harvestDate, status } = req.body;
    const { farmId } = req.params;
    const userId = req.user.user_id;

    // Check if farm exists and belongs to the user
    const farm = await prisma.farm.findUnique({ where: { id: farmId } });
    if (!farm) {
      return res
        .status(404)
        .json({ success: false, message: "Farm not found" });
    }
    if (farm.ownerId !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can only add crops to your own farm",
      });
    }

    const cropCycles = await prisma.cropCycle.create({
      data: {
        cropName,
        plantingDate: new Date(plantingDate),
        harvestDate: new Date(harvestDate),
        farmId,
        status,
      },
    });

    res
      .status(201)
      .json({ message: "CropCyle added successfully", cropCycles });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateCrop = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { farmId, cropId } = req.params;
    const { cropName, plantingDate, harvestDate, status } = req.body;
    const userId = req.user.user_id;

    // check if farms exists and belongs to user
    const farm = await prisma.farm.findUnique({ where: { id: farmId } });
    if (!farm) {
      return res.status(404).json({ error: "Farm not found" });
    }
    if (farm.ownerId !== userId) {
      return res.status(400).json({ error: "Unauthorised access" });
    }

    // check if crop exists and belongs in this farm!

    const crop = await prisma.cropCycle.findUnique({ where: { id: cropId } });
    if (!crop) {
      return res.status(404).json({ error: "crop not found" });
    }
    if (crop.farmId !== farmId) {
      return res
        .status(400)
        .json({ error: "Crop does not belong to this farm" });
    }

    const updatedCrop = await prisma.cropCycle.update({
      where: { id: cropId },
      data: {
        cropName: cropName || crop.cropName,
        plantingDate: plantingDate ? new Date(plantingDate) : crop.plantingDate,
        harvestDate: harvestDate ? new Date(harvestDate) : crop.harvestDate,
        status: status || crop.status,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Crop updated successfully",
      crop: updatedCrop,
    });
  } catch (error) {
    console.error("Update farm error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const deleteCrop = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.user_id;

    const cropCycle = await prisma.cropCycle.findUnique({
      where: { id },
      include: { farm: true },
    });

    if (!cropCycle) {
      return res.status(404).json({ 
        success: false, 
        message: "Crop cycle not found" 
      });
    }

    if (cropCycle.farm.ownerId !== userId) {
      return res.status(403).json({ 
        success: false, 
        message: "You can only delete crops from your own farm" 
      });
    }

    // All tasks with this cropId will be automatically deleted!
    await prisma.cropCycle.delete({
      where: { id },
    });

    res.status(200).json({ 
      success: true, 
      message: "Crop cycle deleted successfully" 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Server error", 
      error: error.message 
    });
  }
};



module.exports = {
  addCrop,
  deleteCrop,
  updateCrop,
};
