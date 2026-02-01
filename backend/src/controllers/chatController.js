const axios = require("axios");
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

// read AI URL from .env
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://127.0.0.1:8080";

const askAI = async (req, res) => {
  try {
    const { userId, question } = req.body;

    // Validate input
    if (!userId || !question) {
      return res
        .status(400)
        .json({ error: "userId and question are required" });
    }

    // save user message to db
    await prisma.chatMessage.create({
      data: {
        userId: userId,
        role: 'user',
        content: question,
      }
    })

    // fetch last 6 messages for context
    const rawHistory = await prisma.chatMessage.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' },
      take: 6,
    });

    // reverse so that oldest messages come first
    const chatHistory = rawHistory.reverse().map(msg => ({
      role: msg.role,
      content: msg.content,
    }));

    // fetch user context
    const farm = await prisma.farm.findFirst({
      where: { ownerId: userId },
      include: { 
        cropCycles: {
          where: {
            status: 'planted'
          },
          include: {
            crop: true,
          }
        }
      },
    });

    // if no farm is found, use generic default context
    let userContext = "Location: Kenya (General)";

    if (farm) {
      // list of current crops
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
    }

    console.log("[Agrotrack] Sending to AI: ", { question, userContext });

    // talk to the python AI Engine
    const response = await axios.post(`${AI_SERVICE_URL}/ask`, {
      user_id: userId,
      question: question,
      user_context: userContext,
      chatHistory: chatHistory,
    });

    const aiAnswer = response.data.answer;
    
    // save ai message to db
    await prisma.chatMessage.create({
      data: {
        userId: userId,
        role: 'ai',
        content: aiAnswer,
      }
    });

    // send the ai's answer back to frontend
    return res.status(200).json({ answer: aiAnswer, contextUsed: userContext });

  } catch (error) {
    console.error("AI Error: ", error.message);

    // case where python server down
    if (error.code === 'ECONNREFUSED') {
      return res.status(503).json({ error: "AI service is offline" });
    }

    return res.status(500).json({ error: "Something went wrong processing your request." });
  }
};

module.exports = {
  askAI,
};
