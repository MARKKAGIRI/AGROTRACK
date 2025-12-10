// services/farmApi.js
import axios from 'axios';
import { API_URL } from "@env";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth token injector
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};


// Get all farms for logged-in user
export const getAllFarms = async (token) => {
  try {
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const response = await api.get(`/farms/getAllFarms/`, config);
    return response.data;
  } catch (error) {
    console.log("getAllFarms error:", error);
    throw error.response?.data || error.message;
  }
};

// Get single farm by ID
export const getFarmById = async (farmId, token) => {
  try {
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const response = await api.get(`/farms/getSingleFarm/${farmId}`, config);
    return response.data; // should return { success: true, farm: {...} }
  } catch (error) {
    console.log("getFarmById error:", error);
    throw error.response?.data || error.message;
  }
};

// Get crops for a specific farm
export const getCropsByFarmId = async (farmId, token) => {
  try {
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const response = await api.get(`/cropCycle/${farmId}/crops`, config);
    return response.data; // should return { success: true, count: n, crops: [...] }
  } catch (error) {
    console.log("getCropsByFarmId error:", error);
    throw error.response?.data || error.message;
  }
};


// Add a new farm
export const addFarm = async (farmData, token) => {
  try {
   const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const response = await api.post(`/farms/addFarm/`, farmData, config);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update farm
export const updateFarm = async (farmId, farmData) => {
  try {
    const response = await api.put(`/farms/${farmId}`, farmData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete farm
export const deleteFarm = async (farmId) => {
  try {
    const response = await api.delete(`/farms/${farmId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default api;
