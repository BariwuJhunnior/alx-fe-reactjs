import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import data from "../data.json";

function RecipeDetail() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRecipe = () => {
      setIsLoading(true);
      setError(null);

      if (!id) {
        setError("Missing recipe ID in URL!");
        setIsLoading(false);
        return;
      }

      const recipeId = parseInt(id);

      if (isNaN(recipeId)) {
        setError(`Invalid recipe ID: ${id}.`);
        setIsLoading(false);
        return;
      }

      const foundRecipe = data.find((recipe) => recipe.id === recipeId);

      // DEBUG: Log the found recipe to check data structure
      console.log("Found recipe:", foundRecipe);
      console.log(
        "Recipe data keys:",
        foundRecipe ? Object.keys(foundRecipe) : "No recipe found"
      );

      if (foundRecipe) {
        setRecipe(foundRecipe);
      } else {
        setError(`Recipe with ID ${recipeId} not found!`);
      }

      setIsLoading(false);
    };

    loadRecipe();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 text-center">
        Loading Recipe Details...
      </div>
    );
  } else if (error) {
    return <div>{error}</div>;
  }

  if (!recipe) {
    return <div>No Recipe Found!</div>;
  }
  return (
    <div>
      <div>
        <div>
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-44 object-cover mx-auto p-4 items-center"
          />
          <div>
            <h1 className="mx-auto p-4 font-bold text-begin text-2xl">
              {recipe.title}
            </h1>
          </div>
        </div>

        <div className="text-begin p-4">
          <p>{recipe.summary}</p>
        </div>
      </div>

      <div className="p-4 hover:text-blue-600 text-end underline hover:no-underline inline-block">
        <Link to="/">&#8592; Back to Home</Link>
      </div>
    </div>
  );
}

export default RecipeDetail;
