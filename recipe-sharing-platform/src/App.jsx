import React from "react";
import "./index.css";
import HomePage from "./components/HomePage";
import RecipeDetail from "./components/RecipeDetail";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddRecipeForm from "./components/AddRecipeForm";
import { useState, useEffect } from "react";
import initialRecipeData from "./data.json";

function App() {
  //Centralized State for all recipes
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //Load the initial data once on mount
  useEffect(() => {
    // Simulate loading time for better UX (can be removed if not needed)
    const loadData = async () => {
      setIsLoading(true);
      // Simulate async operation
      await new Promise((resolve) => setTimeout(resolve, 100));
      setRecipes(initialRecipeData);
      setIsLoading(false);
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<HomePage recipes={recipes} isLoading={isLoading} />}
          />
          <Route
            path="/recipe/:id"
            element={<RecipeDetail recipes={recipes} />}
          />
          <Route
            path="/add"
            element={<AddRecipeForm setRecipes={setRecipes} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
