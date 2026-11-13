import axios from "axios";

// Dynamically set Gateway target while keeping the /api path base intact
const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || "https://benedex-backend.onrender.com";
const cleanBaseUrl = rawBaseUrl.replace(/\/+$/, "");
const apiBaseUrl = cleanBaseUrl.endsWith("/api") ? cleanBaseUrl : `${cleanBaseUrl}/api`;

const API = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor (Injects JWT Token cleanly)
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (Strictly handles planned maintenance without breaking on cold boots)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const isExplicitMaintenance = error.response?.data?.maintenance === true;

    // Only redirect to maintenance if the API explicitly flags a maintenance state
    if (status === 503 && isExplicitMaintenance) {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      if (user?.role !== "admin") {
        window.location.href = "/maintenance";
      }
    }

    return Promise.reject(error);
  }
);

export default API;