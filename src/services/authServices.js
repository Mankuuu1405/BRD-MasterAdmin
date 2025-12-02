import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://65.0.30.83:8000";
const API_URL = `${API_BASE_URL}/api/token/`;
const SIGNUP_URL = `${API_BASE_URL}/api/v1/users/signup/`;

export const authService = {
  login: async (email, password) => {
    try {
      // Normalize email to lowercase for case-insensitive login
      const normalizedEmail = email.toLowerCase().trim();
      
      const response = await axios.post(API_URL, {
        email: normalizedEmail,
        password: password,
      });

      if (response.data?.access) {
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        localStorage.setItem("user_email", email);

        return { email, access_token: response.data.access };
      }

      return null;
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      // Return error details for better error handling
      throw {
        message: error.response?.data?.detail || 
                 error.response?.data?.non_field_errors?.[0] ||
                 "Invalid email or password",
        status: error.response?.status,
        data: error.response?.data
      };
    }
  },

  signup: async (userData) => {
    try {
      const response = await axios.post(SIGNUP_URL, {
        email: userData.email,
        password: userData.password,
        role: userData.role || "MASTER_ADMIN",
        is_active: true,
      });

      // Store user data locally as fallback
      const storedUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
      storedUsers.push({
        ...userData,
        id: response.data?.id || userData.id,
      });
      localStorage.setItem("registeredUsers", JSON.stringify(storedUsers));

      return response.data;
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
      // Throw error to be handled by the component
      throw error;
    }
  },

  recordLoginAttempt: async () => {},
  recordActivity: async () => {},
};
