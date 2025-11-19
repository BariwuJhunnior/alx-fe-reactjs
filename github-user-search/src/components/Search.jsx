import React, { useState } from "react";

function UserCard({ user }) {
  if (!user) {
    return null;
  }

  return (
    <div className="user-card">
      <img
        src={user.avartar_url}
        alt={`${user.login}'s avatar`}
        style={{ width: "100px", height: "100px", borderRadius: "50%" }}
      />

      <h3>{user.name || user.login} </h3>
      <p>
        <a href={user.html_url} target="_blank" rel="noopener noreferrer">
          View GitHub Profile
        </a>
      </p>
      {
        {
          /* We could add more details here later */
        }
      }
    </div>
  );
}

function Search({ onSearch }) {
  // 1. State to manage the text typed into the input field
  const [username, SetUsername] = useState("");

  // Update the 'username' state every time a key is pressed
  const handleInputChange = (event) => {
    SetUsername(event.target.value);
  };

  // 3. Handler for when the form is submitted
  const handleSubmit = (event) => {
    event.preventDefault();

    //Check if input is not empty
    if (username.trim()) {
      //Call the function passed down from the parent(App.jsx) and pass the current search term to it.
      onSearch(username);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        placeholder="enter GitHub username (e.g., octocat"
        value={username}
        style={{ height: "30px" }}
      />

      <button type="submit">Search</button>
    </form>
  );
}

export default Search;
