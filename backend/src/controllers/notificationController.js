const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

// Create new notification
const createNotification = async (req, res) => {
  try {
    const { userId, message, type } = req.body;
    const requestUserId = req.user.id;

    // Validate required fields
    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    // Users can only create notifications for themselves
    const targetUserId = userId || requestUserId;

    if (targetUserId !== requestUserId && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Cannot create notifications for other users",
      });
    }

    const notification = await prisma.notification.create({
      data: {
        userId: targetUserId,
        message,
        type: type || "info",
        read: false,
      },
    });

    return res.status(201).json({
      success: true,
      data: notification,
      message: "Notification created successfully",
    });
  } catch (error) {
    console.error("Create notification error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create notification",
      error: error.message,
    });
  }
};

// Get all notifications for current user
const getNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const { read, type, limit = 50 } = req.query;

    const whereClause = { userId };

    // Apply filters
    if (read !== undefined) {
      whereClause.read = read === "true";
    }

    if (type) {
      whereClause.type = type;
    }

    const notifications = await prisma.notification.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      take: parseInt(limit),
    });

    // Count unread notifications
    const unreadCount = await prisma.notification.count({
      where: {
        userId,
        read: false,
      },
    });

    return res.status(200).json({
      success: true,
      data: notifications,
      count: notifications.length,
      unreadCount: unreadCount,
    });
  } catch (error) {
    console.error("Get notifications error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch notifications",
      error: error.message,
    });
  }
};

// Get single notification by ID
const getNotificationById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const notification = await prisma.notification.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found or access denied",
      });
    }

    return res.status(200).json({
      success: true,
      data: notification,
    });
  } catch (error) {
    console.error("Get notification error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch notification",
      error: error.message,
    });
  }
};

// Mark notification as read
const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Verify notification belongs to user
    const existingNotification = await prisma.notification.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!existingNotification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found or access denied",
      });
    }

    const notification = await prisma.notification.update({
      where: { id },
      data: { read: true },
    });

    return res.status(200).json({
      success: true,
      data: notification,
      message: "Notification marked as read",
    });
  } catch (error) {
    console.error("Mark as read error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to mark notification as read",
      error: error.message,
    });
  }
};

// Mark notification as unread
const markAsUnread = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Verify notification belongs to user
    const existingNotification = await prisma.notification.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!existingNotification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found or access denied",
      });
    }

    const notification = await prisma.notification.update({
      where: { id },
      data: { read: false },
    });

    return res.status(200).json({
      success: true,
      data: notification,
      message: "Notification marked as unread",
    });
  } catch (error) {
    console.error("Mark as unread error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to mark notification as unread",
      error: error.message,
    });
  }
};

// Mark all notifications as read
const markAllAsRead = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await prisma.notification.updateMany({
      where: {
        userId,
        read: false,
      },
      data: {
        read: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: `${result.count} notification(s) marked as read`,
      count: result.count,
    });
  } catch (error) {
    console.error("Mark all as read error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to mark all notifications as read",
      error: error.message,
    });
  }
};

// Delete notification
const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Verify notification belongs to user
    const existingNotification = await prisma.notification.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!existingNotification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found or access denied",
      });
    }

    await prisma.notification.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    console.error("Delete notification error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete notification",
      error: error.message,
    });
  }
};

// Delete all read notifications
const deleteAllRead = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await prisma.notification.deleteMany({
      where: {
        userId,
        read: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: `${result.count} read notification(s) deleted`,
      count: result.count,
    });
  } catch (error) {
    console.error("Delete all read error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete read notifications",
      error: error.message,
    });
  }
};

// Get notification statistics
const getNotificationStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const totalCount = await prisma.notification.count({
      where: { userId },
    });

    const unreadCount = await prisma.notification.count({
      where: { userId, read: false },
    });

    const byType = await prisma.notification.groupBy({
      by: ["type"],
      where: { userId },
      _count: { type: true },
    });

    return res.status(200).json({
      success: true,
      data: {
        total: totalCount,
        unread: unreadCount,
        read: totalCount - unreadCount,
        byType: byType.map((item) => ({
          type: item.type,
          count: item._count.type,
        })),
      },
    });
  } catch (error) {
    console.error("Get notification stats error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch notification statistics",
      error: error.message,
    });
  }
};

module.exports = {
  createNotification,
  markAllAsRead,
  markAsRead,
  markAsUnread,
  getNotificationById,
  getNotifications,
  deleteAllRead,
  deleteNotification,
  getNotificationStats,
};
