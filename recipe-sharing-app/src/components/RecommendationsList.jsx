import { useEffect } from "react";
import { Link } from "react-router-dom";
import useRecipeStore from "./recipeStore";

const RecommendationsList = () => {
  const recommendations = useRecipeStore((state) => state.recommendations);
  const generateRecommendations = useRecipeStore(
    (state) => state.generateRecommendations
  );
  const toggleFavorite = useRecipeStore((state) => state.toggleFavorite);
  const favorites = useRecipeStore((state) => state.favorites);

  // Generate recommendations when component mounts or recipes/favorites change
  useEffect(() => {
    generateRecommendations();
  }, [generateRecommendations]);

  if (recommendations.length === 0) {
    return (
      <div className="recommendations-list">
        <h2>Recommended for You</h2>
        <p>Add some favorite recipes to get personalized recommendations!</p>
      </div>
    );
  }

  return (
    <div className="recommendations-list">
      <h2>Recommended for You</h2>
      <p className="recommendations-subtitle">Based on your favorite recipes</p>
      <ul>
        {recommendations.map((recipe) => (
          <li key={recipe.id} className="recommendation-item">
            <Link to={`/recipes/${recipe.id}`}>
              <h3>{recipe.title}</h3>
              <p className="description">{recipe.description}</p>
              {recipe.cookingTime && (
                <p className="cooking-time">⏱️ {recipe.cookingTime} mins</p>
              )}
              {recipe.ingredients && Array.isArray(recipe.ingredients) && (
                <p className="ingredients">
                  📦 Ingredients: {recipe.ingredients.join(", ")}
                </p>
              )}
            </Link>
            <button
              className={`favorite-btn ${
                favorites.includes(recipe.id) ? "favorited" : ""
              }`}
              onClick={() => toggleFavorite(recipe.id)}
              title={
                favorites.includes(recipe.id)
                  ? "Remove from favorites"
                  : "Add to favorites"
              }
            >
              {favorites.includes(recipe.id) ? "♥" : "♡"} Favorite
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendationsList;
