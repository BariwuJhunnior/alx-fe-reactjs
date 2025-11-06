import Navbar from "./Components/Navbar.jsx";
import { Routes, Route } from "react-router-dom";

import Home from "./Components/Home";
import Services from "./Components/Services";
import Contact from "./Components/Contact";
import About from "./Components/About";
import Footer from "./Components/Footer";

import React from "react";

function App() {
  return (
    <>
      <main>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          /* Catch-All for unknown routes */
          <Route path="*" element={<h1>Page Not Found!</h1>} />
        </Routes>
        <Footer />
      </main>
    </>
  );
}

export default App;
