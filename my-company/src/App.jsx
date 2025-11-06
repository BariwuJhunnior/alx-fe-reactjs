import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Services from "./components/Services";
import Contact from "./components/Contact";
import About from "./components/About";
import Footer from "./components/Footer";

import React from "react";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          /* Catch-All for unknown routes */
          <Route path="*" element={<h1>Page Not Found!</h1>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
