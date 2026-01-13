/**
 * Centralized axios instance for all API calls
 *
 * Uses environment variable VITE_API_URL if available
 * Falls back to localhost:5000 for development
 */

import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: false,
});

export default api;
