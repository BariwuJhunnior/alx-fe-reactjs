import Navbar from "./components/Navbar.jsx";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home.jsx";
import Services from "./components/Services.jsx";
import Contact from "./components/Contact.jsx";
import About from "./components/About.jsx";
import Footer from "./components/Footer.jsx";

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
