import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authServices";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { email, password } = formData;

    // Try login
    const user = await authService.login(email, password);

    if (!user) {
      await authService.recordLoginAttempt({
        email,
        status: "Failed"
      });

      alert("Invalid email or password!");
      setLoading(false);
      return;
    }

    // Record success login attempt
    await authService.recordLoginAttempt({
      email,
      status: "Success"
    });

    // Record activity
    await authService.recordActivity("Logged in", user.email);

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">

        {/* Header */}
        <h2 className="text-3xl font-semibold text-blue-600 mb-1">
          Sign in
        </h2>
        <p className="text-gray-500 mb-6">
          to continue to your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email address</label>
            <input
              type="email"
              name="email"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          No account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Create one!
          </a>
        </p>

      </div>
    </div>
  );
};

export default Login;
