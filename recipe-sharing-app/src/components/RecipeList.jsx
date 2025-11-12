import { Link } from "react-router-dom";
import useRecipeStore from "./recipeStore";

const RecipeList = () => {
  const allRecipesEmpty = useRecipeStore((state) => state.recipes.length === 0);
  const recipes = useRecipeStore((state) => state.filteredRecipes);

  return (
    <div className="recipe-list">
      <h2>Recipes</h2>
      {allRecipesEmpty ? (
        <p>No recipes yet. Add one to get started!</p>
      ) : recipes.length === 0 ? (
        <p>No recipes match your search.</p>
      ) : (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <Link to={`/recipes/${recipe.id}`}>
                <h3>{recipe.title}</h3>
                <p>{recipe.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecipeList;
