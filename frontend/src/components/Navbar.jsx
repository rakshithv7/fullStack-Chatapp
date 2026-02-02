import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import logo from "../logo.jpg";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();

  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      
      {/* LOGO */}
      <Link to="/" className="flex items-center">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-base-100 flex items-center justify-center">
          <img
            src={logo}
            alt="Company Logo"
            className="w-full h-full object-cover"
          />
        </div>
      </Link>

      <div className="flex-1"></div>

      {/* NAV LINKS */}
      <div className="flex gap-2">
        {authUser ? (
          <>
            <Link to="/profile" className="btn btn-ghost">
              Profile
            </Link>
            <button onClick={logout} className="btn btn-ghost">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
            <Link to="/signup" className="btn btn-secondary">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
