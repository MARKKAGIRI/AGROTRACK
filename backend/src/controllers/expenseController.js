const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

// Create new expense
const createExpense = async (req, res) => {
  try {
    const { cropCycleId, type, amount, description, date } = req.body;
    const userId = req.user.id;

    // Validate required fields
    // Note: We expect 'cropCycleId' now, not 'cropId'
    if (!cropCycleId || !type || !amount || !date) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: cropCycleId, type, amount, date'
      });
    }

    // Validate amount
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be a positive number'
      });
    }

    // Verify the Crop Cycle belongs to a Farm owned by the User
    const cropCycle = await prisma.cropCycle.findFirst({
      where: {
        id: cropCycleId,
        farm: {
          ownerId: userId // Correctly checking farm ownership
        }
      }
    });

    if (!cropCycle) {
      return res.status(404).json({
        success: false,
        message: 'Crop Cycle not found or access denied'
      });
    }

    // Create expense
    const expense = await prisma.expense.create({
      data: {
        cropCycleId, // Correct Foreign Key
        type,
        amount: parseFloat(amount),
        description: description || null,
        date: new Date(date)
      },
      include: {
        cropCycle: {
          include: {
            crop: { // Include static crop details (name, type)
              select: {
                cropName: true,
                cropType: true
              }
            },
            farm: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });

    return res.status(201).json({
      success: true,
      data: expense,
      message: 'Expense recorded successfully'
    });
  } catch (error) {
    console.error('Create expense error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create expense',
      error: error.message
    });
  }
};

// Get all expenses for a specific Crop Cycle
const getExpensesByCrop = async (req, res) => {
  try {
    // We expect the route param to be :cropCycleId, or we map :cropId to cropCycleId
    const { cropId } = req.params; // Keeping variable name generic if route uses :cropId
    const cropCycleId = cropId; 
    const userId = req.user.id;

    // Verify ownership
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

    const expenses = await prisma.expense.findMany({
      where: { cropCycleId: cropCycleId },
      orderBy: { date: 'desc' },
      include: {
        cropCycle: {
          include: {
            crop: {
              select: {
                cropName: true,
                cropType: true
              }
            }
          }
        }
      }
    });

    // Calculate total expenses
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    return res.status(200).json({
      success: true,
      data: expenses,
      count: expenses.length,
      totalExpenses: totalExpenses
    });
  } catch (error) {
    console.error('Get expenses error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch expenses',
      error: error.message
    });
  }
};

// Get all expenses for the authenticated user (across all their farms)
const getAllExpenses = async (req, res) => {
  try {
    const userId = req.user.id;
    const { startDate, endDate, type, cropCycleId } = req.query;

    // Filter expenses where the related CropCycle's Farm is owned by the user
    const whereClause = {
      cropCycle: {
        farm: {
          ownerId: userId
        }
      }
    };

    // Apply optional filters
    if (startDate || endDate) {
      whereClause.date = {};
      if (startDate) whereClause.date.gte = new Date(startDate);
      if (endDate) whereClause.date.lte = new Date(endDate);
    }

    if (type) {
      whereClause.type = type;
    }

    if (cropCycleId) {
      whereClause.cropCycleId = cropCycleId;
    }

    const expenses = await prisma.expense.findMany({
      where: whereClause,
      orderBy: { date: 'desc' },
      include: {
        cropCycle: {
          include: {
            crop: {
              select: {
                cropName: true,
                cropType: true
              }
            },
            farm: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });

    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    return res.status(200).json({
      success: true,
      data: expenses,
      count: expenses.length,
      totalExpenses: totalExpenses
    });
  } catch (error) {
    console.error('Get all expenses error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch expenses',
      error: error.message
    });
  }
};

// Get expense summary by type
const getExpenseSummary = async (req, res) => {
  try {
    const userId = req.user.id;
    const { startDate, endDate, cropCycleId } = req.query;

    const whereClause = {
      cropCycle: {
        farm: {
          ownerId: userId
        }
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

    const expenses = await prisma.expense.findMany({
      where: whereClause
    });

    // Group by type and calculate totals
    const summary = expenses.reduce((acc, expense) => {
      if (!acc[expense.type]) {
        acc[expense.type] = {
          type: expense.type,
          totalAmount: 0,
          count: 0
        };
      }
      acc[expense.type].totalAmount += expense.amount;
      acc[expense.type].count += 1;
      return acc;
    }, {});

    const summaryArray = Object.values(summary);
    const grandTotal = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    return res.status(200).json({
      success: true,
      data: {
        byType: summaryArray,
        grandTotal: grandTotal,
        totalTransactions: expenses.length
      }
    });
  } catch (error) {
    console.error('Get expense summary error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate expense summary',
      error: error.message
    });
  }
};

// Get single expense by ID
const getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const expense = await prisma.expense.findFirst({
      where: {
        id,
        cropCycle: {
          farm: {
            ownerId: userId
          }
        }
      },
      include: {
        cropCycle: {
          include: {
            crop: {
              select: {
                cropName: true,
                cropType: true
              }
            },
            farm: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found or access denied'
      });
    }

    return res.status(200).json({
      success: true,
      data: expense
    });
  } catch (error) {
    console.error('Get expense error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch expense',
      error: error.message
    });
  }
};

// Update expense
const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { type, amount, description, date } = req.body;

    // Verify ownership
    const existingExpense = await prisma.expense.findFirst({
      where: {
        id,
        cropCycle: {
          farm: {
            ownerId: userId
          }
        }
      }
    });

    if (!existingExpense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found or access denied'
      });
    }

    // Validate amount if provided
    if (amount !== undefined && (isNaN(amount) || amount <= 0)) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be a positive number'
      });
    }

    // Build update data
    const updateData = {};
    if (type) updateData.type = type;
    if (amount) updateData.amount = parseFloat(amount);
    if (description !== undefined) updateData.description = description;
    if (date) updateData.date = new Date(date);

    const expense = await prisma.expense.update({
      where: { id },
      data: updateData,
      include: {
        cropCycle: {
          include: {
            crop: {
              select: { cropName: true }
            }
          }
        }
      }
    });

    return res.status(200).json({
      success: true,
      data: expense,
      message: 'Expense updated successfully'
    });
  } catch (error) {
    console.error('Update expense error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update expense',
      error: error.message
    });
  }
};

// Delete expense
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Verify ownership
    const existingExpense = await prisma.expense.findFirst({
      where: {
        id,
        cropCycle: {
          farm: {
            ownerId: userId
          }
        }
      }
    });

    if (!existingExpense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found or access denied'
      });
    }

    await prisma.expense.delete({
      where: { id }
    });

    return res.status(200).json({
      success: true,
      message: 'Expense deleted successfully'
    });
  } catch (error) {
    console.error('Delete expense error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete expense',
      error: error.message
    });
  }
};

module.exports = {
    createExpense,
    getExpensesByCrop,
    getAllExpenses,
    getExpenseById,
    getExpenseSummary,
    updateExpense,
    deleteExpense
}