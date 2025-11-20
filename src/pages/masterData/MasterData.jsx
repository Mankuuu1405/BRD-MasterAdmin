// src/pages/masterData/MasterData.jsx
import React from "react";
import MainLayout from "../../layout/MainLayout";
import { FiList, FiPercent, FiFileText, FiBarChart2 } from "react-icons/fi";
import FeatureCard from "../../components/FeatureCard";
import { useNavigate } from "react-router-dom";

const items = [
  {
    title: "Define Loan Product Types",
    icon: <FiList className="text-blue-600 text-xl" />,
    link: "/master/loan-products", // FIXED
  },
  {
    title: "Set Interest Settings (ROI, Fees, Penalty)",
    icon: <FiPercent className="text-green-600 text-xl" />,
    link: "/master/interest-settings", // FIXED
  },
  {
    title: "Create Document Templates",
    icon: <FiFileText className="text-purple-600 text-xl" />,
    link: "/master/document-template", // FIXED
  },
  {
    title: "Set Credit Scoring Rules",
    icon: <FiBarChart2 className="text-orange-600 text-xl" />,
    link: "/master/credit-scoring", // FIXED
  },
];

const MasterData = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-black">Data Configuration</h1>
        <p className="text-gray-500 text-sm">
          Configure loan products, interest settings, templates & scoring rules.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <FeatureCard
              key={i}
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

export default MasterData;
