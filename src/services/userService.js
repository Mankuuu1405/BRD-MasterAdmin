// src/services/userService.js
import { api } from "./api";

const BASE_URL = "/api/v1/users/";

export const userService = {

  // GET ALL USERS
  async getUsers() {
    try {
      const res = await api.get(BASE_URL);
      return res.data.map(user => ({
        id: user.id, // Ensure ID matches backend
        name: user.first_name ? `${user.first_name} ${user.last_name}` : user.email,
        email: user.email,
        role: user.role,
        status: user.is_active ? "Active" : "Inactive",
        lastLogin: user.last_login || "Never",
        tenant: user.tenant
      }));
    } catch (error) {
      console.error("Fetch Users Error:", error);
      return [];
    }
  },

  // ADD NEW USER
  async addUser(userPayload) {
    try {
      const res = await api.post(BASE_URL, {
        email: userPayload.email,
        password: userPayload.password, // Backend needs password
        role: userPayload.role,
        phone: userPayload.phone,
        // Add other backend fields
      });
      return res.data;
    } catch (error) {
      console.error("Add User Error:", error);
      throw error;
    }
  },

  // UPDATE USER
  async updateUser(id, payload) {
    try {
      const res = await api.patch(`${BASE_URL}${id}/`, payload);
      return res.data;
    } catch (error) {
      console.error("Update User Error:", error);
      throw error;
    }
  },

  // TOGGLE STATUS (Active/Inactive)
  async toggleUserStatus(id, currentStatus) {
    const isActive = currentStatus === "Active";
    try {
      await api.patch(`${BASE_URL}${id}/`, { is_active: !isActive });
      return true;
    } catch (error) {
      console.error("Toggle Status Error:", error);
      return false;
    }
  },

  // DELETE USER
  async deleteUser(id) {
    try {
      await api.delete(`${BASE_URL}${id}/`);
      return true;
    } catch (error) {
      console.error("Delete User Error:", error);
      return false;
    }
  },

  // LOGIN ATTEMPTS (Requires Backend Implementation)
  async getLoginAttempts() {
    // If backend has /api/v1/audit-logs/
    return [];
  },

  async recordLoginAttempt(log) {
    // Optional: Send to backend analytics
    return true;
  },

  // USER ACTIVITY
  async getUserActivity() {
    // If backend has audit logs
    return [];
  },
};