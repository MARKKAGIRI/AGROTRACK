const express = require("express");
const router = express.Router();
const {
  getAllCrops,
  createCrop,
  getCropById,
} = require("../controllers/cropController");
const { tokenValidator } = require("../middleware/authMiddleware");

// crops
router.get("/", tokenValidator, getAllCrops);   // GET /crops
router.get("/:cropId", tokenValidator, getCropById)
router.post("/", tokenValidator, createCrop);  // POST /crops

module.exports = router;
