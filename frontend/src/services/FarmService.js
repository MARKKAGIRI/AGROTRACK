import axios from 'axios';
import { OPENWEATHER_API_KEY } from '@env';


export const getSatelliteDataDirectly = async (name, coordinates) => {
  try {
    // Step 1: Create the Polygon (Every time for now, just for testing)
    const polyResponse = await axios.post(
      `http://api.agromonitoring.com/agro/1.0/polygons?appid=${OPENWEATHER_API_KEY}`,
      {
        name: name,
        geo_json: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Polygon",
            coordinates: [coordinates] // [[ [lng, lat], [lng, lat]... ]]
          }
        }
      }
    );

    const polyId = polyResponse.data.id;

    // Step 2: Search for images for this new ID
    const end = Math.floor(Date.now() / 1000);
    const start = end - (30 * 24 * 60 * 60);

    const imgResponse = await axios.get(
      `http://api.agromonitoring.com/agro/1.0/image/search?start=${start}&end=${end}&polyid=${polyId}&appid=${OPENWEATHER_API_KEY}`
    );

    if (imgResponse.data.length > 0) {
      return {
        truecolor: imgResponse.data[0].image.truecolor,
        ndvi: imgResponse.data[0].image.ndvi,
        moisture: (imgResponse.data[0].stats?.moisture || 0).toFixed(1)
      };
    }
    return null;
  } catch (error) {
    console.error("Satellite Fetch Error:", error.response?.data || error.message);
    return null;
  }
};