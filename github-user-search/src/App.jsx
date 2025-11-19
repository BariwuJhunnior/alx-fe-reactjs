import React, { useState } from "react";
import "./App.css";
import Search from "./components/Search";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchUserData } from "./services/githubService";

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

function SearchPage({ users, searchTerm, isLoading, error, handleSearch }) {
  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (error) {
    content = (
      <p style={{ color: "red" }}>
        Looks like we can't find the user or: {error}
      </p>
    );
  } else if (users) {
    content = <UserCard user={users} />;
  } else {
    content = <p>Start searching for a Github user!</p>;
  }

  return (
    <>
      <Search onSearch={handleSearch} />

      <main className="results-container">
        <h2>Search Result</h2>
      </main>
    </>
  );
}

function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (term) => {
    setSearchTerm(term);
    setError(null);
    setIsLoading(true);
    setUsers(null);
    try {
      const data = await fetchUserData(term);

      setUsers(data);
    } catch (error) {
      setError(error.message || "Failed to fetch user data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>GitHub User Search</h1>

      {/* Later, we will put our SearchBar component here.
        It will update 'searchTerm'. */}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <SearchPage
                users={users}
                searchTerm={searchTerm}
                handleSearch={handleSearch}
              />
            }
          />
          /
        </Routes>
      </BrowserRouter>

      <footer>
        <p>&copy; 2025 GitHub Search App</p>
      </footer>
    </div>
  );
}

export default App;
