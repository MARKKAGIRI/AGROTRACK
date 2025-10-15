const express = require("express");
const router = express.Router();
const { addCrop } = require("../controllers/cropCycleController");
const { tokenValidator } = require("../middleware/authMiddleware");

// public route
router.post("/addCrop", tokenValidator, addCrop);

module.exports = router;