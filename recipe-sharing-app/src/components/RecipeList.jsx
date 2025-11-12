import { Link } from "react-router-dom";
import useRecipeStore from "./recipeStore";

const RecipeList = () => {
  const allRecipesEmpty = useRecipeStore((state) => state.recipes.length === 0);
  const recipes = useRecipeStore((state) => state.filteredRecipes);
  const toggleFavorite = useRecipeStore((state) => state.toggleFavorite);
  const favorites = useRecipeStore((state) => state.favorites);

  return (
    <div className="recipe-list">
      <h2>All Recipes</h2>
      {allRecipesEmpty ? (
        <p>No recipes yet. Add one to get started!</p>
      ) : recipes.length === 0 ? (
        <p>No recipes match your search.</p>
      ) : (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id} className="recipe-item">
              <Link to={`/recipes/${recipe.id}`}>
                <h3>{recipe.title}</h3>
                <p>{recipe.description}</p>
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
                {favorites.includes(recipe.id) ? "♥" : "♡"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecipeList;
