const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

router.post("/chat", chatController.askAI);

module.exports = router;
