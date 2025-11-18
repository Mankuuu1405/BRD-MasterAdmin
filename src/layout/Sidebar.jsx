import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-[#0079CD] text-white fixed left-0 top-0 shadow-lg">
      <div className="p-6 font-bold text-2xl">Master-Admin</div>

      <nav className="mt-4 space-y-2">
        <Link to="/dashboard" className="block px-6 py-3 hover:bg-white hover:text-[#0079CD]">
          Dashboard
        </Link>
        <Link to="/organizations" className="block px-6 py-3 hover:bg-white hover:text-[#0079CD] ">
          Organizations
        </Link>
        <Link to="/users" className="block px-6 py-3 hover:bg-white hover:text-blue-600">
          Users
        </Link>
        <Link to="/roles" className="block px-6 py-3 hover:bg-white hover:text-blue-600">
          Roles
        </Link>
        <Link to="/reports" className="block px-6 py-3 hover:bg-white hover:text-blue-600">
          Reports
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
