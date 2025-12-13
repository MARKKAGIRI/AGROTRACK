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

export const getCropCycleById = async (farmId, cropCycleId, token) => {
  try{
    const res = await api.get(`/cropCycle/${farmId}/crops/${cropCycleId}`, {
      headers: { Authorization: `Bearer ${token}`}
    });
    if (res.data.success){
      return res.data.cropCycle
    }else {
      return []
    }
  }catch (error){
    console.error("Failed to fetch cropcycle", error);
    return []
  }
}

// Add a new crop cycle
export const addCropCycle = async (farmId, data, token) => {
  try {
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