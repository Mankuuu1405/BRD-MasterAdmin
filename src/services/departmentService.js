import { api } from "./api";

const BASE_URL = "/api/v1/tenants/departments/"; // Assuming this path

export const departmentService = {
  async getAll() {
    try {
      const res = await api.get(BASE_URL);
      return res.data;
    } catch (error) {
      return [];
    }
  },

  async add(payload) {
    try {
      const res = await api.post(BASE_URL, payload);
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  async remove(id) {
    try {
      await api.delete(`${BASE_URL}${id}/`);
      return true;
    } catch (error) {
      return false;
    }
  },
};