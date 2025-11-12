import { create } from "zustand";

const filterRecipes = (recipes, term) => {
  const t = term?.trim().toLowerCase() || "";
  if (!t) return recipes;

  return recipes.filter((r) => {
    const inTitle = r.title?.toLowerCase().includes(t);
    const inDescription = r.description?.toLowerCase().includes(t);
    const inIngredients = Array.isArray(r.ingredients)
      ? r.ingredients.some((i) => i.toLowerCase().includes(t))
      : false;
    const inTime = r.cookingTime
      ? String(r.cookingTime).toLowerCase().includes(t)
      : false;

    return inTitle || inDescription || inIngredients || inTime;
  });
};

const useRecipeStore = create((set) => ({
  recipes: [],
  filteredRecipes: [],
  searchTerm: "",

  addRecipe: (newRecipe) =>
    set((state) => {
      const recipes = [...state.recipes, newRecipe];
      return {
        recipes,
        filteredRecipes: filterRecipes(recipes, state.searchTerm),
      };
    }),

  setRecipes: (recipes) =>
    set((state) => ({
      recipes,
      filteredRecipes: filterRecipes(recipes, state.searchTerm),
    })),

  updateRecipe: (recipeId, updatedData) =>
    set((state) => {
      const recipes = state.recipes.map((recipe) =>
        recipe.id === recipeId ? { ...recipe, ...updatedData } : recipe
      );
      return {
        recipes,
        filteredRecipes: filterRecipes(recipes, state.searchTerm),
      };
    }),

  deleteRecipe: (recipeId) =>
    set((state) => {
      const recipes = state.recipes.filter((recipe) => recipe.id !== recipeId);
      return {
        recipes,
        filteredRecipes: filterRecipes(recipes, state.searchTerm),
      };
    }),

  setSearchTerm: (term) =>
    set((state) => {
      const searchTerm = term;
      return {
        searchTerm,
        filteredRecipes: filterRecipes(state.recipes, searchTerm),
      };
    }),
}));

export default useRecipeStore;
