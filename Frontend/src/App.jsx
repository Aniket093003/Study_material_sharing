import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./home/Home";
import SignUp from "./Screens/SignUp";
import SignIn from "./Screens/SignIn";
const App = () => {
  
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
