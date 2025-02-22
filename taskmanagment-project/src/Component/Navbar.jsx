import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTasks, FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false); 

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  return (
    <nav className="z-10 fixed top-0 w-full bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-700 text-white py-4 px-6 flex justify-between items-center shadow-md">
      {/* Logo */}
      <NavLink to="/" className="flex items-center space-x-2">
        <FaTasks className="text-2xl" />
        <span className="text-2xl font-bold">TaskFlow</span>
      </NavLink>

      {/* Desktop Navigation */}
      <div className="space-x-6 hidden md:flex">
        {user && (
          <>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-orange-500 text-lg font-semibold" : "hover:text-gray-300 text-lg text-white"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "text-orange-500 text-lg font-semibold" : "hover:text-gray-300 text-lg text-white"
              }
            >
              Dashboard
            </NavLink>
          </>
        )}
      </div>

      {/* Auth Buttons & User Info */}
      <div className="hidden md:flex items-center space-x-4">
        {user ? (
          <div className="flex items-center space-x-4">
            {/* User Profile Image */}
            {user.photoURL && (
              <img src={user.photoURL} alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
            )}
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <NavLink
              to="/login"
              className="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold hover:bg-gray-100"
              
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className= "bg-white text-blue-600 px-4 py-2 rounded-full font-semibold hover:bg-gray-100"
              
            >
              Sign Up
            </NavLink>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-white text-2xl focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-16 right-0 w-64 bg-gray-100 text-white flex flex-col items-center py-4 shadow-md md:hidden">
          {user && (
            <>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-orange-500 text-lg font-semibold py-2" : "hover:text-black py-2 text-lg"
                }
                onClick={() => setIsOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? "text-orange-500 text-lg font-semibold py-2" : " font-smibold text-black py-2 text-lg"
                }
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </NavLink>
            </>
          )}

          {user ? (
            <div className="flex flex-col items-center space-y-4 mt-4">
              {user.photoURL && (
                <img src={user.photoURL} alt="User" className="w-12 h-12 rounded-full border-2 border-white" />
              )}
              <button
                onClick={handleLogout}
                className="bg-gray-900 text-white px-4 py-2 rounded-full font-semibold "
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <NavLink
                to="/login"
                className="bg-gray-900 text-white mb-2 px-4 py-2 rounded-full font-semibold"
                onClick={() => setIsOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
               className="bg-gray-900 text-white px-4 py-2 rounded-full font-semibold"
                
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
