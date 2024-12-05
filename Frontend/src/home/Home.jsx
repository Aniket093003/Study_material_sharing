import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CategoryList from "../components/CategoryList";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryList />
      <Footer />
    </div>
  );
};

export default HomePage;
