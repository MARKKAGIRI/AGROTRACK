const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

// Get all crops
const getAllCrops = async (req, res) => {
  try {
    const crops = await prisma.crops.findMany({
      orderBy: { createdAt: "desc" }
    });

    return res.json({
      success: true,
      count: crops.length,
      crops,
    });
  } catch (error) {
    console.error("Failed to fetch crops:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching crops",
    });
  }
};

// get a single crop by id 

const getCropById = async(req, res) => {
  try {
    const { cropId } = req.params

    const crop = await prisma.crops.findUnique({ where: { id: Number(cropId) }})

    return res.json({
      success: true,
      crop
    })
  } catch (error) {
    console.error("Failed to fetch crops:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching crops",
    });
  }
} 

// Create a crop (used for seeding or admin)
const createCrop = async (req, res) => {
  try {
    const { cropName, cropType, region, growthData } = req.body;

    const crop = await prisma.crops.create({
      data: {
        cropName,
        cropType,
        region,
        growthData,
      },
    });

    return res.json({ success: true, crop });
  } catch (error) {
    console.error("Failed to create crop:", error);
    return res.status(500).json({
      success: false,
      message: "Error creating crop",
    });
  }
};

module.exports = {
  getAllCrops,
  getCropById,
  createCrop,
};
