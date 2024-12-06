import React, { useState } from "react";
import Navbar from "../components/Navbar";
import CategoryList from "../components/CategoryList";
import Footer from "../components/Footer";
import Material from "../components/Material";
import SignUp from "../Screens/SignUp";
import SignIn from "../Screens/SignIn";
import TopSection from "../components/TopSection";

const HomePage = () => {
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

  return (
    <div>
      <Navbar openSignUpModal={openSignUpModal} openSignInModal={openSignInModal} />
      <TopSection />
      <CategoryList />
      <Material />
      <Footer />

      {showSignUpModal && <SignUp closeModal={closeSignUpModal} />}

      {showSignInModal && <SignIn closeModal={closeSignInModal} />}
    </div>
  );
};

export default HomePage;
