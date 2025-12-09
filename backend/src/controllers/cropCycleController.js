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

    // Get all crop cycles for this farm with crop details
    const crops = await prisma.cropCycle.findMany({
      where: { farmId },
      include: {
        crop: true, // Include static crop information
        tasks: true,
        expenses: true,
        revenues: true,
      },
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

// Controller to add a new crop cycle
const addCrop = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { cropId, plantingDate, harvestDate, status } = req.body;
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

    // Verify that the crop exists in the Crops table
    const cropExists = await prisma.crops.findUnique({
      where: { id: parseInt(cropId) },
    });
    if (!cropExists) {
      return res.status(404).json({
        success: false,
        message: "Crop not found in database",
      });
    }

    const cropCycle = await prisma.cropCycle.create({
      data: {
        farmId,
        cropId: parseInt(cropId),
        plantingDate: new Date(plantingDate),
        harvestDate: harvestDate ? new Date(harvestDate) : null,
        status: status || "plantend",
      },
      include: {
        crop: true, // Return crop details
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

// Controller to update a crop cycle
const updateCrop = async (req, res) => {
  try {
    const { farmId, cropId } = req.params;
    const { cropId: newCropId, plantingDate, harvestDate, status } = req.body;
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

    // Check if crop cycle exists and belongs to this farm
    const cropCycle = await prisma.cropCycle.findUnique({ 
      where: { id: cropId },
      include: { crop: true },
    });
    if (!cropCycle) {
      return res.status(404).json({ 
        success: false, 
        message: "Crop cycle not found" 
      });
    }
    if (cropCycle.farmId !== farmId) {
      return res.status(400).json({ 
        success: false, 
        message: "Crop cycle does not belong to this farm" 
      });
    }

    // If updating cropId, verify the new crop exists
    if (newCropId && parseInt(newCropId) !== cropCycle.cropId) {
      const cropExists = await prisma.crops.findUnique({
        where: { id: parseInt(newCropId) },
      });
      if (!cropExists) {
        return res.status(404).json({
          success: false,
          message: "New crop not found in database",
        });
      }
    }

    const updatedCrop = await prisma.cropCycle.update({
      where: { id: cropId },
      data: {
        cropId: newCropId ? parseInt(newCropId) : cropCycle.cropId,
        plantingDate: plantingDate ? new Date(plantingDate) : cropCycle.plantingDate,
        harvestDate: harvestDate ? new Date(harvestDate) : cropCycle.harvestDate,
        status: status || cropCycle.status,
      },
      include: {
        crop: true, // Return updated crop details
      },
    });

    return res.status(200).json({
      success: true,
      message: "Crop cycle updated successfully",
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

// Delete a crop cycle
const deleteCrop = async (req, res) => {
  try {
    const { farmId, cropId } = req.params;
    const userId = req.user.user_id;

    // Find the crop cycle and include its farm
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

    // Ensure the crop cycle belongs to the farmId in the URL
    if (cropCycle.farmId !== farmId) {
      return res.status(400).json({
        success: false,
        message: "Crop cycle does not belong to this farm",
      });
    }

    // Ownership check
    if (cropCycle.farm?.ownerId !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can only delete crops from your own farm",
      });
    }

    // Delete the crop cycle
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
  updateCrop,
  deleteCrop,
};