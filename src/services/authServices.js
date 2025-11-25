import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/token/";

export const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(API_URL, {
        email: email,
        password: password,
      });

      if (response.data?.access) {
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        localStorage.setItem("user_email", email);

        return { email };
      }

      return null;
    } catch (error) {
      console.log("Login Error:", error);
      return null;
    }
  },

  recordLoginAttempt: async () => {},
  recordActivity: async () => {},
};
