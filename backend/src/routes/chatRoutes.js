const express = require("express");
const router = express.Router();
const multer = require("multer");
const chatController = require("../controllers/chatController");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/chat", upload.single("image"), chatController.askAI);

module.exports = router;
