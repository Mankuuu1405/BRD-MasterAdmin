import { api } from "./api";

const BASE_URL = "/api/v1/tenants/branches/";

export const branchService = {

  // GET ALL BRANCHES
  async getBranches() {
    try {
      const res = await api.get(BASE_URL);
      return res.data;
    } catch (error) {
      console.error("Fetch Branches Error:", error);
      return [];
    }
  },

  // GET BRANCHES BY ORGANIZATION
  async getBranchesByOrg(orgId) {
    try {
      const res = await api.get(BASE_URL, { tenant: orgId });
      return res.data;
    } catch (error) {
      return [];
    }
  },

  // ADD NEW BRANCH
 async addBranch(data) {
  try {
    const res = await api.post(BASE_URL, data);
    return res.data;
  } catch (err) {
    console.error("Add Branch Error:", err.response?.data || err);
    throw err;
  }
}
,

  // UPDATE BRANCH
  async updateBranch(id, updatedValues) {
    try {
      const res = await api.patch(`${BASE_URL}${id}/`, updatedValues);
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  // DELETE BRANCH
  async deleteBranch(id) {
    try {
      await api.delete(`${BASE_URL}${id}/`);
      return true;
    } catch (error) {
      return false;
    }
  },
};