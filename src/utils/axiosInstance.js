import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://65.0.30.83:8000";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Add JWT token automatically for every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
