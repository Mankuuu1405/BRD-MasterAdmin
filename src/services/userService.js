import { api } from "./api";

// LOCALSTORAGE fallback logic
const getLocal = (key) => JSON.parse(localStorage.getItem(key)) || [];
const setLocal = (key, data) => localStorage.setItem(key, JSON.stringify(data));

export const userService = {

  // GET ALL USERS
  async getUsers() {
    // For now: get from localStorage
    return getLocal("users");

    // Later backend:
    // return api.get("/users/");
  },

  // CREATE NEW USER
  async addUser(user) {
    const users = getLocal("users");
    const updated = [...users, user];
    setLocal("users", updated);

    return user; // mimic API response
    // Later: return api.post("/users/", user);
  },

  // UPDATE USER
  async updateUser(id, payload) {
    const users = getLocal("users");
    const updated = users.map((u) => (u.id === id ? { ...u, ...payload } : u));
    setLocal("users", updated);

    return updated.find((u) => u.id === id);
    // Later: api.put(`/users/${id}/`, payload);
  },

  // DELETE USER
  async deleteUser(id) {
    const filtered = getLocal("users").filter((u) => u.id !== id);
    setLocal("users", filtered);

    return true;
    // Later: api.delete(`/users/${id}/`);
  },

  // LOGIN ATTEMPTS
  async recordLoginAttempt(log) {
    const logs = getLocal("loginAttempts");
    const updated = [log, ...logs];
    setLocal("loginAttempts", updated);
  },

  async getLoginAttempts() {
    return getLocal("loginAttempts");
    // Later: api.get("/users/login-attempts/");
  },

  // USER ACTIVITY LOG
  async recordActivity(log) {
    const logs = getLocal("userActivity");
    const updated = [log, ...logs];
    setLocal("userActivity", updated);
  },

  async getUserActivity() {
    return getLocal("userActivity");
    // Later: api.get("/users/activity/");
  },
};
