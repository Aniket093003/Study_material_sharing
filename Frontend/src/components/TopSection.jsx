import React, { useState } from "react";
import UploadMaterial from "../Screens/UploadMaterial"; 

const HeroSection = () => {
  const [showUploadModal, setShowUploadModal] = useState(false); 

  const openUploadModal = () => setShowUploadModal(true);
  const closeUploadModal = () => setShowUploadModal(false);

  return (
    <div className="text-center py-12 bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Share and Explore Study Material</h1>
      <p className="text-lg mb-6">
        Discover PDFs across various categories or share your own materials with the community.
      </p>
      <button
        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
        onClick={openUploadModal} 
      >
        Upload Material
      </button>

      {showUploadModal && (
        <UploadMaterial closeModal={closeUploadModal} /> 
      )}
    </div>
  );
};

export default HeroSection;
