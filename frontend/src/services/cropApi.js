// services/cropApi.js
import axios from 'axios';
import { API_URL } from "@env"; // Replace with your actual API URL

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const getAllCrops = async (token) => {
  try {
    const res = await api.get('/crops', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch (e) {
    throw e;
  }
};

// Get all crops for a farm
export const getCropsByFarm = async (farmId) => {
  try {
    const response = await api.get(`/cropCycle/0d5bdfe5-d7b9-4b2a-94e9-8e165627307c/crops`);
    return response.data;
  } catch (error) {
    console.log(error)
    throw error.response?.data || error.message;
  }
};


// Add a new crop cycle
export const addCropCycle = async (farmId, data, token) => {
  try {
    console.log("Data:", farmId);

    const res = await api.post(
      `/cropCycle/${farmId}/crops`, // endpoint
      data, // request body
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.data; // Axios returns the response in .data
  } catch (error) {
    console.log("Add crop cycle error:", error.response?.data || error.message);
    return { success: false, error: error.response?.data?.message || "Network error" };
  }
};


// Update a crop cycle
export const updateCrop = async (farmId, cropId, cropData) => {
  try {
    const response = await api.put(`/farms/${farmId}/crops/${cropId}`, cropData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete a crop cycle
export const deleteCrop = async (farmId, cropId) => {
  try {
    const response = await api.delete(`/farms/${farmId}/crops/${cropId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default api;