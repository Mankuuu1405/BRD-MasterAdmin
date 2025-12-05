import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiGrid,
  FiUsers,
  FiKey,

  FiBarChart2,
  FiLogOut,
} from "react-icons/fi";

const Sidebar = () => {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/signup";
  };

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path);

  const menuItemStyle = (path) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-lg transition-all
     ${
       isActive(path)
         ? "bg-[#E8F1FF] text-[#0A66FF] font-medium"
         : "text-gray-700 hover:bg-gray-100"
     }`;

  return (
    <div className="w-64 h-screen bg-white fixed left-0 top-0 flex flex-col justify-between">

      {/* Title */}
      <div>
        <div className="p-8 flex items-center gap-3">
          
          <span className="text-2xl font-semibold text-gray-900">
            Master Admin
          </span>
        </div>

        {/* MENU */}
        <nav className="px-3 mt-1 space-y-1">

          <Link to="/dashboard" className={menuItemStyle("/dashboard")}>
            <FiHome size={18} /> Home
          </Link>

          <Link to="/organizations" className={menuItemStyle("/organizations")}>
            <FiGrid size={18} /> Organizations
          </Link>

          <Link to="/users" className={menuItemStyle("/users")}>
            <FiUsers size={18} /> Users
          </Link>

          <Link to="/roles" className={menuItemStyle("/roles")}>
            <FiKey size={18} /> Roles
          </Link>


          <Link to="/reports" className={menuItemStyle("/reports")}>
            <FiBarChart2 size={18} /> Reports
          </Link>
           <Link to="/audit" className={menuItemStyle("/audit")}>
            <FiBarChart2 size={18} /> Audit
          </Link>
           <Link to="/subscription" className={menuItemStyle("/audit")}>
            <FiBarChart2 size={18} /> subscription
          </Link>

        </nav>
      </div>

      {/* Logout */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-red-600 hover:bg-red-50 transition"
        >
          <FiLogOut size={18} /> Logout
        </button>
      </div>

    </div>
  );
};

export default Sidebar;
