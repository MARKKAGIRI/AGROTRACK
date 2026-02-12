const axios = require("axios");
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const redisClient = require("../config/redisClient");
const FormData = require("form-data");
const fs = require("fs");

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://127.0.0.1:8080";

const CONTEXT_CACHE_TTL = 3600;

const askAI = async (req, res) => {
  try {
    const { userId, question } = req.body;
    const imageFile = req.file;

    // Validate input
    if (!userId || !question) {
      return res
        .status(400)
        .json({ error: "userId and question are required" });
    }

    // 1. Save user message to db (Write is always real-time)
    await prisma.chatMessage.create({
      data: {
        userId: userId,
        role: 'user',
        content: question || (imageFile ? "Analyze this image" : "Hello"),
      }
    });

    // 2. Get user farm context from Redis cache or DB
    const cacheKey = `user:${userId}:farmContext`;
    let userContext = await redisClient.get(cacheKey);

    if (userContext) {
      console.log(`[Cache Hit] Using cached context for user ${userId}`);
    } else {
      console.log(`[Cache Miss] Fetching fresh context for user ${userId}`);

      // Fetch from Database (The slow part)
      const farm = await prisma.farm.findFirst({
        where: { ownerId: userId },
        include: { 
          cropCycles: {
            where: { status: 'planted' },
            include: { crop: true }
          }
        },
      });

      if (farm) {
        const cropDetails = farm.cropCycles.map(cycle => {
          const plantedDate = new Date(cycle.plantingDate).toISOString().split('T')[0];
          return `${cycle.crop.cropName} (Planted: ${plantedDate})`;
        }).join(", ");

        userContext = `
        Location: ${farm.location || "Unknown"}.
        Farm Name: ${farm.name}.
        Farm Size: ${farm.size || "Unknown"} acres.
        Current Active Crops: ${cropDetails || "None"}.
        `;
      } else {
        userContext = "Location: Kenya (General)";
      }

      // Save to Redis for next time
      await redisClient.set(cacheKey, userContext, {
        EX: CONTEXT_CACHE_TTL // Expire after 1 hour
      });
    }

    // Get chat history (always fresh)
    const rawHistory = await prisma.chatMessage.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' },
      take: 6,
    });

    const chatHistory = rawHistory.reverse().map(msg => ({
      role: msg.role,
      content: msg.content,
    }));

    // Form data for python
    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('question', question);
    formData.append('user_context', userContext || "What is wrong with this crop?");
    formData.append('chat_history', JSON.stringify(chatHistory));

    if (imageFile) {
      formData.append('image', imageFile.buffer, {
        filename: imageFile.originalname || 'upload.jpg',
        contentType: imageFile.mimetype || 'image/jpeg'
      });
    }

    console.log("[Agrotrack] Sending to AI: ", { question, contextLength: userContext.length, imageFile: imageFile ? "Yes" : "No" });

    // 3. Talk to the Python AI Engine
    const response = await axios.post(`${AI_SERVICE_URL}/ask`, formData, {
      headers: {...formData.getHeaders()}
    });

    const aiAnswer = response.data.answer;
    
    // 4. Save AI message to db
    await prisma.chatMessage.create({
      data: {
        userId: userId,
        role: 'ai',
        content: aiAnswer,
      }
    });
   
    return res.status(200).json({ answer: aiAnswer, contextUsed: "Context sent to AI" });

  } catch (error) {
    console.error("AI Error: ", error.message);

    if (error.code === 'ECONNREFUSED') {
      return res.status(503).json({ error: "AI service is offline" });
    }

    return res.status(500).json({ error: "Something went wrong processing your request." });
  }
};

module.exports = {
  askAI,
};