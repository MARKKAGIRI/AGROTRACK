// src/services/weatherService.js
import axios from "axios";

const API_KEY = "85d53772ebaed5b5cdcee237039b5dc4";

export const getWeatherByCoords = async (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${API_KEY}`;

  const response = await axios.get(url);
  return response.data;
};
