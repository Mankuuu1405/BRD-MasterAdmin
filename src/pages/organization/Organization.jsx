import React from "react";
import MainLayout from "../../layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { organizationService } from "../../services/organizationService";
import useOrganizations from "../../hooks/useOrganization";
import {
  FiPlusCircle,
  FiMapPin,
  FiLayers,
  FiUserCheck,
  FiKey,
} from "react-icons/fi";



// Reusable Card Component
const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-xl p-6 shadow hover:shadow-xl transition border-l-6 border-blue-600">
    <h3 className="text-gray-600 text-md">{title}</h3>
    <p className="text-3xl font-bold mt-3 text-gray-900">{value}</p>
  </div>
);

// Feature Card Component
const FeatureCard = ({ title, icon, onClick }) => (
  <div
    onClick={onClick}
    className="w-full bg-white rounded-xl p-4 flex items-center space-x-4 
               hover:shadow-lg transition cursor-pointer"
  >
    <div className="w-14 h-14 flex items-center justify-center bg-gray-100 
                    rounded-lg border">
      {icon}
    </div>
    <h3 className="text-gray-800 text-base font-semibold">{title}</h3>
  </div>
);

const Organization = () => {
  const navigate = useNavigate();

  // Fetch summary
  const { data: summary, loading } = useOrganizations(
    organizationService.getOrganizationSummary
  );

  const orgFeatures = [
    {
      title: "Add New Organization",
      icon: <FiPlusCircle className="text-indigo-500 text-xl" />,
      onClick: () => navigate("/organization/add"),
    },
    {
      title: "Create Branches",
      icon: <FiMapPin className="text-green-500 text-xl" />,
      onClick: () => navigate("/organization/branches/create"),
    },
    {
      title: "Define Departments",
      icon: <FiLayers className="text-yellow-500 text-xl" />,
      onClick: () => navigate("/organization/departments"),
    },
    {
      title: "Assign Staff to Departments",
      icon: <FiUserCheck className="text-blue-500 text-xl" />,
      onClick: () => navigate("/organization/staff-assign"),
    },
    {
      title: "Assign Module Access to Branch",
      icon: <FiKey className="text-red-500 text-xl" />,
      onClick: () => navigate("/organization/module-access"),
    },
  ];

  if (loading) {
    return (
      <MainLayout>
        <p className="text-gray-600 p-10">Loading organization data...</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Organization Management
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage organizations, branches, departments, staff & module access.
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <StatCard title="Total Organizations" value={summary.totalOrganizations} />
        <StatCard title="Total Branches" value={summary.totalBranches} />
        <StatCard title="Departments" value={summary.departments} />
        <StatCard title="Staff Assigned" value={summary.staffAssigned} />
        <StatCard title="Modules Assigned" value={summary.modulesAssigned} />
        <StatCard title="Pending Requests" value={summary.pendingRequests} />
      </div>

      {/* FEATURE MODULES */}
      <div className="rounded-2xl p-6 bg-white shadow-sm">
        <h2 className="text-gray-700 text-sm font-bold tracking-wide mb-6 border-b pb-3">
          ORGANIZATION AND BRANCH MANAGEMENT
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orgFeatures.map((f, i) => (
            <FeatureCard key={i} title={f.title} icon={f.icon} onClick={f.onClick} />
          ))}
        </div>
      </div>

    </MainLayout>
  );
};

export default Organization;
