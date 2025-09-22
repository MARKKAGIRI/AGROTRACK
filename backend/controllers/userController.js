const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

// Get user profile with basic info
const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        location: true,
        // Exclude password for security
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });

  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get comprehensive user profile with related data
const getFullUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        location: true,
        farms: {
          select: {
            id: true,
            name: true,
            size: true,
            cropType: true,
            crops: {
              select: {
                id: true,
                cropName: true,
                plantingDate: true,
                harvestDate: true,
                status: true,
                tasks: {
                  select: {
                    id: true,
                    title: true,
                    dueDate: true,
                    status: true
                  }
                }
              }
            }
          }
        },
        advice: {
          select: {
            id: true,
            message: true,
            createdAt: true
          },
          orderBy: {
            createdAt: 'desc'
          },
          take: 10 // Limit to recent 10 advice entries
        }
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Calculate some statistics
    const totalFarms = user.farms.length;
    const totalCrops = user.farms.reduce((acc, farm) => acc + farm.crops.length, 0);
    const activeCrops = user.farms.reduce((acc, farm) => {
      return acc + farm.crops.filter(crop => crop.status === 'active').length;
    }, 0);
    const pendingTasks = user.farms.reduce((acc, farm) => {
      return acc + farm.crops.reduce((cropAcc, crop) => {
        return cropAcc + crop.tasks.filter(task => task.status === 'pending').length;
      }, 0);
    }, 0);

    const profileData = {
      ...user,
      statistics: {
        totalFarms,
        totalCrops,
        activeCrops,
        pendingTasks,
        totalAdvice: user.advice.length
      }
    };

    res.status(200).json({
      success: true,
      data: profileData
    });

  } catch (error) {
    console.error('Error fetching full user profile:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get user profile summary (lightweight version)
const getUserProfileSummary = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        location: true,
        _count: {
          select: {
            farms: true,
            advice: true
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        ...user,
        farmsCount: user._count.farms,
        adviceCount: user._count.advice
      }
    });

  } catch (error) {
    console.error('Error fetching user profile summary:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, location, role } = req.body;

    // Validate required fields
    if (!name && !email && !location && !role) {
      return res.status(400).json({
        success: false,
        message: 'At least one field is required to update'
      });
    }

    // Check if email is already taken (if email is being updated)
    if (email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: email,
          id: { not: userId }
        }
      });

      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'Email is already in use'
        });
      }
    }

    // Prepare update data
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (location) updateData.location = location;
    if (role) updateData.role = role;

    const updatedUser = await prisma.user.update({
      where: {
        id: userId
      },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        location: true
      }
    });

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser
    });

  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    console.error('Error updating user profile:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get all users (for admin purposes)
const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, role, search } = req.query;
    const skip = (page - 1) * limit;

    // Build where clause
    const where = {};
    if (role) where.role = role;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ];
    }

    const [users, totalCount] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          location: true,
          _count: {
            select: {
              farms: true,
              advice: true
            }
          }
        },
        skip: parseInt(skip),
        take: parseInt(limit),
        orderBy: {
          name: 'asc'
        }
      }),
      prisma.user.count({ where })
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({
      success: true,
      data: {
        users,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalCount,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      }
    });

  } catch (error) {
    console.error('Error fetching all users:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

module.exports = {
  getUserProfile,
  getFullUserProfile,
  getUserProfileSummary,
  updateUserProfile,
  getAllUsers
};