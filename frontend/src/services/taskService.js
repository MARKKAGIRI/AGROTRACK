// services/taskApi.js
import axios from 'axios';
import { API_URL } from "@env";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create a new task
export const createTask = async (taskData, token) => {
  try {
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const response = await api.post(`/tasks`, taskData, config); 
    return response.data;
  } catch (error) {
    console.log("createTask error:", error);
    throw error.response?.data || error.message;
  }
};

// Get tasks for a specific crop cycle
export const getTasksByCrop = async (cropId, token) => {
  try {
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const response = await api.get(`/tasks/crop/${cropId}`, config);
    return response.data; 
  } catch (error) {
    console.log("getTasksByCrop error:", error);
    throw error.response?.data || error.message;
  }
};

// Get all tasks for the user (with optional filters like status or date)
export const getAllTasks = async (token, filters = {}) => {
  try {
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    
    const requestConfig = {
      ...config,
      params: filters 
    };

    const response = await api.get(`/tasks`, requestConfig);
    return response.data;
  } catch (error) {
    console.log("getAllTasks error:", error);
    throw error.response?.data || error.message;
  }
};

// Update an existing task
export const updateTask = async (taskId, updateData, token) => {
  try {
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const response = await api.put(`/tasks/${taskId}`, updateData, config);
    return response.data;
  } catch (error) {
    console.log("updateTask error:", error);
    throw error.response?.data || error.message;
  }
};

// Delete a task
export const deleteTask = async (taskId, token) => {
  try {
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const response = await api.delete(`/tasks/${taskId}`, config);
    return response.data;
  } catch (error) {
    console.log("deleteTask error:", error);
    throw error.response?.data || error.message;
  }
};

export default api;