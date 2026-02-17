const express = require("express");
const router = express.Router();
const multer = require("multer");
const chatController = require("../controllers/chatController");
const { tokenValidator } = require("../middleware/authMiddleware")

const upload = multer({ storage: multer.memoryStorage() });

router.post("/chat", upload.single("image"), chatController.askAI);
router.get('/sessions/:userId', tokenValidator, chatController.getUserSessions);
router.get('/sessions/:sessionId/messages', tokenValidator, chatController.getSessionMessages);

module.exports = router;
