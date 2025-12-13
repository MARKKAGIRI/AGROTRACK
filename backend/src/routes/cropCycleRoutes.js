const express = require("express");
const router = express.Router();
const cropValidation = require("../middleware/cropValidation")
const { addCrop, updateCrop, getCrops, deleteCrop, getCropCycleById } = require("../controllers/cropCycleController");
const { tokenValidator } = require("../middleware/authMiddleware");



// Get all crops for a farm
router.get("/:farmId/crops", tokenValidator, getCrops);

router.get("/:farmId/crops/:cropCycleId",  tokenValidator,  getCropCycleById )

// Add a new crop
router.post("/:farmId/crops", tokenValidator, cropValidation, addCrop);

// Update a crop
router.put("/:farmId/crops/:cropId", tokenValidator, cropValidation, updateCrop);

// Delete a crop
router.delete("/:farmId/crops/:cropId", tokenValidator, deleteCrop);

module.exports = router;