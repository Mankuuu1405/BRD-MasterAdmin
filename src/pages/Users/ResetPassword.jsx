// src/pages/users/ResetPassword.jsx

import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiKey } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();

  // ---------------- USERS (LocalStorage as mock DB) ----------------
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("users");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedUser, setSelectedUser] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  // ---------------- HANDLERS ----------------

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedUser) {
      alert("Please select a user.");
      return;
    }

    if (!newPassword || !confirmPass) {
      alert("Please enter both password fields.");
      return;
    }

    if (newPassword !== confirmPass) {
      alert("Passwords do not match.");
      return;
    }

    const updated = users.map((u) =>
      u.id == selectedUser ? { ...u, password: newPassword } : u
    );

    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));

    alert("Password reset successfully!");
    navigate("/users");
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition shadow-sm"
        >
          <FiArrowLeft className="text-gray-700 text-xl" />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-800">Reset User Password</h1>
          <p className="text-gray-500 text-sm">
            Select a user and reset their password
          </p>
        </div>
      </div>

      {/* FORM CONTAINER */}
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-2xl">

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Select User */}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium">
              Select User
            </label>

            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="mt-2 p-3 rounded-xl bg-gray-50 focus:bg-white shadow-sm outline-none"
            >
              <option value="">Select a user</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.fullName} ({u.username})
                </option>
              ))}
            </select>
          </div>

          {/* New Password */}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium">
              New Password
            </label>

            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="mt-2 p-3 rounded-xl bg-gray-50 focus:bg-white shadow-sm outline-none"
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium">
              Confirm Password
            </label>

            <input
              type="password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              placeholder="Re-enter new password"
              className="mt-2 p-3 rounded-xl bg-gray-50 focus:bg-white shadow-sm outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 shadow-md transition"
          >
            <FiKey className="text-lg" /> Reset Password
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default ResetPassword;
