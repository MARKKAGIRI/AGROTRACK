const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

// Create a new activity
const createActivity = async (req, res) => {
  try {
    const { cropId, activityType, description, date, photoUrl } = req.body;
    const userId = req.user.id;

    // Validate required fields
    if (!cropId || !activityType || !description || !date) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: cropId, activityType, description, date",
      });
    }

    // Verify crop belongs to user
    const crop = await prisma.crop.findFirst({
      where: {
        id: cropId,
        farm: {
          userId: userId,
        },
      },
    });

    if (!crop) {
      return res.status(404).json({
        success: false,
        message: "Crop not found or access denied",
      });
    }

    // Create activity
    const activity = await prisma.activity.create({
      data: {
        cropId,
        activityType,
        description,
        date: new Date(date),
        photoUrl: photoUrl || null,
      },
      include: {
        crop: {
          select: {
            name: true,
            farm: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return res.status(201).json({
      success: true,
      data: activity,
      message: "Activity created successfully",
    });
  } catch (error) {
    console.error("Create activity error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create activity",
      error: error.message,
    });
  }
};

// Get all activities for a specific crop
const getActivitiesByCrop = async (req, res) => {
  try {
    const { cropId } = req.params;
    const userId = req.user.id;

    // Verify crop belongs to user
    const crop = await prisma.crop.findFirst({
      where: {
        id: cropId,
        farm: {
          userId: userId,
        },
      },
    });

    if (!crop) {
      return res.status(404).json({
        success: false,
        message: "Crop not found or access denied",
      });
    }

    const activities = await prisma.activity.findMany({
      where: { cropId },
      orderBy: { date: "desc" },
      include: {
        crop: {
          select: {
            name: true,
            variety: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      data: activities,
      count: activities.length,
    });
  } catch (error) {
    console.error("Get activities error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch activities",
      error: error.message,
    });
  }
};

// Get all activities for user (across all crops)
const getAllActivities = async (req, res) => {
  try {
    const userId = req.user.id;
    const { startDate, endDate, activityType } = req.query;

    const whereClause = {
      crop: {
        farm: {
          userId: userId,
        },
      },
    };

    // Apply filters if provided
    if (startDate || endDate) {
      whereClause.date = {};
      if (startDate) whereClause.date.gte = new Date(startDate);
      if (endDate) whereClause.date.lte = new Date(endDate);
    }

    if (activityType) {
      whereClause.activityType = activityType;
    }

    const activities = await prisma.activity.findMany({
      where: whereClause,
      orderBy: { date: "desc" },
      include: {
        crop: {
          select: {
            name: true,
            variety: true,
            farm: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      data: activities,
      count: activities.length,
    });
  } catch (error) {
    console.error("Get all activities error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch activities",
      error: error.message,
    });
  }
};

// Get single activity by ID
const getActivityById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const activity = await prisma.activity.findFirst({
      where: {
        id,
        crop: {
          farm: {
            userId: userId,
          },
        },
      },
      include: {
        crop: {
          select: {
            name: true,
            variety: true,
            farm: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: "Activity not found or access denied",
      });
    }

    return res.status(200).json({
      success: true,
      data: activity,
    });
  } catch (error) {
    console.error("Get activity error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch activity",
      error: error.message,
    });
  }
};

// Update activity
const updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { activityType, description, date, photoUrl } = req.body;

    // Verify activity belongs to user
    const existingActivity = await prisma.activity.findFirst({
      where: {
        id,
        crop: {
          farm: {
            userId: userId,
          },
        },
      },
    });

    if (!existingActivity) {
      return res.status(404).json({
        success: false,
        message: "Activity not found or access denied",
      });
    }

    // Build update data
    const updateData = {};
    if (activityType) updateData.activityType = activityType;
    if (description) updateData.description = description;
    if (date) updateData.date = new Date(date);
    if (photoUrl !== undefined) updateData.photoUrl = photoUrl;

    const activity = await prisma.activity.update({
      where: { id },
      data: updateData,
      include: {
        crop: {
          select: {
            name: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      data: activity,
      message: "Activity updated successfully",
    });
  } catch (error) {
    console.error("Update activity error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update activity",
      error: error.message,
    });
  }
};

// Delete activity
const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Verify activity belongs to user
    const existingActivity = await prisma.activity.findFirst({
      where: {
        id,
        crop: {
          farm: {
            userId: userId,
          },
        },
      },
    });

    if (!existingActivity) {
      return res.status(404).json({
        success: false,
        message: "Activity not found or access denied",
      });
    }

    await prisma.activity.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: "Activity deleted successfully",
    });
  } catch (error) {
    console.error("Delete activity error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete activity",
      error: error.message,
    });
  }
};

module.exports = {
  createActivity,
  getActivitiesByCrop,
  getActivityById,
  getAllActivities,
  updateActivity,
  deleteActivity,
};
