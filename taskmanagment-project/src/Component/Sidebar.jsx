import React from 'react';
import { NavLink } from "react-router-dom";
import { FaTasks, FaCheckCircle, FaClock, FaSpinner, FaPlusCircle, FaBars, FaChartLine, FaRegUserCircle } from "react-icons/fa";

const Sidebar = () => {
  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 py-3 px-4 rounded-lg text-lg font-semibold transition-all duration-300 ${
      isActive
        ? "bg-purple-700 text-white"
        : "text-white hover:bg-purple-600 hover:text-white"
    }`;

  return (
    <div className="bg-purple-500 text-white w-full min-h-screen p-6 rounded-r-2xl shadow-lg">
      <h2 className="text-2xl font-semibold flex items-center gap-3 mb-8">
        <FaTasks className="text-3xl" /> Task Manager
      </h2>
      <nav className="space-y-4">
        <NavLink to="/dashboard/profile" className={linkClasses}>
          <FaRegUserCircle className="text-xl" /> My Profile
        </NavLink>
        {/* Add New Task */}
        <NavLink to="/dashboard/add" className={linkClasses}>
          <FaPlusCircle className="text-xl" /> Add New Task
        </NavLink>

        {/* In Progress Tasks Section */}
        <NavLink to="/dashboard/Alltasks" className={linkClasses}>
          <FaSpinner className="text-xl" /> All Tasks
        </NavLink>

        {/* Stats or Task Management Stats */}
        <NavLink to="/" className={linkClasses}>
          <FaChartLine className="text-xl" /> Home
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
