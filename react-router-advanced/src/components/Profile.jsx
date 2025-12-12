import React from "react";
import { Outlet, Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Profile = () => {
  return (
    <div>
      <h1>User Profile Dashboard</h1>

      {/* Nested Navigation Links */}
      <div>
        {/* Link to /Profile (Index Route: ProfileDetails) */}
        <nav>
          <strong style={{ display: "block" }}>Profile Sections: </strong>
          <Link to="/profile" style={{ margin: "0 10px" }}>
            Details (Index)
          </Link>

          {/* Lint to /Profile/settings */}
          <Link to="settings" style={{ margin: "0 10px" }}>
            Settings
          </Link>

          {/* Example of Dynamic Link */}
          <Link to="23" style={{ margin: "0 10px" }}>
            Dynamic Profile (ID 23)
          </Link>

          {/* Link to Home Page */}
          <Link to="/" style={{ margin: "0 10px" }}>
            Home
          </Link>
        </nav>
      </div>

      {/* =================================
        2. NESTED CONTENT RENDERED HERE
        =================================
        The content of ProfileDetails or ProfileSettings will appear below.
      */}
      <Outlet />

      <footer>Alx @2025</footer>
    </div>
  );
};

export default Profile;
