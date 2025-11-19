import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Dashboard from "./pages/Dashboard";
import Organization from "./pages/organization/Organization";
import AddOrganization from "./pages/organization/AddOrganization";
import CreateBranch from "./pages/organization/CreateBranch";
import Departments from "./pages/organization/Departments";
import AssignStaff from "./pages/organization/AssignStaff";
import ModuleAccess from "./pages/organization/ModuleAccess";
import ProtectedRoute from "./components/ProtectedRoute"; // we will create this
import Users from "./pages/Users/Users";
import AddUser from "./pages/Users/AddUser";
import ResetPassword from "./pages/Users/ResetPassword";
import ActivateDeactivate from "./pages/Users/ActivateDeactivate";
import AssignUser from "./pages/Users/AssignUser";
import UserActivity from "./pages/Users/UserActivity";
import LoginAttempts from "./pages/Users/LoginAttempts";

function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* DEFAULT ROUTE → Login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* PROTECTED ROUTE (only after login) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
          <Route
          path="/organizations"
          element={
            <ProtectedRoute>
              <Organization/>
            </ProtectedRoute>
          }
        />
        <Route path="/organization/add" element={<AddOrganization />} />
        <Route path="/organization/branches/create" element={<CreateBranch />} />
<Route path="/organization/departments" element={<Departments />} />
<Route path="/organization/staff-assign" element={<AssignStaff />} />
<Route path="/organization/module-access" element={<ModuleAccess />} />
<Route path="/users" element={<Users/>} />
<Route path="/users/add" element={<AddUser/>} />
<Route path="/users/reset-password" element={<ResetPassword/>} />
<Route path="/users/toggle-status" element={<ActivateDeactivate/>} />
<Route path="/users/assign" element={<AssignUser/>} />
<Route path="/users/login-attempts" element={<LoginAttempts/>} />
<Route path="/users/activity" element={<UserActivity/>} />

      </Routes>
    </Router>
  );
}

export default App;
