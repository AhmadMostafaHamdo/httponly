import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://31.97.78.230:3000",
  withCredentials: true, // Essential for cookies
  timeout: 10000,
});

// Add request interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized errors globally
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
