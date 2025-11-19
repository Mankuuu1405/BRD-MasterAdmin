// src/pages/users/LoginAttempts.jsx

import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiCheckCircle, FiXCircle, FiClock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const LoginAttempts = () => {
  const navigate = useNavigate();

  // Fetch attempts from localStorage (mock backend)
  const [attempts, setAttempts] = useState(() => {
    const saved = localStorage.getItem("loginAttempts");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState("All");

  // FILTER LOGS
  const filteredAttempts =
    filter === "All"
      ? attempts
      : attempts.filter((a) => a.status === filter);

  return (
    <MainLayout>
      {/* PAGE HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition shadow-sm"
        >
          <FiArrowLeft className="text-xl text-gray-700" />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-800">Login Attempts</h1>
          <p className="text-gray-500 text-sm">Track all user login activity</p>
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex gap-3 mb-5">
        {["All", "Success", "Failed"].map((btn) => (
          <button
            key={btn}
            onClick={() => setFilter(btn)}
            className={`px-4 py-2 rounded-xl text-sm font-medium shadow 
              ${filter === btn ? "bg-blue-600 text-white" : "bg-gray-50"}`}
          >
            {btn}
          </button>
        ))}
      </div>

      {/* LIST CARD */}
      <div className="bg-white p-8 rounded-2xl shadow-md">
        {filteredAttempts.length === 0 ? (
          <p className="text-gray-500 text-center py-6">No login attempts found.</p>
        ) : (
          <div className="space-y-4">
            {filteredAttempts.map((a) => (
              <div
                key={a.id}
                className="p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition flex justify-between items-center"
              >
                <div>
                  <h3 className="text-gray-800 font-semibold">
                    {a.username}
                  </h3>

                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <FiClock /> {a.time}
                  </p>

                  <p className="text-xs mt-1 text-gray-600">
                    IP: {a.ip}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium 
                    ${
                      a.status === "Success"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                >
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default LoginAttempts;
