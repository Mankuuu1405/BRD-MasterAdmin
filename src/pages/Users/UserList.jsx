// src/pages/users/UserList.jsx

import React, { useMemo, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import {
  FiArrowLeft,
  FiSearch,
  FiTrash2,
  FiEdit3,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../hooks/useUsers";

const UserList = () => {
  const navigate = useNavigate();
  const { users, loading, reload } = useUsers();

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // FILTER USERS
const filteredUsers = useMemo(() => {
  return users.filter((u) => {
    // ❌ Skip MASTER_ADMIN completely
    if (u.role === "MASTER_ADMIN") return false;

    const q = search.toLowerCase();

    const matchesSearch =
      !q ||
      u.email?.toLowerCase().includes(q) ||
      u.phone?.toLowerCase().includes(q) ||
      (u.role || "").toLowerCase().includes(q);

    const matchesRole =
      roleFilter === "ALL" ||
      (u.role || "").toLowerCase() === roleFilter.toLowerCase();

    const matchesStatus =
      statusFilter === "ALL" ||
      (u.is_active ? "active" : "inactive") === statusFilter.toLowerCase();

    return matchesSearch && matchesRole && matchesStatus;
  });
}, [users, search, roleFilter, statusFilter]);


  // DELETE USER
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    await userService.deleteUser(id);
    reload();
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 shadow-sm transition"
          >
            <FiArrowLeft className="text-gray-700 text-xl" />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-gray-800">User List</h1>
            <p className="text-gray-500 text-sm">
              View and manage all registered users.
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/users/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 shadow-sm"
        >
          + Add New User
        </button>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white p-4 rounded-2xl shadow-sm mb-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        {/* Search */}
        <div className="flex items-center gap-2 w-full md:max-w-md">
          <FiSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by email, phone or role..."
            className="flex-1 bg-gray-50 rounded-xl px-3 py-2 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-gray-50 text-sm outline-none"
          >
            <option value="ALL">All Roles</option>
            <option value="ADMIN">Admin</option>
            <option value="BRANCH_MANAGER">Branch Manager</option>
            <option value="LOAN_OFFICER">Loan Officer</option>
            <option value="FIELD_STAFF">Field Staff</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-gray-50 text-sm outline-none"
          >
            <option value="ALL">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* USER LIST */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        {loading ? (
          <p className="text-gray-500 text-center py-8 text-sm">
            Loading users...
          </p>
        ) : filteredUsers.length === 0 ? (
          <p className="text-gray-500 text-center py-8 text-sm">
            No users found.
          </p>
        ) : (
          <div className="space-y-3">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition"
              >
                {/* LEFT SECTION */}
                <div>
                  <p className="font-semibold text-gray-800">{user.email}</p>
                  <p className="text-gray-500 text-xs mt-1">
                    {user.phone || "No phone"}
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    Role: {user.role || "Not Set"}
                  </p>
                </div>

                {/* RIGHT SECTION */}
                <div className="flex items-center gap-3 justify-between md:justify-end">
                  
                  {/* Status Badge */}
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      user.is_active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {user.is_active ? "Active" : "Inactive"}
                  </span>

                  {/* Edit Button */}
                  <button
                   onClick={() => navigate(`/users/edit/${user.id}`)}
                    className="p-2 rounded-full bg-blue-200 hover:bg-blue-200 transition"
                  ><FiEdit3 />
                    
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition"
                  >
                    <FiTrash2 className="text-red-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default UserList;
