import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../data.json";

function RecipeDetail({ recipes }) {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const loadRecipe = () => {
      setIsLoading(true);
      setErrors(null);

      if (!id) {
        setErrors("Missing recipe ID in URL!");
        setIsLoading(false);
        return;
      }

      const recipeId = parseInt(id);

      if (isNaN(recipeId)) {
        setErrors(`Invalid recipe ID: ${id}.`);
        setIsLoading(false);
        return;
      }

      const foundRecipe = recipes?.find((recipe) => recipe.id === recipeId);

      if (foundRecipe) {
        setRecipe(foundRecipe);
      } else {
        setErrors(`Recipe with ID ${recipeId} not found!`);
      }

      setIsLoading(false);
    };

    if (recipes) {
      loadRecipe();
    }
  }, [id, recipes]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 text-center">
        Loading Recipe Details...
      </div>
    );
  } else if (errors) {
    return <div>{errors}</div>;
  }

  if (!recipe) {
    return <div>No Recipe Found!</div>;
  }
  return (
    <div>
      <div>
        <div className="p-2 hover:text-blue-600 text-end underline flex justify-end mb-7 shadow-lg rounded-lg m-4">
          <Link to="/">&#8592; Back</Link>
        </div>
        <div>
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-44 object-cover mx-auto p-4 items-center"
          />
          <div>
            <h1 className=" p-2 font-bold text-begin text-2xl">
              {recipe.title}
            </h1>
          </div>
        </div>

        <div className="text-begin p-2">
          <p>{recipe.summary}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="text-begin p-2">
            <h1 className="font-bold text-2xl mb-5">Ingredients</h1>
            <ol>
              {recipe.ingredients?.map((item, index) => (
                <li key={index}>* {item}</li>
              )) || <p>Ingredients list not available.</p>}
            </ol>
          </div>

          <div className="text-begin p-2">
            <h1 className="text-2xl font-bold mb-5">Cooking Instructions</h1>
            {recipe.instructions?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
