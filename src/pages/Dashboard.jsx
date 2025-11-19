import React from "react";
import MainLayout from "../layout/MainLayout";

import ActiveUserChart from "../components/ActiveUserChart";
import LoanTrendChart from "../components/LoanTrendChart";
import ReactiveActivity from "../components/RecentActivity";
import AlertsPage from "../components/AlertsPage";

import useDashboard from "../hooks/useDashboard";
import { dashboardService } from "../services/dashboardService";

const Dashboard = () => {

  // Fetch dashboard summary
  const { data: cards, loading: loadingCards } = useDashboard(
    dashboardService.getSummaryCards
  );

  const { data: loanTrendData } = useDashboard(
    dashboardService.getLoanTrends
  );

  const { data: usersPerBranch } = useDashboard(
    dashboardService.getUsersPerBranch
  );

  const { data: activities } = useDashboard(
    dashboardService.getActivities,
    []
  );

  const { data: alerts } = useDashboard(
    dashboardService.getAlerts,
    []
  );

  if (loadingCards) {
    return (
      <MainLayout>
        <div className="p-10 text-gray-600">Loading dashboard...</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        <Card title="Total Organizations" value={cards.totalOrganizations} />
        <Card title="Total Branches" value={cards.totalBranches} />
        <Card title="Active Users" value={cards.activeUsers} />
        <Card title="Active & Pending Loans" value={cards.activeLoans} />
        <Card title="Daily Disbursement" value={cards.dailyDisbursement} />
        <Card title="API Status" value={cards.apiStatus} />
        <Card title="Recent Activities" value="View Logs →" />
        <Card title="Alerts" value={`${cards.alerts} Critical`} />

      </div>

      {/* CHARTS SECTION */}
      <div className="flex flex-col gap-8 mb-10">
        <ActiveUserChart usersPerBranch={usersPerBranch} />
        <LoanTrendChart data={loanTrendData} />
      </div>

      {/* BOTTOM PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <ReactiveActivity activities={activities} />
        <AlertsPage alerts={alerts} />
      </div>

    </MainLayout>
  );
};

// Reusable Card Component
const Card = ({ title, value }) => (
  <div className="bg-white rounded-xl p-6 shadow hover:shadow-xl transition border-l-6 border-blue-600">
    <h3 className="text-gray-600 text-md">{title}</h3>
    <p className="text-3xl font-bold text-gray-900 mt-3">{value}</p>
  </div>
);

export default Dashboard;
