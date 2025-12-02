import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function AddRecipeForm({ setRecipes }) {
  // FIXED: Proper React hook usage - useState at component level
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    imageUrl: "",
  });

  const [errors, setErrors] = useState("");

  // FIXED: Handler functions defined at component level
  const handleChange = (event) => {
    const { name, value } = event.target.value;
    const { steps } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors("");

    //Data Validation Code Here
    if (!formData.title.trim()) {
      setErrors("Please provide a title for the recipe!");
      return;
    }

    //Function to split textarea text into a clean array
    const cleanAndSplit = (text) => {
      //Split by newline, trim whitespace from each line, and filter out any empty lines.
      return text
        .split("\n")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);
    };

    const validatedIngredients = cleanAndSplit(formData.ingredients);
    const validatedInstrunctions = cleanAndSplit(formData.instructions);

    if (validatedIngredients.length === 0) {
      setErrors("Please list at least one ingredient!");
      return;
    }

    if (validatedInstrunctions.length === 0) {
      setErrors("Please list at least one preparation step.");
      return;
    }

    const newRecipe = {
      id: Date.now(),
      title: formData.title.trim(),
      summary: "User submitted recipe (summary placeholder)",
      image:
        formData.imageUrl ||
        "https://via.placeholder.com/250//C0C0C0/000000?text=NEW+RECIPE",
      ingredients: validatedIngredients,
      instructions: validatedInstrunctions,
    };

    // Add recipe to centralized state
    setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);

    // FIXED: Reset form only after successful submission
    setFormData({
      title: "",
      ingredients: "",
      instructions: "",
      imageUrl: "",
    });

    // Success feedback
    alert(`Recipe "${newRecipe.title}" has been added successfully!`);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 border-b-2 pb-2">
        Share Your Recipe
      </h1>

      <div className="mb-4 flex justify-end">
        <Link to="/">&#127968;Home</Link>
      </div>

      {/* FIXED: Add onSubmit handler to form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 max-w-2xl mx-auto"
      >
        {/* Error Display */}
        {errors && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {errors}
          </div>
        )}
        {/* Title Input */}
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-lg font-medium text-gray-700 mb-1"
          >
            Recipe Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition duration-150"
            placeholder="e.g. Spicy Chicken Stir-Fry"
          />
        </div>

        {/* Ingredients TextArea */}
        <div className="mb-4">
          <label
            htmlFor="ingredients"
            className="block text-lg font-medium text-gray-700 mb-1"
          >
            Recipe Ingredients (List each on a new line)
          </label>
          <textarea
            name="ingredients"
            id="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            required
            className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition duration-150"
            placeholder="1 lb ground beef&#10;1 can crushed tomatoes&#10;1 onion, diced"
          />
        </div>

        {/* Preparation Steps Textarea */}
        <div className="mb-4">
          <label
            htmlFor="instructions"
            className="block text-lg font-medium text-gray-700 mb-1"
          >
            Preparation Steps (List each step on a new line)
          </label>
          <textarea
            name="instructions"
            id="instructions"
            rows="7"
            value={formData.instructions}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-300 focus:border-orange-500 transition duration-150"
            placeholder="1. Brown beef and drain fat.&#10;2. Add tomatoes and spices.&#10;3. Simmer for 1 hour."
          />
        </div>

        {/* Image URL (Optional) */}
        <div className="mb-4">
          <label
            htmlFor="imageUrl"
            className="block text-lg font-medium text-gray-700 mb-1"
          >
            Image URL (Optional)
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-300 focus:border-orange-500 transition duration-150"
            placeholder="https://example.com/my-recipe-image.jpg"
          />
        </div>

        {/* Submit Button */}
        <div className="mb-4">
          <button
            type="submit"
            className="w-full py-3 px-4 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition duration 200"
          >
            Add Recipe
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddRecipeForm;
