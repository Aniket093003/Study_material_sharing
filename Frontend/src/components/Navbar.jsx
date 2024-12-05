import React from "react";

const Navbar = () => {
  return (
    <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold cursor-pointer">Material Share</h1>
      <div className="flex items-center gap-4">
        <button className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-200">
          Sign In
        </button>
        <button className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-200">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Navbar;
