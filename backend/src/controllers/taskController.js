const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

// Create a new task
const createTask = async (req, res) => {
  try {
    const { cropCycleId, title, type, description, date, status } = req.body;
    const userId = req.user.id;

    if (!cropCycleId || !title || !type || !date) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: cropCycleId, title, type, date",
      });
    }

    // Verify ownership
    const cropCycle = await prisma.cropCycle.findFirst({
      where: {
        id: cropCycleId,
        farm: { ownerId: userId },
      },
    });

    if (!cropCycle) {
      return res.status(404).json({
        success: false,
        message: "Crop Cycle not found or access denied",
      });
    }

    const task = await prisma.task.create({
      data: {
        cropCycleId,
        title,
        type,
        description: description || null,
        date: new Date(date),
        status: status || "pending",
      },
      include: {
        cropCycle: {
          select: {
            crop: { select: { cropName: true } },
            farm: { select: { name: true } },
          },
        },
      },
    });

    return res.status(201).json({
      success: true,
      data: task,
      message: "Task created successfully",
    });
  } catch (error) {
    console.error("Create task error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create task",
      error: error.message,
    });
  }
};

// Get all tasks for a specific crop cycle
const getTasksByCrop = async (req, res) => {
  try {
    const { cropId } = req.params; // Using cropId param to match route structure
    const cropCycleId = cropId;
    const userId = req.user.id;

    const cropCycle = await prisma.cropCycle.findFirst({
      where: {
        id: cropCycleId,
        farm: { ownerId: userId },
      },
    });

    if (!cropCycle) {
      return res.status(404).json({
        success: false,
        message: "Crop Cycle not found or access denied",
      });
    }

    const tasks = await prisma.task.findMany({
      where: { cropCycleId },
      orderBy: { date: "asc" }, // Show nearest tasks first
    });

    return res.status(200).json({
      success: true,
      data: tasks,
      count: tasks.length,
    });
  } catch (error) {
    console.error("Get tasks error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch tasks",
      error: error.message,
    });
  }
};

// Get all tasks for user (across all farms)
const getAllTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const { startDate, endDate, status, type } = req.query;

    const whereClause = {
      cropCycle: {
        farm: { ownerId: userId },
      },
    };

    if (status) whereClause.status = status;
    if (type) whereClause.type = type;

    if (startDate || endDate) {
      whereClause.date = {};
      if (startDate) whereClause.date.gte = new Date(startDate);
      if (endDate) whereClause.date.lte = new Date(endDate);
    }

    const tasks = await prisma.task.findMany({
      where: whereClause,
      orderBy: { date: "asc" },
      include: {
        cropCycle: {
          include: {
            crop: { select: { cropName: true } },
            farm: { select: { name: true } },
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      data: tasks,
      count: tasks.length,
    });
  } catch (error) {
    console.error("Get all tasks error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch tasks",
      error: error.message,
    });
  }
};

// Update task (e.g., mark as completed)
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { title, type, description, date, status, photoUrl } = req.body;

    // Verify ownership
    const existingTask = await prisma.task.findFirst({
      where: {
        id,
        cropCycle: {
          farm: { ownerId: userId },
        },
      },
    });

    if (!existingTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found or access denied",
      });
    }

    const updateData = {};
    if (title) updateData.title = title;
    if (type) updateData.type = type;
    if (description) updateData.description = description;
    if (date) updateData.date = new Date(date);
    if (status) updateData.status = status;
    if (photoUrl !== undefined) updateData.photoUrl = photoUrl;

    const task = await prisma.task.update({
      where: { id },
      data: updateData,
    });

    return res.status(200).json({
      success: true,
      data: task,
      message: "Task updated successfully",
    });
  } catch (error) {
    console.error("Update task error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update task",
      error: error.message,
    });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const existingTask = await prisma.task.findFirst({
      where: {
        id,
        cropCycle: {
          farm: { ownerId: userId },
        },
      },
    });

    if (!existingTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found or access denied",
      });
    }

    await prisma.task.delete({ where: { id } });

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Delete task error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete task",
      error: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTasksByCrop,
  getAllTasks,
  updateTask,
  deleteTask,
}; 