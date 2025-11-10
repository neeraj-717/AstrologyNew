import axios from 'axios';

const API_BASE_URL = 'https://astrologyb.onrender.com/api';

const getAuthToken = () => {
  return localStorage.getItem('token');
};

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const userService = {
  // Get current user profile
  getProfile: async () => {
    const response = await apiClient.get('/auth/profile');
    return response.data;
  },

  // Update user profile
  updateProfile: async (userData) => {
    const response = await apiClient.put('/auth/profile', userData);
    return response.data;
  },
};