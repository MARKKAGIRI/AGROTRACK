const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient()

// Login function
const login = async (req, res) => {
  try {
    // 1. Extract email and password from request body
    const { email, password } = req.body;

    // 2. Check if both email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        error: 'All fields are required'
      });
    }

    // 3. Check if user exists in database by email
    const user = await prisma.user.findUnique({ 
        where: { email: email }
     });

    // 4. If user is not registered, return 401
    if (!user) {
      return res.status(401).json({
        error: 'Email or password is invalid'
      });
    }

    //5. Compare entered password with hashed password using bcrypt
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    const isPasswordValid = password === user.password; // Temporary plain text comparison

    //6. If password does not match, return 401
    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Email or password is invalid'
      });
    }

    //7. Generate JWT token with user payload
    const tokenPayload = {
      user_id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      role: user.role,
    };

    // 8. JWT token expires in 1 week (7 days)
    const token = jwt.sign(
      tokenPayload,
      process.env.jwtSecret, // Make sure to set this in your environment variables
      { expiresIn: '7d' }
    );

    // 9. Return 200 response with token and user information
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        user_id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
        role: user.role,
        ...(user.dob && { dob: user.dob })
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      error: 'Internal server error'
    });
  }
};

module.exports = login;