const express = require("express");
const router = express.Router();
const {tokenValidator, adminAuthorisation} = require("../middleware/authMiddleware")

const {
  login,
  register,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  googleAuth
} = require("../controllers/userController");

// public route
router.post("/login", login);

// public route
router.post("/register", register);

router.post("/auth/google", googleAuth)

// private route
router.get("/:userId", tokenValidator, getUserProfile);


// private route
router.put("/:userId", tokenValidator, updateUserProfile);

// admin route
router.get("/admin/allUsers", tokenValidator, adminAuthorisation, getAllUsers);




module.exports = router;
