const express = require('express');
const router = express.Router();
const { getWeatherFromAPI, getWeatherForecast, logWeather, getAllWeatherLogs, getWeatherLogs, deleteWeatherLog} = require('../controllers/weatherController');
const { tokenValidator } = require('../middleware/authMiddleware');


router.get('/live', tokenValidator, getWeatherFromAPI);

router.get('/forecast', tokenValidator, getWeatherForecast);

router.post('/log/:farmId', tokenValidator, logWeather);

router.get('/logs', tokenValidator, getAllWeatherLogs);

router.get('/logs/:farmId', tokenValidator, getWeatherLogs);

router.delete('/logs/:id', tokenValidator, deleteWeatherLog);

module.exports = router;