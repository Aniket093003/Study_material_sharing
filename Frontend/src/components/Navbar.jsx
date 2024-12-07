import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isAuthenticated, handleLogout, openSignUpModal, openSignInModal }) => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-xl font-bold">
          Study Material Sharing
        </Link>
        
        {/* Buttons */}
        <div className="flex items-center">
          {isAuthenticated ? (
            <>
              {/* "My Library" Button */}
              <Link
                to="/my-library"
                className="ml-4 bg-white text-blue-600 px-6 py-2 rounded-md hover:bg-blue-100"
              >
                My Library
              </Link>
              
              {/* Sign Out Button */}
              <button
                onClick={handleLogout}
                className="ml-4 bg-white text-blue-600 px-6 py-2 rounded-md hover:bg-blue-100"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              {/* Sign In Button */}
              <button
                onClick={openSignInModal}
                className="bg-white text-blue-600 px-6 py-2 rounded-md hover:bg-blue-100"
              >
                Sign In
              </button>

              {/* Sign Up Button */}
              <button
                onClick={openSignUpModal}
                className="ml-4 bg-white text-blue-600 px-6 py-2 rounded-md hover:bg-blue-100"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
