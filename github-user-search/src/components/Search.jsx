import { useState } from "react";
import axios from "axios";

// Access the environment variable (must be done in this file now)
const GITHUB_API_BASE_URL = import.meta.env.VITE_APP_GITHUB_API_BASE_URL;

// --- Helper Component (kept inside for simplicity, still bad practice) ---
function UserCard({ user }) {
  if (!user) return null;

  // Display logic is contained right here
  return (
    <div className="user-card">
      <img
        src={user.avatar_url}
        alt={`${user.login}'s avatar`}
        className="user-avatar"
        style={{ width: "100px", height: "100px", borderRadius: "50%" }}
      />
      <h3>{user.name || user.login}</h3>
      <p>
        <a href={user.html_url} target="_blank" rel="noopener noreferrer">
          View GitHub Profile
        </a>
      </p>
    </div>
  );
}

// ----------------------------------------------------------------------
// THE MAIN COMPONENT HANDLING EVERYTHING
// ----------------------------------------------------------------------

function Search() {
  // 1. State for the input field (Search's responsibility)
  const [searchTerm, setSearchTerm] = useState("");

  // 2. State for the API response (App's original responsibility)
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 3. API Call Logic (githubService's original responsibility)
  const fetchUserData = async (username) => {
    setError(null);
    setIsLoading(true);
    setUser(null);

    const url = `${GITHUB_API_BASE_URL}/users/${username}`;

    try {
      const response = await axios.get(url);
      setUser(response.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("Looks like we cant find the user.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 4. Form Submission Handler (Search's original responsibility)
  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      // Trigger the internal API function
      fetchUserData(searchTerm);
    }
  };

  // 5. Conditional Rendering Logic (SearchPage's original responsibility)
  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (error) {
    content = <p style={{ color: "red" }}>{error}</p>;
  } else if (user) {
    content = <UserCard user={user} />;
  } else {
    content = <p>Start searching for a GitHub user!</p>;
  }

  // 6. The return statement combines the form and the display area
  return (
    <div className="search-app-container">
      {/* Input Form */}
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Enter GitHub username (e.g., octocat)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "300px",
            padding: "10px",
            borderRadius: "10px",
            border: "none",
          }}
        />
        <button type="submit">Search</button>
      </form>

      {/* Results Display */}
      <main className="results-container">
        <h2>Search Result</h2>
        {content}
      </main>
    </div>
  );
}

export default Search;
