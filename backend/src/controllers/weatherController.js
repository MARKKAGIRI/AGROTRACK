const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const axios = require('axios');

// Get live weather data from OpenWeather API
const getWeatherFromAPI = async (req, res) => {
  try {
    const { lat, lon } = req.query;

    // Validate coordinates
    if (!lat || !lon) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude are required'
      });
    }

    if (isNaN(lat) || isNaN(lon)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid coordinates'
      });
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;

    // Allow execution in test environment without a real key (mocking handles the request)
    if (!apiKey && process.env.NODE_ENV !== 'test') {
      return res.status(500).json({
        success: false,
        message: 'OpenWeather API key not configured'
      });
    }

    // Call OpenWeather API
    // Use a dummy key for testing if actual key is missing
    const appid = apiKey || 'test_key'; 
    
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        lat: parseFloat(lat),
        lon: parseFloat(lon),
        appid: appid,
        units: 'metric' // Use Celsius
      }
    });

    const weatherData = {
      temperature: response.data.main.temp,
      feelsLike: response.data.main.feels_like,
      humidity: response.data.main.humidity,
      pressure: response.data.main.pressure,
      windSpeed: response.data.wind.speed,
      windDirection: response.data.wind.deg,
      cloudiness: response.data.clouds.all,
      rainfall: response.data.rain ? response.data.rain['1h'] || 0 : 0,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      location: response.data.name,
      country: response.data.sys.country,
      sunrise: new Date(response.data.sys.sunrise * 1000),
      sunset: new Date(response.data.sys.sunset * 1000),
      timestamp: new Date(response.data.dt * 1000)
    };

    return res.status(200).json({
      success: true,
      data: weatherData
    });
  } catch (error) {
    console.error('Get weather from API error:', error);

    if (error.response) {
      // OpenWeather API error
      return res.status(error.response.status).json({
        success: false,
        message: 'Failed to fetch weather data from OpenWeather',
        error: error.response.data.message || error.message
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch weather data',
      error: error.message
    });
  }
};

// Log weather data for a specific farm
const logWeather = async (req, res) => {
  try {
    const { farmId } = req.params;
    const userId = req.user.id;

    // Verify farm belongs to user
    // FIXED: Used 'ownerId' instead of 'userId' to match Schema
    const farm = await prisma.farm.findFirst({
      where: {
        id: farmId,
        ownerId: userId 
      }
    });

    if (!farm) {
      return res.status(404).json({
        success: false,
        message: 'Farm not found or access denied'
      });
    }

    // Check if farm has coordinates
    if (!farm.latitude || !farm.longitude) {
      return res.status(400).json({
        success: false,
        message: 'Farm coordinates not set. Please update farm location.'
      });
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey && process.env.NODE_ENV !== 'test') {
      return res.status(500).json({
        success: false,
        message: 'OpenWeather API key not configured'
      });
    }

    const appid = apiKey || 'test_key';

    // Fetch weather data from OpenWeather API
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        lat: farm.latitude,
        lon: farm.longitude,
        appid: appid,
        units: 'metric'
      }
    });

    const weatherData = response.data;

    // Create weather log entry
    const weatherLog = await prisma.weatherLog.create({
      data: {
        farmId: farmId,
        temperature: weatherData.main.temp,
        humidity: weatherData.main.humidity,
        rainfall: weatherData.rain ? weatherData.rain['1h'] || 0 : 0,
        windSpeed: weatherData.wind.speed,
        description: weatherData.weather[0].description,
        date: new Date()
      },
      include: {
        farm: {
          select: {
            name: true,
            location: true
          }
        }
      }
    });

    return res.status(201).json({
      success: true,
      data: weatherLog,
      message: 'Weather data logged successfully'
    });
  } catch (error) {
    console.error('Log weather error:', error);

    if (error.response) {
      return res.status(error.response.status).json({
        success: false,
        message: 'Failed to fetch weather data from OpenWeather',
        error: error.response.data.message || error.message
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Failed to log weather data',
      error: error.message
    });
  }
};

// Get weather logs for a specific farm
const getWeatherLogs = async (req, res) => {
  try {
    const { farmId } = req.params;
    const userId = req.user.id;
    const { startDate, endDate, limit = 30 } = req.query;

    // Verify farm belongs to user
    // FIXED: Used 'ownerId' instead of 'userId'
    const farm = await prisma.farm.findFirst({
      where: {
        id: farmId,
        ownerId: userId
      }
    });

    if (!farm) {
      return res.status(404).json({
        success: false,
        message: 'Farm not found or access denied'
      });
    }

    const whereClause = { farmId };

    // Apply date filters
    if (startDate || endDate) {
      whereClause.date = {};
      if (startDate) whereClause.date.gte = new Date(startDate);
      if (endDate) whereClause.date.lte = new Date(endDate);
    }

    const weatherLogs = await prisma.weatherLog.findMany({
      where: whereClause,
      orderBy: { date: 'desc' },
      take: parseInt(limit),
      include: {
        farm: {
          select: {
            name: true,
            location: true
          }
        }
      }
    });

    // Calculate averages
    if (weatherLogs.length > 0) {
      const avgTemp = weatherLogs.reduce((sum, log) => sum + log.temperature, 0) / weatherLogs.length;
      const avgHumidity = weatherLogs.reduce((sum, log) => sum + log.humidity, 0) / weatherLogs.length;
      const totalRainfall = weatherLogs.reduce((sum, log) => sum + log.rainfall, 0);

      return res.status(200).json({
        success: true,
        data: weatherLogs,
        count: weatherLogs.length,
        statistics: {
          averageTemperature: parseFloat(avgTemp.toFixed(2)),
          averageHumidity: parseFloat(avgHumidity.toFixed(2)),
          totalRainfall: parseFloat(totalRainfall.toFixed(2))
        }
      });
    }

    return res.status(200).json({
      success: true,
      data: weatherLogs,
      count: 0
    });
  } catch (error) {
    console.error('Get weather logs error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch weather logs',
      error: error.message
    });
  }
};

// Get all weather logs for user (across all farms)
const getAllWeatherLogs = async (req, res) => {
  try {
    const userId = req.user.id;
    const { startDate, endDate, limit = 50 } = req.query;

    const whereClause = {
      farm: {
        ownerId: userId // FIXED: Used 'ownerId' instead of 'userId'
      }
    };

    // Apply date filters
    if (startDate || endDate) {
      whereClause.date = {};
      if (startDate) whereClause.date.gte = new Date(startDate);
      if (endDate) whereClause.date.lte = new Date(endDate);
    }

    const weatherLogs = await prisma.weatherLog.findMany({
      where: whereClause,
      orderBy: { date: 'desc' },
      take: parseInt(limit),
      include: {
        farm: {
          select: {
            name: true,
            location: true
          }
        }
      }
    });

    return res.status(200).json({
      success: true,
      data: weatherLogs,
      count: weatherLogs.length
    });
  } catch (error) {
    console.error('Get all weather logs error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch weather logs',
      error: error.message
    });
  }
};

// Get weather forecast (5-day forecast)
const getWeatherForecast = async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude are required'
      });
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey && process.env.NODE_ENV !== 'test') {
      return res.status(500).json({
        success: false,
        message: 'OpenWeather API key not configured'
      });
    }

    const appid = apiKey || 'test_key';

    // Call OpenWeather 5-day forecast API
    const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
      params: {
        lat: parseFloat(lat),
        lon: parseFloat(lon),
        appid: appid,
        units: 'metric'
      }
    });

    const forecastData = response.data.list.map(item => ({
      date: new Date(item.dt * 1000),
      temperature: item.main.temp,
      feelsLike: item.main.feels_like,
      humidity: item.main.humidity,
      windSpeed: item.wind.speed,
      rainfall: item.rain ? item.rain['3h'] || 0 : 0,
      description: item.weather[0].description,
      icon: item.weather[0].icon
    }));

    return res.status(200).json({
      success: true,
      data: {
        location: response.data.city.name,
        country: response.data.city.country,
        forecast: forecastData
      }
    });
  } catch (error) {
    console.error('Get weather forecast error:', error);

    if (error.response) {
      return res.status(error.response.status).json({
        success: false,
        message: 'Failed to fetch forecast data',
        error: error.response.data.message || error.message
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch forecast data',
      error: error.message
    });
  }
};

// Delete weather log
const deleteWeatherLog = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Verify weather log belongs to user
    // FIXED: Used 'ownerId' in relation check
    const weatherLog = await prisma.weatherLog.findFirst({
      where: {
        id,
        farm: {
          ownerId: userId 
        }
      }
    });

    if (!weatherLog) {
      return res.status(404).json({
        success: false,
        message: 'Weather log not found or access denied'
      });
    }

    await prisma.weatherLog.delete({
      where: { id }
    });

    return res.status(200).json({
      success: true,
      message: 'Weather log deleted successfully'
    });
  } catch (error) {
    console.error('Delete weather log error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete weather log',
      error: error.message
    });
  }
};

module.exports = {
    getAllWeatherLogs,
    getWeatherForecast,
    getWeatherFromAPI,
    getWeatherLogs,
    logWeather,
    deleteWeatherLog
}