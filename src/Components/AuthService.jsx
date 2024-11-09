import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Fixing import for jwt-decode

const API_URL = "http://localhost:8080/authenticate";

const AuthService = {
  login: async (username, password) => {
    const response = await axios.post(API_URL, { username, password });
    if (response.data.token) {
      const decodedToken = jwtDecode(response.data.token); // Decode the token to get user data
      console.log("Decoded Token:", decodedToken); // Debugging line
      const userRole = decodedToken.role; // Assuming the role is inside the decoded token payload

      // Store token and role information in localStorage
      localStorage.setItem("user", JSON.stringify(response.data)); // Store entire user data (including token)
      localStorage.setItem("role", response.data.role); // Store role separately for easy access

      console.log("Stored Role:", response.data.role); // Log role immediately after storing it
    }
    return response.data;
  },

  register: (username, password, email, role) => {
    return axios.post("http://localhost:8080/register", {
      username,
      password,
      email,
      role,
    });
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem("user"));
  },

  getCurrentUserRole: () => {
    return localStorage.getItem("role"); // Retrieve stored role
  },

  resetPassword: (email) => {
    return axios.post(API_URL + "/forgot-password", { email });
  },

  isAuthenticated: () => {
    const user = AuthService.getCurrentUser();
    if (user && user.token) {
      const decodedToken = jwtDecode(user.token);
      const isTokenExpired = decodedToken.exp * 1000 < Date.now();
      return !isTokenExpired;
    }
    return false;
  },
};

// Axios interceptor for token inclusion
axios.interceptors.request.use(
  (config) => {
    const user = AuthService.getCurrentUser();
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default AuthService;
