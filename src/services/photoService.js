import axios from 'axios';

const API_BASE_URL = 'https://astrologyb.onrender.com/api';

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const photoService = {
  // Get all photos
  getAllPhotos: async () => {
    const response = await apiClient.get('/photo');
    return response.data;
  },

  // Upload new photo
  uploadPhoto: async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    const response = await apiClient.post('/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete photo
  deletePhoto: async (photoId) => {
    const response = await apiClient.delete(`/photo/${photoId}`);
    return response.data;
  },
};