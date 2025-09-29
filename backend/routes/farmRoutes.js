const express = require("express");
const router = express.Router();
const { addFarm } = require("../controllers/farmsController");
const { tokenValidator } = require("../middleware/authMiddleware");

// public route
router.post("/addFarm", tokenValidator, addFarm);

module.exports = router;


