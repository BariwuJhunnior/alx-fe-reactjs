import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RecipeList from "./components/RecipeList";
import AddRecipeForm from "./components/AddRecipeForm";
import RecipeDetails from "./components/RecipeDetails";
import SearchBar from "./components/SearchBar";
import RecommendationsList from "./components/RecommendationsList";
import FavoritesList from "./components/FavoritesList";

function App() {
  return (
    <Router>
      <div className="app">
        <h1>Recipe Sharing App</h1>
        <SearchBar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <AddRecipeForm />
                <RecommendationsList />
                <RecipeList />
              </>
            }
          />
          <Route path="/recipes/:recipeId" element={<RecipeDetails />} />
          <Route path="/favorites" element={<FavoritesList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
