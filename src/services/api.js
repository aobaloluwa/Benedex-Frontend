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

// Centralized Human-Readable Error Helper (Filters raw HTTP status strings & tech jargon)
export const getErrorMessage = (error) => {
  if (!error) return "An unexpected error occurred. Please try again.";

  const serverMsg = error.response?.data?.message || error.response?.data?.error;
  if (
    serverMsg &&
    typeof serverMsg === "string" &&
    !serverMsg.toLowerCase().includes("axios") &&
    !serverMsg.toLowerCase().includes("status code")
  ) {
    return serverMsg;
  }

  const status = error.response?.status;
  if (status === 400) {
    return serverMsg || "Invalid verification code or details provided. Please check and try again.";
  }
  if (status === 401) {
    return "Invalid credentials or session expired. Please sign in again.";
  }
  if (status === 403) {
    return "You do not have authorization to perform this action.";
  }
  if (status === 404) {
    return "No matching user account or verification code found.";
  }
  if (status === 429) {
    return "Too many attempts detected. Please wait a moment and try again.";
  }
  if (status === 500) {
    return "Server service exception. Please try again shortly.";
  }

  if (error.message && error.message.includes("Network Error")) {
    return "Unable to connect to server. Please check your internet connection.";
  }

  return error.message || "An unexpected error occurred. Please try again.";
};

export default API;