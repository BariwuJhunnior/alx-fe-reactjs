import React, { useState } from "react";

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
