import { Link } from "react-router-dom";
import useRecipeStore from "./recipeStore";

const FavoritesList = () => {
  const favorites = useRecipeStore((state) =>
    state.favorites.map((id) =>
      state.recipes.find((recipe) => recipe.id === id)
    )
  );
  const toggleFavorite = useRecipeStore((state) => state.toggleFavorite);

  return (
    <div className="favorites-list">
      <h2>My Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorite recipes yet. Add some to see them here!</p>
      ) : (
        <ul>
          {favorites.map((recipe) => (
            <li key={recipe.id}>
              <Link to={`/recipes/${recipe.id}`}>
                <h3>{recipe.title}</h3>
                <p>{recipe.description}</p>
              </Link>
              <button
                className="remove-favorite-btn"
                onClick={() => toggleFavorite(recipe.id)}
              >
                ♥ Remove from Favorites
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesList;
