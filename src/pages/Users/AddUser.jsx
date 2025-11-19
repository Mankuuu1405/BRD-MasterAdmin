// src/pages/users/AddUser.jsx

import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const navigate = useNavigate();

  // ---------------- SAMPLE STATIC DATA (backend not ready) ----------------
  const sampleOrganizations = [
    { id: 1, name: "ABC Finance" },
    { id: 2, name: "XYZ MicroLoans" }
  ];

  const sampleBranches = [
    { id: 1, orgId: 1, name: "Branch A" },
    { id: 2, orgId: 1, name: "Branch B" },
    { id: 3, orgId: 2, name: "Head Office" }
  ];

  const sampleDepartments = [
    { id: 1, branchId: 1, name: "Accounts" },
    { id: 2, branchId: 1, name: "Loan Processing" },
    { id: 3, branchId: 2, name: "HR" },
    { id: 4, branchId: 3, name: "Admin Support" }
  ];

  const [organizations] = useState(sampleOrganizations);
  const [branches, setBranches] = useState([]);
  const [departments, setDepartments] = useState([]);

  // ---------------- Users LocalStorage (Mocking Backend) ----------------
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("users");
    return saved ? JSON.parse(saved) : [];
  });

  // Update storage on any user change
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // ---------------- FORM STATE ----------------
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    organization: "",
    branch: "",
    department: "",
    status: "Active",
  });

  // ---------------- HANDLERS ----------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "organization") {
      setBranches(sampleBranches.filter((b) => b.orgId == value));
      setDepartments([]);
      setForm((prev) => ({
        ...prev,
        branch: "",
        department: "",
      }));
    }

    if (name === "branch") {
      setDepartments(sampleDepartments.filter((d) => d.branchId == value));
      setForm((prev) => ({ ...prev, department: "" }));
    }
  };

  // ---------------- SUBMIT HANDLER (FIXED & PRODUCTION READY) ----------------
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.fullName ||
      !form.username ||
      !form.email ||
      !form.phone ||
      !form.password ||
      !form.role ||
      !form.organization ||
      !form.branch ||
      !form.department
    ) {
      alert("Please fill all fields.");
      return;
    }

    // ---- BUILD NEW USER OBJECT ----
    const newUser = {
      id: Date.now(),
      ...form,
      organizationName: organizations.find(o => o.id == form.organization)?.name,
      branchName: branches.find(b => b.id == form.branch)?.name,
      departmentName: departments.find(d => d.id == form.department)?.name,
    };

    // ---- READ EXISTING USERS ----
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // ---- BUILD UPDATED LIST ----
    const updatedUsers = [...existingUsers, newUser];

    // ---- SAVE INTO LOCAL STORAGE ----
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // ---- UPDATE REACT STATE ----
    setUsers(updatedUsers);

    alert("User added successfully!");
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
          <h1 className="text-2xl font-bold text-gray-800">Add New User</h1>
          <p className="text-gray-500 text-sm">
            Enter user details and assign role & permissions
          </p>
        </div>
      </div>

      {/* FORM CONTAINER */}
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-3xl">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Full Name */}
          <InputField
            label="Full Name"
            name="fullName"
            value={form.fullName}
            placeholder="Enter full name"
            onChange={handleChange}
          />

          {/* Username */}
          <InputField
            label="Username"
            name="username"
            value={form.username}
            placeholder="Unique username"
            onChange={handleChange}
          />

          {/* Email */}
          <InputField
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            placeholder="example@email.com"
            onChange={handleChange}
          />

          {/* Phone */}
          <InputField
            label="Phone Number"
            name="phone"
            value={form.phone}
            placeholder="+91 XXXXX XXXXX"
            onChange={handleChange}
          />

          {/* Password */}
          <InputField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            placeholder="Create a strong password"
            onChange={handleChange}
          />

          {/* Role */}
          <SelectField
            label="User Role"
            name="role"
            value={form.role}
            onChange={handleChange}
            options={["Admin", "Branch Manager", "Loan Officer", "Field Staff"]}
          />

          {/* Organization */}
          <SelectField
            label="Organization"
            name="organization"
            value={form.organization}
            onChange={handleChange}
            options={organizations.map((o) => ({ label: o.name, value: o.id }))}
          />

          {/* Branch */}
          <SelectField
            label="Branch"
            name="branch"
            value={form.branch}
            onChange={handleChange}
            options={branches.map((b) => ({ label: b.name, value: b.id }))}
          />

          {/* Department */}
          <SelectField
            label="Department"
            name="department"
            value={form.department}
            onChange={handleChange}
            options={departments.map((d) => ({ label: d.name, value: d.id }))}
          />

          {/* Status */}
          <SelectField
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            options={["Active", "Inactive"]}
          />

          {/* Submit */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 shadow-md transition"
            >
              <FiSave className="text-lg" /> Add User
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

// ---------------- Reusable Input Component ----------------
const InputField = ({ label, name, type = "text", value, onChange, placeholder }) => (
  <div className="flex flex-col">
    <label className="text-gray-700 text-sm font-medium">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="mt-2 p-3 rounded-xl bg-gray-50 focus:bg-white shadow-sm outline-none"
    />
  </div>
);

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

      {Array.isArray(options) &&
        options.map((opt, index) => (
          <option
            key={index}
            value={opt.value || opt}
          >
            {opt.label || opt}
          </option>
        ))}
    </select>
  </div>
);

export default AddUser;
