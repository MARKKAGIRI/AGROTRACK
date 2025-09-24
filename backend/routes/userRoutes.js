const express = require('express');
const {login , register} = require('../controllers/userController')
const router = express.Router();

// public route
router.post('/login', login);

// public route
router.post('/register', register);

module.exports = { router };