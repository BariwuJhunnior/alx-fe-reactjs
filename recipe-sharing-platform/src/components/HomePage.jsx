import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./data.json";

function HomePage({ recipes, isLoading }) {
  // Show loading state first
  if (isLoading) {
    return (
      <main className="container mx-auto p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">Recipes Sharing</h1>
          <p className="text-gray-600">Discover and Share Recipes.</p>
        </header>
        <div className="text-center text-gray-500">Loading recipes...</div>
      </main>
    );
  }

  // Show empty state only after loading is complete
  if (!recipes || recipes.length === 0) {
    return (
      <main className="container mx-auto p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">Recipes Sharing</h1>
          <p className="text-gray-600">Discover and Share Recipes.</p>
        </header>

        <div className="text-center">
          <p className="text-gray-600 mb-4">
            No recipes found. Start by adding one!
          </p>
          <Link
            to="/add"
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Recipe
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Recipes Sharing</h1>
        <p className="text-gray-600">Discover and Share Recipes.</p>
      </header>

      <div className="mb-4 flex justify-end">
        <Link
          to="/add"
          className="text-blue-600 hover:text-blue-800 underline font-semibold"
        >
          Add Recipe
        </Link>
      </div>

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

                <Link
                  to={`/recipe/${recipe.id}`}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View Recipe
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default HomePage;
