import { useState } from "react";
import { useParams } from "react-router-dom";
import useRecipeStore from "./recipeStore";
import EditRecipeForm from "./EditrecipeForm";
import DeleteRecipeButton from "./DeleteRecipeButton";

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const [isEditing, setIsEditing] = useState(false);

  const recipe = useRecipeStore((state) =>
    state.recipes.find((recipe) => recipe.id === parseInt(recipeId))
  );
  const toggleFavorite = useRecipeStore((state) => state.toggleFavorite);
  const favorites = useRecipeStore((state) => state.favorites);

  if (!recipe) {
    return (
      <div>
        <p>Recipe not found.</p>
      </div>
    );
  }

  const isFavorited = favorites.includes(recipe.id);

  return (
    <div className="recipe-details">
      {isEditing ? (
        <EditRecipeForm recipe={recipe} onClose={() => setIsEditing(false)} />
      ) : (
        <>
          <h1>{recipe.title}</h1>
          <p>{recipe.description}</p>
          {recipe.ingredients && Array.isArray(recipe.ingredients) && (
            <div className="ingredients">
              <h3>Ingredients:</h3>
              <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
          )}
          {recipe.cookingTime && (
            <p className="cooking-time">
              ⏱️ Cooking Time: {recipe.cookingTime} minutes
            </p>
          )}
          <div className="recipe-actions">
            <button
              className={`favorite-btn ${isFavorited ? "favorited" : ""}`}
              onClick={() => toggleFavorite(recipe.id)}
            >
              {isFavorited ? "♥" : "♡"}{" "}
              {isFavorited ? "Remove from Favorites" : "Add to Favorites"}
            </button>
            <button onClick={() => setIsEditing(true)}>Edit Recipe</button>
            <DeleteRecipeButton recipeId={recipe.id} />
          </div>
        </>
      )}
    </div>
  );
};

export default RecipeDetails;
