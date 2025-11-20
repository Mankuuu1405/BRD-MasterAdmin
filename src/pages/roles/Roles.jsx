// src/pages/roles/Roles.jsx

import React from "react";
import MainLayout from "../../layout/MainLayout";
import {
  FiUserCheck,
  FiShield,
  FiCheckSquare,
} from "react-icons/fi";
import FeatureCard from "../../components/FeatureCard";
import { useNavigate } from "react-router-dom";

const roleFeatures = [
  {
    title: "Create Roles",
    icon: <FiUserCheck className="text-indigo-500 text-xl" />,
    subtitle: "Define new system roles",
    link: "/roles/create",
  },
  {
    title: "Set Permissions for Roles",
    icon: <FiShield className="text-yellow-500 text-xl" />,
    subtitle: "Configure access for each role",
    link: "/roles/set-permissions",
  },
  {
    title:
      "Assign Loan Permissions (Create, Approve, Edit, Docs, Download, Policies, Audit)",
    icon: <FiCheckSquare className="text-green-500 text-xl" />,
    subtitle: "Control loan-module operations",
    link: "/roles/assign-permissions",
  },
];

const Roles = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Role & Permission Management
        </h1>
        <p className="text-gray-500 text-sm">
          Create roles, configure system permissions, and manage access
          for all loan operations.
        </p>
      </div>

      {/* FEATURE CARD PANEL */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roleFeatures.map((item, index) => (
            <FeatureCard
              key={index}
              title={item.title}
              subtitle={item.subtitle}
              icon={item.icon}
              onClick={() => navigate(item.link)}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Roles;
