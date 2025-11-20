// src/pages/users/Users.jsx

import React from "react";
import MainLayout from "../../layout/MainLayout";
import {
  FiUserPlus,
  FiKey,
  FiUserCheck,
  FiUsers,
  FiActivity,
  FiLogIn,
  FiList,
} from "react-icons/fi";
import FeatureCard from "../../components/FeatureCard";
import { useNavigate } from "react-router-dom";

const userFeatures = [
  {
    title: "User List",
    icon: <FiList className="text-blue-600 text-xl" />,
    link: "/users/list",
  },
  {
    title: "Add New User",
    icon: <FiUserPlus className="text-indigo-500 text-xl" />,
    link: "/users/add",
  },
  {
    title: "Reset User Password",
    icon: <FiKey className="text-yellow-500 text-xl" />,
    link: "/users/reset-password",
  },
  {
    title: "Activate / Deactivate User",
    icon: <FiUserCheck className="text-green-500 text-xl" />,
    link: "/users/toggle-status",
  },
  {
    title: "Assign User to Branch / Department",
    icon: <FiUsers className="text-blue-500 text-xl" />,
    link: "/users/assign",
  },
  {
    title: "View Login Attempts",
    icon: <FiLogIn className="text-pink-500 text-xl" />,
    link: "/users/login-attempts",
  },
  {
    title: "Track User Activity",
    icon: <FiActivity className="text-red-500 text-xl" />,
    link: "/users/activity",
  },
];

const Users = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      {/* PAGE HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <p className="text-gray-500 text-sm">
          Manage system users, permissions, login activity & security.
        </p>
      </div>

      {/* FEATURE PANEL */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-gray-700 text-sm font-bold tracking-wide mb-6 border-b pb-3">
          USER MANAGEMENT MODULE
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userFeatures.map((item, index) => (
            <FeatureCard
              key={index}
              title={item.title}
              icon={item.icon}
              onClick={() => navigate(item.link)}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Users;
