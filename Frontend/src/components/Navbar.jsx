import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isAuthenticated, handleLogout, openSignUpModal, openSignInModal }) => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Study Material Sharing
        </Link>
        <div className="flex items-center">
          {isAuthenticated && (
            <Link
              to="/my-library"
              className="text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              My Library
            </Link>
          )}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 px-6 py-2 rounded-md hover:bg-blue-100 ml-4"
            >
              Sign Out
            </button>
          ) : (
            <>
              <button
                onClick={openSignInModal}
                className="bg-white text-blue-600 px-6 py-2 rounded-md hover:bg-blue-100 ml-4"
              >
                Sign In
              </button>
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
