import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import CategoryList from "../components/CategoryList";
import Footer from "../components/Footer";
import UploadMaterial from "../components/UploadMaterial"; // Updated import
import SignUp from "../Screens/SignUp";
import SignIn from "../Screens/SignIn";
import TopSection from "../components/TopSection";
import MaterialCard from "../components/MaterialCard"; // Component for displaying uploaded materials

const HomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("userToken") // Check token in localStorage
  );
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false); // For upload material modal
  const [userMaterials, setUserMaterials] = useState([]); // State for user's uploaded materials
  const [error, setError] = useState(null);

  // Handle Sign-Up modal
  const openSignUpModal = () => setShowSignUpModal(true);
  const closeSignUpModal = () => setShowSignUpModal(false);

  // Handle Sign-In modal
  const openSignInModal = () => setShowSignInModal(true);
  const closeSignInModal = () => setShowSignInModal(false);

  // Handle Upload Material modal
  const openUploadModal = () => setShowUploadModal(true);
  const closeUploadModal = () => setShowUploadModal(false);

  // Handle Login
  const handleLogin = (token) => {
    localStorage.setItem("userToken", token); // Store token
    setIsAuthenticated(true); // Update auth state
    closeSignInModal(); // Close the modal
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("userToken"); // Remove token
    setIsAuthenticated(false); // Update auth state
  };

  // Fetch User Materials
  const fetchUserMaterials = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.get("http://localhost:4000/api/material/get", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserMaterials(response.data); // Store materials in state
    } catch (err) {
      setError("Failed to fetch user materials. Please try again.");
    }
  };

  // Fetch materials on mount and after login
  useEffect(() => {
    if (isAuthenticated) {
      fetchUserMaterials();
    }
  }, [isAuthenticated]);

  return (
    <div>
      <Navbar
        isAuthenticated={isAuthenticated}
        openSignUpModal={openSignUpModal}
        openSignInModal={openSignInModal}
        handleLogout={handleLogout}
        openUploadModal={openUploadModal} // Add upload modal toggle
      />
      <TopSection />
      <CategoryList />

      {/* Show user's uploaded materials */}
      <div className="px-4 py-6">
        <h2 className="text-2xl font-bold mb-4">My Uploaded Materials</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userMaterials.map((material) => (
            <MaterialCard key={material._id} material={material} /> // Use MaterialCard for display
          ))}
        </div>
      </div>

      <Footer />

      {/* Modals */}
      {showSignUpModal && <SignUp closeModal={closeSignUpModal} />}
      {showSignInModal && <SignIn handleLogin={handleLogin} closeModal={closeSignInModal} />}
      {showUploadModal && (
        <UploadMaterial
          closeModal={closeUploadModal}
          fetchUserMaterials={fetchUserMaterials} // Re-fetch materials after uploading
        />
      )}
    </div>
  );
};

export default HomePage;
