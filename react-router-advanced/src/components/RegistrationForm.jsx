import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function RegistrationForm() {
  return (
    <div>
      <Link to="/">Home</Link>

      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "50px",
        }}
      >
        Register
      </h1>

      <form
        action="#"
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "10px",
          gap: "7px",
          height: "50vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <label htmlFor="name">Name: </label>
        <input type="text" id="name" placeholder="Name" />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" placeholder="Email" />

        <label htmlFor="password">Password: </label>
        <input type="password" placeholder="Password" id="password" />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default RegistrationForm;
