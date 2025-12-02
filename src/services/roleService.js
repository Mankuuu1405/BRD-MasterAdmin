import { api } from "./api";

const BASE_URL = "/api/v1/adminpanel/role-masters/";

export const roleService = {

  // GET ALL ROLES
  async getRoles() {
    try {
      const res = await api.get(BASE_URL);
      return res.data.map(r => ({
        id: r.id,
        roleName: r.name,
        description: r.description,
        createdAt: r.created_at
      }));
    } catch (error) {
      console.error("Fetch Roles Error:", error);
      return [];
    }
  },

  // ADD ROLE
  async addRole(roleName) {
    try {
      const res = await api.post(BASE_URL, { name: roleName });
      return {
        id: res.data.id,
        roleName: res.data.name,
        createdAt: res.data.created_at
      };
    } catch (error) {
      throw error;
    }
  },

  // SAVE PERMISSIONS
  async savePermissions(roleId, permissions) {
    // Backend endpoint needed for permissions. 
    // Assuming a custom action or separate endpoint.
    try {
      await api.post(`${BASE_URL}${roleId}/permissions/`, { permissions });
      return true;
    } catch (error) {
      console.warn("Permission save API not implemented on backend yet");
      return false;
    }
  },

  // GET PERMISSIONS
  async getPermissions(roleId) {
    try {
      const res = await api.get(`${BASE_URL}${roleId}/permissions/`);
      return res.data;
    } catch (error) {
      return {};
    }
  },

  // DELETE ROLE
  async deleteRole(roleId) {
    try {
      await api.delete(`${BASE_URL}${roleId}/`);
      return true;
    } catch (error) {
      return false;
    }
  }
};