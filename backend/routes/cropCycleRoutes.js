const express = require("express");
const router = express.Router();
const { addCrop, updateCrop } = require("../controllers/cropCycleController");
const { tokenValidator } = require("../middleware/authMiddleware");

// public route
router.post("/:farmId/addCrop", tokenValidator, addCrop);

router.put("/:farmId/updateCrop/:cropId", tokenValidator, updateCrop)

module.exports = router;