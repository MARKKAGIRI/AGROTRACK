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

// ==========================
// FARMS API
// ==========================

// Get all farms for logged-in user
export const getAllFarms = async (userId, token) => {
  try {
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const response = await api.get(`/farms/getAllFarms/${userId}`, config);
    return response.data;
  } catch (error) {
    console.log("getAllFarms error:", error);
    throw error.response?.data || error.message;
  }
};

// OPTIONAL: Get single farm
export const getFarmById = async (farmId) => {
  try {
    const response = await api.get(`/farms/getSingleFarm/${farmId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Add a new farm
export const addFarm = async (farmData, ownerId, token) => {
  try {
   const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const response = await api.post(`/farms/addFarm/${ownerId}`, farmData, config);
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
