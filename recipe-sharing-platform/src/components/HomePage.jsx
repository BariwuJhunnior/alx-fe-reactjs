import React from "react";
import { useState, useEffect } from "react";
import data from "../data.json";

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      setRecipes(Array.isArray(data) ? data : []);
    } catch (error) {
      setRecipes([]);
      console.error("Error Fetching Recipes!", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <main className="container mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Recipes Sharing</h1>
        <p className="text-gray-600">Discover and Share Recipes.</p>
      </header>

      {isLoading ? (
        <div className="text-center text-gray-500">Loading recipes...</div>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <article
              key={recipe.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden"
            >
              {recipe.image && (
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-44 object-cover"
                />
              )}

              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{recipe.title}</h2>
                <p className="text-sm text-gray-600 mb-4">{recipe.summary}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    Recipe #{recipe.id}
                  </span>
                  <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                    View
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default HomePage;
