const express = require("express");
const router = express.Router();
const { addFarm, deleteFarm, updateFarm } = require("../controllers/farmsController");
const { tokenValidator } = require("../middleware/authMiddleware");

// public route
router.post("/addFarm", tokenValidator, addFarm);

router.put("/updateFarm/:farmId", tokenValidator, updateFarm)

router.delete("/deleteFarm/:farmId", tokenValidator, deleteFarm);

module.exports = router;


