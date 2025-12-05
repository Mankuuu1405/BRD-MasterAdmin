import { api } from "./api";

const BASE_URL = "/api/v1/tenants/";

export const organizationService = {
  
  // ADD NEW ORGANIZATION
  async addOrganization(payload) {
    try {
      const res = await api.post(BASE_URL, payload);
      return res.data;
    } catch (error) {
      console.error("Add Org Error:", error);
      throw error;
    }
  },

  // GET ALL ORGANIZATIONS
  async getOrganizations() {
    try {
      const res = await api.get(BASE_URL);
      return res.data;
    } catch (error) {
      console.error("Fetch Org Error:", error);
      return [];
    }
  },

  // SUMMARY STATS FOR DASHBOARD
  async getOrganizationSummary() {
    try {
      // Trying to fetch real summary if endpoint exists, else calculate from list
      const res = await api.get("/api/v1/dashboard/full"); 
      const kpis = res.data?.kpis || {};
      
      return {
        totalOrganizations: kpis.totalTenants || 0,
        totalBranches: kpis.totalBranches || 0,
        activeUsers: kpis.activeUsers || 0,
        pendingRequests: 0,
      };
    } catch (error) {
      return { totalOrganizations: 0, totalBranches: 0, activeUsers: 0, pendingRequests: 0 };
    }
  },
};