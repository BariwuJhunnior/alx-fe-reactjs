import React, { useState } from "react";
import "./App.css";
import Search from "./components/Search";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchUserData } from "./services/githubService";
import UserCard from "./components/UserCard";

function SearchPage({
  users,
  isLoading,
  error,
  handleSearch,
  totalCount,
  handleLoadMore,
}) {
  //Renders the list of UserCard components
  const userList = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );

  //Conditional rendering logic for results section
  let content;

  if (isLoading && users.length === 0) {
    content = <p className="text-center text-lg mt-8">Loading...</p>;
  } else if (error) {
    content = <p className="text-center text-red-500 mt-8">Error: {error}</p>;
  } else if (users.length > 0) {
    content = userList;
  } else if (!isLoading && totalCount === 0) {
    //Only show this if a search has been attempted(i.e., totalCount is 0 after a search)
    content = (
      <p className="text-center text-gray-500 mt-8">
        No users found matching your criteria.
      </p>
    );
  } else {
    content = (
      <p className="text-center text-gray-500 mt-8">
        Start your advanced search above!
      </p>
    );
  }

  //Determine if the "Load More" button should be visible
  const showLoadMore = users.length > 0 && users.length < totalCount;

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
  const [currentPage, setCurrentPage] = useState(1);
  const [lastSearchParams, setLastSearchParams] = useState({});
  const [totalCount, setTotalCount] = useState(0);

  const handleSearch = async (searchParams, page = 1) => {
    setSearchTerm(searchParams);
    setError(null);
    setIsLoading(true);
    setUsers(null);

    if (page === 1) {
      setLastSearchParams(searchParams);
      setUsers([]); //Clear previous results only on a new search
      setCurrentPage(1);
    }

    try {
      const data = await fetchUserData(searchParams, page);

      //Update the results: append new results if loading more
      setUsers((prevUsers) =>
        page === 1 ? data.items : [...prevUsers, ...data.items]
      );

      //Save the total number of users found
      setTotalCount(data.total_count);
      setCurrentPage(page);
    } catch (error) {
      setError(error.message || "Failed to fetch user data");
    } finally {
      setIsLoading(false);
    }
  };

  //NEW FUNCTION for the "Load More" button
  const handleLoadMore = () => {
    //Search again using the last saved parameters, incrementing the page number
    handleSearch(lastSearchParams, currentPage + 1);
  };

  return (
    <div className="app-container">
      <h1>GitHub User Search</h1>

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <SearchPage
                users={users}
                isLoading={isLoading}
                error={error}
                totalCount={totalCount} //Pass Count down
                currentPage={currentPage}
                searchTerm={searchTerm}
                handleSearch={handleSearch}
                handleLoadMore={handleLoadMore} //Pass load more handler down
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
