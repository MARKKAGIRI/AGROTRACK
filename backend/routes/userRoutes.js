const express = require('express');
const router = express.Router();

const {login , register} = require('../controllers/userController')
const {
  getUserProfile,
  getFullUserProfile,
  getUserProfileSummary,
  updateUserProfile,
  getAllUsers
} = require('../controllers/userController');


// public route
router.post('/login', login);

// public route
router.post('/register', register);

// GET /api/users - Get all users (with pagination and filtering)
router.get('/', getAllUsers);

// GET /api/users/:userId - Get basic user profile
router.get('/:userId', getUserProfile);

// GET /api/users/:userId/full - Get comprehensive user profile with related data
router.get('/:userId/full', getFullUserProfile);

// GET /api/users/:userId/summary - Get user profile summary (lightweight)
router.get('/:userId/summary', getUserProfileSummary);

// PUT /api/users/:userId - Update user profile
router.put('/:userId', updateUserProfile);

module.exports = router;