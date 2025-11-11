<<<<<<< HEAD:my-company/src/Components/Navbar.jsx
import React from "react";
import { useLocation } from "react-router-dom";

function Navbar() {
  const { pathname } = useLocation();
  const isActive = (to) => (pathname === to ? "active" : "");

  return (
    <nav
      className="navbar"
      style={{
        backgroundColor: "skyblue",
        display: "flex",
        justifyContent: "spaceBetween",
      }}
    >
      <div className="brand">MySite</div>
      <ul className="navlinks">
        <li>
          <Link className={isActive("/")} to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className={isActive("/about")} to="/about">
            About
          </Link>
        </li>
        <li>
          <Link className={isActive("/services")} to="/services">
            Services
          </Link>
        </li>
        <li>
          <Link className={isActive("/contact")} to="/contact">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
=======
import React from "react";
import { useLocation } from "react-router-dom";

function Navbar() {
  const { pathname } = useLocation();
  const isActive = (to) => (pathname === to ? "active" : "");

  return (
    <nav
      className="navbar"
      style={{
        backgroundColor: "skyblue",
        display: "flex",
        justifyContent: "spaceBetween",
      }}
    >
      <div className="brand">MySite</div>
      <ul className="navlinks">
        <li>
          <Link className={isActive("/")} to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className={isActive("/about")} to="/about">
            About
          </Link>
        </li>
        <li>
          <Link className={isActive("/services")} to="/services">
            Services
          </Link>
        </li>
        <li>
          <Link className={isActive("/contact")} to="/contact">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
>>>>>>> f209e5fc1246d85cb8b890e58eac190a06f7c8e9:my-company/src/components/Navbar.jsx
