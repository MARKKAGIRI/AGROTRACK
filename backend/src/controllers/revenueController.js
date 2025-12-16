const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

// Create new revenue record
const createRevenue = async (req, res) => {
  try {
    // FIXED: Expect 'cropCycleId' instead of 'cropId'
    const { cropCycleId, amount, quantity, buyerName, date } = req.body;
    const userId = req.user.id;

    // Validate required fields
    if (!cropCycleId || !amount || !buyerName || !date) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: cropCycleId, amount, buyerName, date'
      });
    }

    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be a positive number'
      });
    }

    if (quantity && (isNaN(quantity) || quantity <= 0)) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be a positive number'
      });
    }

    // FIXED: Verify ownership via cropCycle -> farm -> ownerId
    const cropCycle = await prisma.cropCycle.findFirst({
      where: {
        id: cropCycleId,
        farm: {
          ownerId: userId
        }
      }
    });

    if (!cropCycle) {
      return res.status(404).json({
        success: false,
        message: 'Crop Cycle not found or access denied'
      });
    }

    // Create revenue record
    const revenue = await prisma.revenue.create({
      data: {
        cropCycleId, // FIXED: Correct foreign key
        amount: parseFloat(amount),
        quantity: quantity ? parseFloat(quantity) : null,
        buyerName,
        date: new Date(date)
      },
      include: {
        cropCycle: {
          include: {
            crop: { select: { cropName: true, cropType: true } },
            farm: { select: { name: true } }
          }
        }
      }
    });

    return res.status(201).json({
      success: true,
      data: revenue,
      message: 'Revenue recorded successfully'
    });
  } catch (error) {
    console.error('Create revenue error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create revenue record',
      error: error.message
    });
  }
};

// Get all revenues for a specific crop cycle
const getRevenuesByCrop = async (req, res) => {
  try {
    // FIXED: Route param maps to cropCycleId
    const { cropId } = req.params;
    const cropCycleId = cropId;
    const userId = req.user.id;

    const cropCycle = await prisma.cropCycle.findFirst({
      where: {
        id: cropCycleId,
        farm: { ownerId: userId }
      }
    });

    if (!cropCycle) {
      return res.status(404).json({
        success: false,
        message: 'Crop Cycle not found or access denied'
      });
    }

    const revenues = await prisma.revenue.findMany({
      where: { cropCycleId },
      orderBy: { date: 'desc' },
      include: {
        cropCycle: {
          include: {
            crop: { select: { cropName: true } }
          }
        }
      }
    });

    const totalRevenue = revenues.reduce((sum, rev) => sum + rev.amount, 0);
    const totalQuantity = revenues.reduce((sum, rev) => sum + (rev.quantity || 0), 0);

    return res.status(200).json({
      success: true,
      data: revenues,
      count: revenues.length,
      totalRevenue,
      totalQuantity
    });
  } catch (error) {
    console.error('Get revenues error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch revenues',
      error: error.message
    });
  }
};

// Get all revenues for user
const getAllRevenues = async (req, res) => {
  try {
    const userId = req.user.id;
    const { startDate, endDate, cropCycleId, buyerName } = req.query;

    const whereClause = {
      cropCycle: {
        farm: { ownerId: userId }
      }
    };

    if (startDate || endDate) {
      whereClause.date = {};
      if (startDate) whereClause.date.gte = new Date(startDate);
      if (endDate) whereClause.date.lte = new Date(endDate);
    }

    if (cropCycleId) {
      whereClause.cropCycleId = cropCycleId;
    }

    if (buyerName) {
      whereClause.buyerName = {
        contains: buyerName,
        mode: 'insensitive'
      };
    }

    const revenues = await prisma.revenue.findMany({
      where: whereClause,
      orderBy: { date: 'desc' },
      include: {
        cropCycle: {
          include: {
            crop: { select: { cropName: true } },
            farm: { select: { name: true } }
          }
        }
      }
    });

    const totalRevenue = revenues.reduce((sum, rev) => sum + rev.amount, 0);

    return res.status(200).json({
      success: true,
      data: revenues,
      count: revenues.length,
      totalRevenue
    });
  } catch (error) {
    console.error('Get all revenues error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch revenues',
      error: error.message
    });
  }
};

// Get profit/loss analysis for a crop cycle
const getProfitAnalysis = async (req, res) => {
  try {
    const { cropId } = req.params;
    const cropCycleId = cropId;
    const userId = req.user.id;

    // Verify ownership
    const cropCycle = await prisma.cropCycle.findFirst({
      where: {
        id: cropCycleId,
        farm: { ownerId: userId }
      },
      include: {
        crop: true
      }
    });

    if (!cropCycle) {
      return res.status(404).json({
        success: false,
        message: 'Crop Cycle not found or access denied'
      });
    }

    // Get all expenses for this cycle
    const expenses = await prisma.expense.findMany({
      where: { cropCycleId }
    });

    // Get all revenues for this cycle
    const revenues = await prisma.revenue.findMany({
      where: { cropCycleId }
    });

    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const totalRevenue = revenues.reduce((sum, rev) => sum + rev.amount, 0);
    const profit = totalRevenue - totalExpenses;
    const profitMargin = totalRevenue > 0 ? ((profit / totalRevenue) * 100).toFixed(2) : 0;

    return res.status(200).json({
      success: true,
      data: {
        cropName: cropCycle.crop.cropName,
        totalExpenses,
        totalRevenue,
        profit,
        profitMargin: `${profitMargin}%`,
        expenseCount: expenses.length,
        revenueCount: revenues.length
      }
    });
  } catch (error) {
    console.error('Get profit analysis error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate profit analysis',
      error: error.message
    });
  }
};

// Get revenue by buyer
const getRevenueByBuyer = async (req, res) => {
  try {
    const userId = req.user.id;
    const { startDate, endDate } = req.query;

    const whereClause = {
      cropCycle: {
        farm: { ownerId: userId }
      }
    };

    if (startDate || endDate) {
      whereClause.date = {};
      if (startDate) whereClause.date.gte = new Date(startDate);
      if (endDate) whereClause.date.lte = new Date(endDate);
    }

    const revenues = await prisma.revenue.findMany({
      where: whereClause
    });

    // Group by buyer
    const byBuyer = revenues.reduce((acc, revenue) => {
      if (!acc[revenue.buyerName]) {
        acc[revenue.buyerName] = {
          buyerName: revenue.buyerName,
          totalAmount: 0,
          totalQuantity: 0,
          transactionCount: 0
        };
      }
      acc[revenue.buyerName].totalAmount += revenue.amount;
      acc[revenue.buyerName].totalQuantity += revenue.quantity || 0;
      acc[revenue.buyerName].transactionCount += 1;
      return acc;
    }, {});

    const buyerArray = Object.values(byBuyer).sort((a, b) => b.totalAmount - a.totalAmount);

    return res.status(200).json({
      success: true,
      data: buyerArray,
      totalBuyers: buyerArray.length
    });
  } catch (error) {
    console.error('Get revenue by buyer error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch revenue by buyer',
      error: error.message
    });
  }
};

// Get single revenue by ID
const getRevenueById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const revenue = await prisma.revenue.findFirst({
      where: {
        id,
        cropCycle: {
          farm: { ownerId: userId }
        }
      },
      include: {
        cropCycle: {
          include: {
            crop: { select: { cropName: true } }
          }
        }
      }
    });

    if (!revenue) {
      return res.status(404).json({
        success: false,
        message: 'Revenue record not found or access denied'
      });
    }

    return res.status(200).json({
      success: true,
      data: revenue
    });
  } catch (error) {
    console.error('Get revenue error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch revenue',
      error: error.message
    });
  }
};

// Update revenue
const updateRevenue = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { amount, quantity, buyerName, date } = req.body;

    const existingRevenue = await prisma.revenue.findFirst({
      where: {
        id,
        cropCycle: {
          farm: { ownerId: userId }
        }
      }
    });

    if (!existingRevenue) {
      return res.status(404).json({
        success: false,
        message: 'Revenue record not found or access denied'
      });
    }

    if (amount !== undefined && (isNaN(amount) || amount <= 0)) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be a positive number'
      });
    }

    const updateData = {};
    if (amount) updateData.amount = parseFloat(amount);
    if (quantity !== undefined) updateData.quantity = quantity ? parseFloat(quantity) : null;
    if (buyerName) updateData.buyerName = buyerName;
    if (date) updateData.date = new Date(date);

    const revenue = await prisma.revenue.update({
      where: { id },
      data: updateData
    });

    return res.status(200).json({
      success: true,
      data: revenue,
      message: 'Revenue updated successfully'
    });
  } catch (error) {
    console.error('Update revenue error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update revenue',
      error: error.message
    });
  }
};

// Delete revenue
const deleteRevenue = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const existingRevenue = await prisma.revenue.findFirst({
      where: {
        id,
        cropCycle: {
          farm: { ownerId: userId }
        }
      }
    });

    if (!existingRevenue) {
      return res.status(404).json({
        success: false,
        message: 'Revenue record not found or access denied'
      });
    }

    await prisma.revenue.delete({
      where: { id }
    });

    return res.status(200).json({
      success: true,
      message: 'Revenue deleted successfully'
    });
  } catch (error) {
    console.error('Delete revenue error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete revenue',
      error: error.message
    });
  }
};

module.exports = {
    createRevenue,
    getAllRevenues,
    getProfitAnalysis,
    getRevenueByBuyer,
    getRevenueById,
    getRevenuesByCrop,
    updateRevenue,
    deleteRevenue
};