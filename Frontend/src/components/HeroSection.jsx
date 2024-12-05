import React from "react";

const HeroSection = () => {
  return (
    <div className="text-center py-12 bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Share and Explore Study Material</h1>
      <p className="text-lg mb-6">
        Discover PDFs across various categories or share your own materials with the community.
      </p>
      <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
        Upload Material
      </button>
    </div>
  );
};

export default HeroSection;
