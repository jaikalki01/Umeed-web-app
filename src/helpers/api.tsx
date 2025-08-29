// api.ts
import axios from 'axios';
import { BASE_URL } from '@/config';

const api = axios.create({
  baseURL: BASE_URL,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Use token from AuthContext storage (key: "token")
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const response = error.response;

    if (response) {
      // Check for 401 status or token expired message
      const msg = response?.data?.detail || '';
      const tokenExpired = response.status === 401 || msg.toLowerCase().includes('token expired');

      if (tokenExpired) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return Promise.reject(new Error('Session expired. Please log in again.'));
      }
    }

    return Promise.reject(error);
  }
);

export default api;
