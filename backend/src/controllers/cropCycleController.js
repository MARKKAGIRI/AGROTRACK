const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const { validationResult } = require("express-validator");

// Controller to get all crops for a farm
const getCrops = async (req, res) => {
  try {
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
        message: "You can only view crops from your own farm",
      });
    }

    // Get all crops for this farm
    const crops = await prisma.cropCycle.findMany({
      where: { farmId },
      orderBy: { plantingDate: "desc" },
    });

    res.status(200).json({
      success: true,
      count: crops.length,
      crops,
    });
  } catch (error) {
    console.error("Get crops error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error", 
      error: error.message 
    });
  }
};

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

    const cropCycle = await prisma.cropCycle.create({
      data: {
        cropName,
        plantingDate: new Date(plantingDate),
        harvestDate: new Date(harvestDate),
        farmId,
        status,
      },
    });

    res.status(201).json({ 
      success: true,
      message: "Crop cycle added successfully", 
      crop: cropCycle 
    });
  } catch (error) {
    console.error("Add crop error:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error", 
      error: error.message 
    });
  }
};

// Controller to update a crop
const updateCrop = async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }

  try {
    const { farmId, cropId } = req.params;
    const { cropName, plantingDate, harvestDate, status } = req.body;
    const userId = req.user.user_id;

    // Check if farm exists and belongs to user
    const farm = await prisma.farm.findUnique({ where: { id: farmId } });
    if (!farm) {
      return res.status(404).json({ 
        success: false, 
        message: "Farm not found" 
      });
    }
    if (farm.ownerId !== userId) {
      return res.status(403).json({ 
        success: false, 
        message: "Unauthorised access" 
      });
    }

    // Check if crop exists and belongs to this farm
    const crop = await prisma.cropCycle.findUnique({ where: { id: cropId } });
    if (!crop) {
      return res.status(404).json({ 
        success: false, 
        message: "Crop not found" 
      });
    }
    if (crop.farmId !== farmId) {
      return res.status(400).json({ 
        success: false, 
        message: "Crop does not belong to this farm" 
      });
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
    console.error("Update crop error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Server error", 
      error: error.message 
    });
  }
};

// Replace the existing deleteCrop with this
const deleteCrop = async (req, res) => {
  try {
    // read the actual route params
    const { farmId, cropId } = req.params;
    const userId = req.user.user_id;

    // find the crop and include its farm
    const cropCycle = await prisma.cropCycle.findUnique({
      where: { id: cropId },
      include: { farm: true },
    });

    if (!cropCycle) {
      return res.status(404).json({
        success: false,
        message: "Crop cycle not found",
      });
    }

    // optional: ensure the crop belongs to the farmId in the URL
    if (cropCycle.farmId !== farmId && String(cropCycle.farm?.id) !== String(farmId)) {
      return res.status(400).json({
        success: false,
        message: "Crop does not belong to this farm",
      });
    }

    // ownership check
    if (cropCycle.farm?.ownerId !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can only delete crops from your own farm",
      });
    }

    // delete
    await prisma.cropCycle.delete({
      where: { id: cropId },
    });

    return res.status(200).json({
      success: true,
      message: "Crop cycle deleted successfully",
    });
  } catch (error) {
    console.error("Delete crop error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};




module.exports = {
  getCrops,
  addCrop,
  deleteCrop,
  updateCrop,
  deleteCrop,
};