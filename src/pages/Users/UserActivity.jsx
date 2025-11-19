

import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiActivity, FiClock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const UserActivity = () => {
  const navigate = useNavigate();

  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem("userActivity");
    return saved ? JSON.parse(saved) : [];
  });

  return (
    <MainLayout>
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition shadow-sm"
        >
          <FiArrowLeft className="text-xl text-gray-700" />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-800">User Activity</h1>
          <p className="text-gray-500 text-sm">Track user actions & events</p>
        </div>
      </div>

      {/* ACTIVITY LIST */}
      <div className="bg-white p-8 rounded-2xl shadow-md">

        {activities.length === 0 ? (
          <p className="text-gray-500 text-center py-6">No user activity recorded.</p>
        ) : (
          <div className="space-y-5">
            {activities.map((a) => (
              <div
                key={a.id}
                className="p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <FiActivity className="text-blue-600 text-xl" />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">{a.action}</h3>

                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <FiClock /> {a.time}
                  </p>

                  <p className="text-xs text-gray-600 mt-1">
                    {a.user}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default UserActivity;
