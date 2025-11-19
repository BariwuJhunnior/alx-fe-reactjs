import React, { useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="app-container">
      <h1>GitHub User Search</h1>

      {/* Later, we will put our SearchBar component here.
        It will update 'searchTerm'. */}

      <p>Search Input placeholder will go here.</p>

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
  );
}

export default App;
