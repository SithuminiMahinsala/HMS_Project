import axios from "axios";

// Create an Axios instance with your backend base URL
const API = axios.create({
  baseURL: "http://localhost:5000/api", // Make sure this matches your backend port
});

// Request Interceptor: Automatically attach the JWT token to every request
API.interceptors.request.use(
  (config) => {
    // We will save the token to localStorage when the user logs in
    const token = localStorage.getItem("token");

    if (token) {
      // If a token exists, put it in the Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;