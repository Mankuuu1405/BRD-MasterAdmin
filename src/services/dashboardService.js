import { api } from "./api"; // Ensure api.js uses axiosInstance

export const dashboardService = {
  
  // 1. DASHBOARD CARDS
  async getSummaryCards() {
    try {
      const res = await api.get("/api/v1/dashboard/full");
      const data = res.data?.kpis || {};
      
      return {
        totalOrganizations: data.totalTenants || 0,
        totalBranches: data.totalBranches || 0, 
        activeUsers: data.activeUsers || 0,
        activeLoans: data.totalLoans || 0,
        dailyDisbursement: data.disbursedAmount || "₹0",
        apiStatus: "Online",
        alerts: 0,
      };
    } catch (error) {
      console.error("Dashboard KPI Error:", error);
      return {
        totalOrganizations: 0, totalBranches: 0, activeUsers: 0,
        activeLoans: 0, dailyDisbursement: "₹0", apiStatus: "Error", alerts: 0
      };
    }
  },

  // 2. LOAN TREND CHART (Graph)
  async getLoanTrends() {
    try {
      const res = await api.get("/api/v1/dashboard/full");
      // Backend response example: { charts: { monthlyDisbursement: [{ month: 'Jan', amount: 5000 }] } }
      const chartData = res.data?.charts?.monthlyDisbursement || [];
      
      // Ensure data format matches Recharts expectation
      return chartData.map(item => ({
        month: item.month,
        amount: item.amount
      }));
    } catch (error) {
      console.error("Graph Error:", error);
      return [];
    }
  },

  // 3. USERS PER BRANCH
  async getUsersPerBranch() {
    // Placeholder until branch API is ready
    return []; 
  },

  // 4. RECENT ACTIVITIES
  async getActivities() {
    try {
      const res = await api.get("/api/v1/dashboard/full");
      return res.data?.charts?.recentActivity || [];
    } catch (error) {
      return [];
    }
  },

  // 5. ALERTS
  async getAlerts() {
    return [];
  },
};