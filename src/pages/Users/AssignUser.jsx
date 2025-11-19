// src/pages/users/AssignUser.jsx

import React, { useState, useEffect } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const AssignUser = () => {
  const navigate = useNavigate();

  // ---------------- FETCH USERS (localStorage Mock) ----------------
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("users");
    return saved ? JSON.parse(saved) : [];
  });

  // ---------------- STATIC DATA ----------------
  const organizations = [
    { id: 1, name: "ABC Finance" },
    { id: 2, name: "XYZ MicroLoans" },
  ];

  const branches = [
    { id: 1, orgId: 1, name: "Branch A" },
    { id: 2, orgId: 1, name: "Branch B" },
    { id: 3, orgId: 2, name: "Head Office" },
  ];

  const departments = [
    { id: 1, branchId: 1, name: "Accounts" },
    { id: 2, branchId: 1, name: "Loan Processing" },
    { id: 3, branchId: 2, name: "HR" },
    { id: 4, branchId: 3, name: "Admin Support" },
  ];

  // ---------------- FORM STATE ----------------
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedOrg, setSelectedOrg] = useState("");
  const [filteredBranches, setFilteredBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  // ---------------- UPDATING BRANCHES WHEN ORG CHANGES ----------------
  const handleOrgChange = (e) => {
    const orgId = e.target.value;
    setSelectedOrg(orgId);

    setFilteredBranches(branches.filter((b) => b.orgId == orgId));
    setSelectedBranch("");
    setFilteredDepartments([]);
    setSelectedDepartment("");
  };

  // ---------------- UPDATING DEPARTMENTS WHEN BRANCH CHANGES ----------------
  const handleBranchChange = (e) => {
    const branchId = e.target.value;
    setSelectedBranch(branchId);

    setFilteredDepartments(departments.filter((d) => d.branchId == branchId));
    setSelectedDepartment("");
  };

  // ---------------- ASSIGN USER ----------------
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedUser) return alert("Please select a user.");
    if (!selectedOrg || !selectedBranch || !selectedDepartment)
      return alert("Please select organization, branch & department.");

    const updatedUsers = users.map((u) =>
      u.id == selectedUser
        ? {
            ...u,
            organization: selectedOrg,
            organizationName: organizations.find((o) => o.id == selectedOrg)?.name,
            branch: selectedBranch,
            branchName: filteredBranches.find((b) => b.id == selectedBranch)?.name,
            department: selectedDepartment,
            departmentName: filteredDepartments.find((d) => d.id == selectedDepartment)?.name,
          }
        : u
    );

    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    alert("User assigned successfully!");
    navigate("/users");
  };

  return (
    <MainLayout>
      {/* PAGE HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition shadow-sm"
        >
          <FiArrowLeft className="text-gray-700 text-xl" />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-800">Assign User</h1>
          <p className="text-gray-500 text-sm">Assign user to branch and department</p>
        </div>
      </div>

      {/* FORM CARD */}
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-3xl">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          
          {/* Select User */}
          <SelectField
            label="Select User"
            name="user"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            options={users.map((u) => ({
              label: `${u.fullName} (${u.username})`,
              value: u.id,
            }))}
          />

          {/* Select Organization */}
          <SelectField
            label="Organization"
            name="organization"
            value={selectedOrg}
            onChange={handleOrgChange}
            options={organizations.map((o) => ({ label: o.name, value: o.id }))}
          />

          {/* Select Branch */}
          <SelectField
            label="Branch"
            name="branch"
            value={selectedBranch}
            onChange={handleBranchChange}
            options={filteredBranches.map((b) => ({ label: b.name, value: b.id }))}
          />

          {/* Select Department */}
          <SelectField
            label="Department"
            name="department"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            options={filteredDepartments.map((d) => ({ label: d.name, value: d.id }))}
          />

          {/* Submit */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 shadow-md transition"
            >
              <FiCheckCircle className="text-lg" /> Assign User
            </button>
          </div>

        </form>
      </div>

      {/* ASSIGNED USERS LIST */}
      <div className="mt-10 bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Assigned Users</h2>

        {users.length === 0 ? (
          <p className="text-gray-500">No users available.</p>
        ) : (
          <div className="space-y-4">
            {users.map((u) => (
              <div
                key={u.id}
                className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
              >
                <h3 className="font-semibold text-gray-800 text-lg">{u.fullName}</h3>
                <p className="text-sm text-gray-500">{u.role}</p>

                <p className="text-xs text-gray-600 mt-1">
                  {u.organizationName ? (
                    <>
                      <strong>{u.organizationName}</strong> →{" "}
                      <strong>{u.branchName}</strong> →{" "}
                      <strong>{u.departmentName}</strong>
                    </>
                  ) : (
                    "Not assigned yet"
                  )}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

// ---------------- Reusable Select Component ----------------
const SelectField = ({ label, name, value, onChange, options }) => (
  <div className="flex flex-col">
    <label className="text-gray-700 text-sm font-medium">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="mt-2 p-3 rounded-xl bg-gray-50 shadow-sm outline-none"
    >
      <option value="">Select {label}</option>
      {options.map((opt, index) => (
        <option key={index} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default AssignUser;
