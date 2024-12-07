import React, { useState } from "react";
import Navbar from "../components/Navbar";
import CategoryList from "../components/CategoryList";
import Footer from "../components/Footer";
import Material from "../components/Material";
import SignUp from "../Screens/SignUp";
import SignIn from "../Screens/SignIn";
import TopSection from "../components/TopSection";

const HomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("userToken") // Check token in localStorage
  );
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  const openSignUpModal = () => {
    setShowSignUpModal(true);
  };

  const closeSignUpModal = () => {
    setShowSignUpModal(false);
  };

  const openSignInModal = () => {
    setShowSignInModal(true);
  };

  const closeSignInModal = () => {
    setShowSignInModal(false);
  };

  const handleLogin = (token) => {
    localStorage.setItem("userToken", token); // Store token
    setIsAuthenticated(true); // Update auth state
    closeSignInModal(); // Close the modal
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken"); // Remove token
    setIsAuthenticated(false); // Update auth state
  };

  return (
    <div>
      <Navbar
        isAuthenticated={isAuthenticated}
        openSignUpModal={openSignUpModal}
        openSignInModal={openSignInModal}
        handleLogout={handleLogout}
      />
      <TopSection />
      <CategoryList />
      <Material />
      <Footer />
      {showSignUpModal && <SignUp closeModal={closeSignUpModal} />}
      {showSignInModal && <SignIn handleLogin={handleLogin} closeModal={closeSignInModal} />}
    </div>
  );
};

export default HomePage;
