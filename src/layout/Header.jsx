import React from "react";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div className="w-full h-20 bg-white shadow flex justify-between items-center px-6 sticky top-0 left-0 z-10">
      <h1 className="text-xl font-semibold ">Dashboard Overview</h1>

      <div className="flex items-center space-x-3">
        <span className="text-gray-600">{user?.firstName}</span>
        <div className="w-10 h-10 rounded-full bg-[#0079CD] text-white flex items-center justify-center">
          {user?.firstName?.charAt(0)}
        </div>
      </div>
    </div>
  );
};

export default Header;
