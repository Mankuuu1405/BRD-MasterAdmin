import React from "react";
import MainLayout from "../layout/MainLayout";
import { IoWarningOutline } from "react-icons/io5";
import { HiExclamationTriangle } from "react-icons/hi2";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import LoanTrendChart from "../components/LoanTrendChart";
import ActiveUserChart from "../components/ActiveUserChart";

const Dashboard = () => {
  const cards = [
    { title: "Total Organizations", value: 12 },
    { title: "Total Branches", value: 48 },
    { title: "Active Users", value: 230 },
    { title: "Active & Pending Loans", value: 102 },
    { title: "Daily Disbursement", value: "₹1,54,000" },
    { title: "API Status", value: "All Good" },
    { title: "Recent Activities", value: "View Logs →" },
    { title: "Alerts", value: "3 Critical" },
  ];

  // 📊 Line Chart Data (Loan Trend)
  const loanTrendData = [
    { month: "Jan", loans: 50 },
    { month: "Feb", loans: 75 },
    { month: "Mar", loans: 60 },
    { month: "Apr", loans: 90 },
    { month: "May", loans: 120 },
    { month: "Jun", loans: 140 },
  ];

  // 📊 Bar Chart Data (Active Users Per Branch)
  const usersPerBranch = [
    { branch: "Branch A", users: 45 },
    { branch: "Branch B", users: 70 },
    { branch: "Branch C", users: 55 },
    { branch: "Branch D", users: 90 },
  ];

  return (
    <MainLayout>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow hover:shadow-xl transition border-l-6 border-blue-600"
          >
            <h3 className="text-gray-600 text-md">{card.title}</h3>
            <p className="text-3xl font-bold text-[#] mt-3">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* CHARTS SECTION */}
      <div className="flex flex-col  gap-8 mb-10">

          {/* Active Users per Branch */}
       <ActiveUserChart/>
        {/* Loan Trend Line Chart */}  
       <LoanTrendChart/>
       

      
      </div>

      {/* BOTTOM PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">

        {/* Recent Activities */}
      <div className="bg-white rounded-xl p-6 shadow border h-[340px] flex flex-col">
  <h2 className="text-lg font-semibold mb-4 text-gray-700">
    Recent Activities
  </h2>

  {/* Activity List */}
  <div className="space-y-4 overflow-y-auto pr-2">
    
    {/* Item 1 */}
    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg border hover:bg-gray-100 transition">
      <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full">
        <span className="text-blue-600 text-xl">👤</span>
      </div>
      <div>
        <p className="text-gray-800 text-sm">
          <strong>John</strong> added a new loan request.
        </p>
        <p className="text-xs text-gray-500 mt-1">5 minutes ago</p>
      </div>
    </div>

    {/* Item 2 */}
    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg border hover:bg-gray-100 transition">
      <div className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-full">
        <span className="text-green-600 text-xl">⚙️</span>
      </div>
      <div>
        <p className="text-gray-800 text-sm">
          System performed an <strong>API health check</strong>.
        </p>
        <p className="text-xs text-gray-500 mt-1">12 minutes ago</p>
      </div>
    </div>

    {/* Item 3 */}
    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg border hover:bg-gray-100 transition">
      <div className="w-10 h-10 flex items-center justify-center bg-yellow-100 rounded-full">
        <span className="text-yellow-600 text-xl">📝</span>
      </div>
      <div>
        <p className="text-gray-800 text-sm">
          Admin updated <strong>interest rate policy</strong>.
        </p>
        <p className="text-xs text-gray-500 mt-1">30 minutes ago</p>
      </div>
    </div>

    {/* Item 4 */}
    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg border hover:bg-gray-100 transition">
      <div className="w-10 h-10 flex items-center justify-center bg-red-100 rounded-full">
        <span className="text-red-600 text-xl">🔔</span>
      </div>
      <div>
        <p className="text-gray-800 text-sm">
          A <strong>critical alert</strong> was raised for loan server.
        </p>
        <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
      </div>
    </div>

  </div>
</div>


        {/* Alerts */}


<div className="bg-white rounded-xl p-6 shadow border h-[340px] flex flex-col">
  <h2 className="text-lg font-semibold mb-4 text-gray-700">
    Alerts
  </h2>

  <div className="space-y-4 overflow-y-auto pr-2">

    {/* CRITICAL ALERT */}
    <div className="flex items-start space-x-3 p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition">
      <div className="w-10 h-10 flex items-center justify-center bg-red-100 rounded-full">
        <HiExclamationTriangle className="text-red-600 text-2xl" />
      </div>
      <div>
        <p className="text-red-700 font-medium">
          API latency increased
        </p>
        <p className="text-xs text-red-500 mt-1">
          Critical • 5 minutes ago
        </p>
      </div>
    </div>

    {/* WARNING ALERT */}
    <div className="flex items-start space-x-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100 transition">
      <div className="w-10 h-10 flex items-center justify-center bg-yellow-100 rounded-full">
        <IoWarningOutline className="text-yellow-600 text-2xl" />
      </div>
      <div>
        <p className="text-yellow-700 font-medium">
          Loan approval queue pending
        </p>
        <p className="text-xs text-yellow-500 mt-1">
          Warning • 20 minutes ago
        </p>
      </div>
    </div>

    {/* INFO ALERT */}
    <div className="flex items-start space-x-3 p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition">
      <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full">
        <IoWarningOutline className="text-blue-600 text-2xl" />
      </div>
      <div>
        <p className="text-blue-700 font-medium">
          System running normally
        </p>
        <p className="text-xs text-blue-500 mt-1">
          Info • 1 hour ago
        </p>
      </div>
    </div>

  </div>
</div>


      </div>

    </MainLayout>
  );
};

export default Dashboard;
