import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ padding: "20px", background: "gray", color: "white" }}>
      <h1>Welcome to the Home Page</h1>
      <p>This is the main landing page of the application.</p>
      <nav>
        <Link to="/" style={{ color: "white", padding: "5px" }}>
          Home
        </Link>
        <Link to="/profile" style={{ color: "white", padding: "5px" }}>
          Profile
        </Link>
        <Link to="/register" style={{ color: "white", padding: "5px" }}>
          Register
        </Link>
      </nav>
    </div>
  );
}

export default Home;
