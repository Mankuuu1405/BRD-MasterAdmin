// src/pages/users/ActivateDeactivate.jsx

import React, { useState, useEffect } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiToggleLeft, FiToggleRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ActivateDeactivate = () => {
  const navigate = useNavigate();

  // ---------------- USERS DATA (LocalStorage mock DB) ----------------
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("users");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // ---------------- TOGGLE USER STATUS ----------------
  const toggleStatus = (id) => {
    const updated = users.map((u) =>
      u.id === id ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" } : u
    );

    setUsers(updated);
  };

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
          <h1 className="text-2xl font-bold text-gray-800">
            Activate / Deactivate Users
          </h1>
          <p className="text-gray-500 text-sm">
            Enable or disable user accounts easily.
          </p>
        </div>
      </div>

      {/* CONTENT CARD */}
      <div className="bg-white p-8 rounded-2xl shadow-md">

        {users.length === 0 ? (
          <p className="text-gray-500 text-center">No users found.</p>
        ) : (
          <div className="space-y-4">

            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition cursor-pointer"
              >
                {/* LEFT SIDE USER INFO */}
                <div>
                  <h3 className="text-gray-800 font-semibold text-lg">
                    {user.fullName}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {user.username} • {user.role}
                  </p>

                  <p className="mt-1 text-xs text-gray-600">
                    {user.organizationName} → {user.branchName} →{" "}
                    {user.departmentName}
                  </p>
                </div>

                {/* STATUS + BUTTON */}
                <div className="flex items-center gap-4">

                  <span
                    className={`px-3 py-1 text-xs rounded-full 
                      ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                  >
                    {user.status}
                  </span>

                  {user.status === "Active" ? (
                    <button
                      onClick={() => toggleStatus(user.id)}
                      className="p-3 bg-red-100 rounded-full hover:bg-red-200 transition"
                    >
                      <FiToggleLeft className="text-red-600 text-2xl" />
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleStatus(user.id)}
                      className="p-3 bg-green-100 rounded-full hover:bg-green-200 transition"
                    >
                      <FiToggleRight className="text-green-600 text-2xl" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ActivateDeactivate;
