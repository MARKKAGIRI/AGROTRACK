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

    // 2. Get enriched user context from Redis cache or DB
    const cacheKey = `user:${userId}:farmContext`;
    const cacheMetaKey = `user:${userId}:farmMeta`; // Cache metadata separately
    
    let userContext = await redisClient.get(cacheKey);
    let farmMetadata = await redisClient.get(cacheMetaKey);
    let farmsCount = 0;

    if (userContext && farmMetadata) {
      console.log(`[Cache Hit] Using cached context for user ${userId}`);
      const meta = JSON.parse(farmMetadata);
      farmsCount = meta.farmsCount || 0;
    } else {
      console.log(`[Cache Miss] Fetching fresh context for user ${userId}`);

      // Fetch comprehensive user and farm data
      const [user, farms, recentTasks, recentExpenses, recentWeather] = await Promise.all([
        // Get user details
        prisma.user.findUnique({
          where: { id: userId },
          select: { name: true, location: true, role: true }
        }),
        
        // Get all user farms with active crop cycles
        prisma.farm.findMany({
          where: { ownerId: userId },
          include: { 
            cropCycles: {
              where: { status: { in: ['planted', 'growing'] } },
              include: { 
                crop: true,
                tasks: {
                  where: {
                    date: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } // Last 30 days
                  },
                  orderBy: { date: 'desc' },
                  take: 5
                },
                expenses: {
                  orderBy: { date: 'desc' },
                  take: 3
                },
                revenues: {
                  orderBy: { date: 'desc' },
                  take: 3
                }
              }
            }
          },
        }),

        // Get recent pending/upcoming tasks across all farms
        prisma.task.findMany({
          where: {
            cropCycle: {
              farm: { ownerId: userId }
            },
            status: { in: ['pending', 'in-progress'] },
            date: { gte: new Date() }
          },
          include: {
            cropCycle: {
              include: { crop: true, farm: true }
            }
          },
          orderBy: { date: 'asc' },
          take: 5
        }),

        // Get recent expenses summary
        prisma.expense.findMany({
          where: {
            cropCycle: {
              farm: { ownerId: userId }
            },
            date: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
          },
          orderBy: { date: 'desc' },
          take: 5
        }),

        // Get recent weather data
        prisma.weatherLog.findMany({
          where: {
            farm: { ownerId: userId }
          },
          orderBy: { date: 'desc' },
          take: 3
        })
      ]);

      farmsCount = farms?.length || 0;

      // Build comprehensive context
      const contextParts = [];

      // User info
      if (user) {
        contextParts.push(`User: ${user.name}`);
        contextParts.push(`User Location: ${user.location || "Kenya"}`);
      }

      // Farm details
      if (farms && farms.length > 0) {
        contextParts.push(`\n--- Farms (${farms.length}) ---`);
        
        farms.forEach((farm, idx) => {
          const farmInfo = [
            `Farm ${idx + 1}: ${farm.name}`,
            `Location: ${farm.location}`,
            `Size: ${farm.size || "Unknown"} ${farm.unit || "acres"}`,
            `Type: ${farm.type || "Mixed farming"}`
          ];

          // Active crops in this farm
          if (farm.cropCycles && farm.cropCycles.length > 0) {
            const crops = farm.cropCycles.map(cycle => {
              const plantedDays = Math.floor(
                (new Date() - new Date(cycle.plantingDate)) / (1000 * 60 * 60 * 24)
              );
              const harvestIn = cycle.harvestDate 
                ? Math.floor((new Date(cycle.harvestDate) - new Date()) / (1000 * 60 * 60 * 24))
                : null;

              let cropDetail = `${cycle.crop.cropName} (planted ${plantedDays} days ago`;
              if (harvestIn !== null) {
                cropDetail += harvestIn > 0 
                  ? `, harvest in ${harvestIn} days)` 
                  : `, harvest ${Math.abs(harvestIn)} days overdue)`;
              } else {
                cropDetail += ')';
              }

              // Add recent tasks for this crop
              if (cycle.tasks && cycle.tasks.length > 0) {
                const taskSummary = cycle.tasks.map(t => 
                  `${t.title} (${t.status})`
                ).join(', ');
                cropDetail += ` - Recent tasks: ${taskSummary}`;
              }

              return cropDetail;
            });

            farmInfo.push(`Active Crops: ${crops.join('; ')}`);
          } else {
            farmInfo.push('Active Crops: None');
          }

          contextParts.push(farmInfo.join('\n'));
        });
      } else {
        contextParts.push('\n--- Farms ---');
        contextParts.push('No farms registered yet');
      }

      // Upcoming tasks
      if (recentTasks && recentTasks.length > 0) {
        contextParts.push(`\n--- Upcoming Tasks ---`);
        const taskList = recentTasks.map(task => {
          const daysUntil = Math.ceil(
            (new Date(task.date) - new Date()) / (1000 * 60 * 60 * 24)
          );
          return `${task.title} for ${task.cropCycle.crop.cropName} on ${task.cropCycle.farm.name} (${daysUntil} days)`;
        });
        contextParts.push(taskList.join('\n'));
      }

      // Recent expenses
      if (recentExpenses && recentExpenses.length > 0) {
        const totalExpenses = recentExpenses.reduce((sum, exp) => sum + exp.amount, 0);
        contextParts.push(`\n--- Recent Expenses (Last 30 days) ---`);
        contextParts.push(`Total: KES ${totalExpenses.toFixed(2)}`);
        
        const expensesByType = recentExpenses.reduce((acc, exp) => {
          acc[exp.type] = (acc[exp.type] || 0) + exp.amount;
          return acc;
        }, {});
        
        const breakdown = Object.entries(expensesByType)
          .map(([type, amount]) => `${type}: KES ${amount.toFixed(2)}`)
          .join(', ');
        contextParts.push(`Breakdown: ${breakdown}`);
      }

      // Recent weather
      if (recentWeather && recentWeather.length > 0) {
        contextParts.push(`\n--- Recent Weather ---`);
        const latest = recentWeather[0];
        contextParts.push(
          `Temperature: ${latest.temperature}°C, ` +
          `Humidity: ${latest.humidity}%, ` +
          `Rainfall: ${latest.rainfall}mm, ` +
          `Wind: ${latest.windSpeed}km/h`
        );
      }

      userContext = contextParts.join('\n');

      // Cache both context and metadata
      await Promise.all([
        redisClient.set(cacheKey, userContext, {
          EX: CONTEXT_CACHE_TTL
        }),
        redisClient.set(cacheMetaKey, JSON.stringify({ farmsCount }), {
          EX: CONTEXT_CACHE_TTL
        })
      ]);
    }

    // Get chat history (always fresh)
    const rawHistory = await prisma.chatMessage.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' },
      take: 10, // Increased from 6 for better context
    });

    const chatHistory = rawHistory.reverse().map(msg => ({
      role: msg.role,
      content: msg.content,
    }));

    // Form data for python
    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('question', question);
    formData.append('user_context', userContext || "General farming context");
    formData.append('chat_history', JSON.stringify(chatHistory));

    if (imageFile) {
      formData.append('image', imageFile.buffer, {
        filename: imageFile.originalname || 'upload.jpg',
        contentType: imageFile.mimetype || 'image/jpeg'
      });
    }

    console.log("[Agrotrack] Sending to AI: ", { 
      question, 
      contextLength: userContext?.length || 0, 
      imageFile: imageFile ? "Yes" : "No",
      farmsCount: farmsCount
    });

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
   
    return res.status(200).json({ 
      answer: aiAnswer, 
      contextUsed: "Enhanced context sent to AI" 
    });

  } catch (error) {
    console.error("AI Error: ", error.message);

    if (error.code === 'ECONNREFUSED') {
      return res.status(503).json({ error: "AI service is offline" });
    }

    return res.status(500).json({ 
      error: "Something went wrong processing your request." 
    });
  }
};

module.exports = {
  askAI,
};