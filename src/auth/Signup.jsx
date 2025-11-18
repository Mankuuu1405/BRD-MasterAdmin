import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Password match check
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Get existing users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];

    // Check email already exists
    const isEmailExists = storedUsers.some(
      (user) => user.email === formData.email
    );

    if (isEmailExists) {
      alert("This email is already registered. Please login.");
      return;
    }

    // Create new user object
    const newUser = {
      id: Date.now(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      role: "MASTER_ADMIN"
    };

    storedUsers.push(newUser);

    // Save updated list
    localStorage.setItem("registeredUsers", JSON.stringify(storedUsers));

    alert("Account created successfully!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">

        {/* Header */}
        <h2 className="text-3xl font-semibold text-blue-600 mb-1">
          Create account
        </h2>
        <p className="text-gray-500 mb-6">
          Make the most of your professional life
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* First Name */}
          <div>
            <label className="block mb-1 font-medium">First name</label>
            <input
              type="text"
              name="firstName"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter first name"
              required
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block mb-1 font-medium">Last name</label>
            <input
              type="text"
              name="lastName"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter last name"
              required
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">Password (8+ characters)</label>
            <input
              type="password"
              name="password"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Create password"
              required
              minLength={8}
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 font-medium">Confirm password</label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Confirm password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {/* Terms */}
          <div className="flex items-start space-x-2">
            <input type="checkbox" required className="mt-1" />
            <p className="text-gray-600 text-sm">
              I agree to the{" "}
              <span className="text-blue-600 cursor-pointer">
                Xpertland.ai agreements
              </span>{" "}
              and privacy statement.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Agree and create account
          </button>
        </form>

        {/* Switch to login */}
        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </p>

      </div>
    </div>
  );
};

export default Signup;
