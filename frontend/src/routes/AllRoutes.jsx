import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AllRoutes() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Archive" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default AllRoutes;
