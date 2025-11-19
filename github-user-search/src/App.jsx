import React, { useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [users, setUsers] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const styles = {
    height: "30px",
    width: "400px",
    padding: "5px",
    borderRadius: "10px",
    border: "none",
    marginBottom: "10px",
  };

  const searchInputStylesCont = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <h1>GitHub User Search</h1>

        {/* Later, we will put our SearchBar component here.
        It will update 'searchTerm'. */}

        <div style={searchInputStylesCont}>
          <input type="text" placeholder="Enter Search Term" style={styles} />
          <button>Search</button>
        </div>

        <main className="results-container">
          <h2>Results ({users.length} found)</h2>
          {/* Later, we will map over the 'users' array and display a UserCard for each user. */}

          {users.length === 0 ? (
            <p>Start searching for a GitHub user!</p>
          ) : (
            <p>Displaying user cards...</p>
          )}
        </main>

        <footer>
          <p>&copy; 2025 GitHub Search App</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
