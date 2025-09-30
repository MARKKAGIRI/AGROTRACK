const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Login function
const login = async (req, res) => {
  try {
    // 1. Extract email and password from request body
    const { email, password } = req.body;

    // 2. Check if both email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    // 3. Check if user exists in database by email
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    // 4. If user is not registered, return 401
    if (!user) {
      return res.status(401).json({
        error: "Email or password is invalid",
      });
    }

    //5. Compare entered password with hashed password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    //6. If password does not match, return 401
    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Email or password is invalid",
      });
    }

    //7. Generate JWT token with user payload
    const tokenPayload = {
      user_id: user.id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(tokenPayload, process.env.jwtSecret, {
      expiresIn: "7d",
    });

    // 9. Return 200 response with token and user information
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        user_id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        role: user.role,
        ...(user.dob && { dob: user.dob }),
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password, role, location } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Name, email and password are required",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        error: "User already exists with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "user",
        location: location || null,
      },
    });

    const tokenPayload = {
      user_id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      location: newUser.location,
    };

    const token = jwt.sign(tokenPayload, process.env.jwtSecret, {
      expiresIn: "7d",
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      token,
      user: tokenPayload,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

// Get user profile with basic info
const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        location: true,
        // Exclude password for security
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
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
        message: "At least one field is required to update",
      });
    }

    // Check if email is already taken (if email is being updated)
    if (email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: email,
          id: { not: userId },
        },
      });

      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "Email is already in use",
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
        id: userId,
      },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        location: true,
      },
    });

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.error("Error updating user profile:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// admin level control
const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, role, search } = req.query;
    const skip = (page - 1) * limit;

    // Build where clause
    const where = {};
    if (role) where.role = role;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
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
              advice: true,
            },
          },
        },
        skip: parseInt(skip),
        take: parseInt(limit),
        orderBy: {
          name: "asc",
        },
      }),
      prisma.user.count({ where }),
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
          hasPrev: page > 1,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  login,
  register,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
};
