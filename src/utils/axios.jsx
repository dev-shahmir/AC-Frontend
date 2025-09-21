import axios from 'axios';

// Create an axios instance
const instance = axios.create({
  baseURL: 'https://backend-41kk.onrender.com/api', // Base URL for backend API
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the Authorization token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage or another secure storage
    if (token) {
      config.headers['Authorization'] = token; // Attach the token to the Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
