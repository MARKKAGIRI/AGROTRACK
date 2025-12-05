const express = require("express");
const router = express.Router();
const { addFarm, deleteFarm, updateFarm, getAllFarms, getSingleFarm } = require("../controllers/farmsController");
const { tokenValidator } = require("../middleware/authMiddleware");


// public route
router.get("/getAllFarms/", tokenValidator, getAllFarms )

router.get("/getSingleFarm/:farmId", tokenValidator, getSingleFarm );

router.post("/addFarm", tokenValidator, addFarm);

router.put("/updateFarm/:farmId", tokenValidator, updateFarm)

router.delete("/deleteFarm/:farmId", tokenValidator, deleteFarm);

module.exports = router;


