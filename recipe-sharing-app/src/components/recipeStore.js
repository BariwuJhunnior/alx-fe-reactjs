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

  favorites: [],

  addFavorite: (recipeId) =>
    set((state) => {
      if (!state.favorites.includes(recipeId)) {
        return { favorites: [...state.favorites, recipeId] };
      }
      return state;
    }),

  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  toggleFavorite: (recipeId) =>
    set((state) => {
      const isFavorite = state.favorites.includes(recipeId);
      return {
        favorites: isFavorite
          ? state.favorites.filter((id) => id !== recipeId)
          : [...state.favorites, recipeId],
      };
    }),

  isFavorite: (recipeId) =>
    set((state) => {
      return state.favorites.includes(recipeId);
    }),

  recommendations: [],

  generateRecommendations: () =>
    set((state) => {
      // Get recipes that the user hasn't favorited yet
      const unfavoritedRecipes = state.recipes.filter(
        (recipe) => !state.favorites.includes(recipe.id)
      );

      // If no favorites, recommend recipes with shorter cooking time
      if (state.favorites.length === 0) {
        const recommended = unfavoritedRecipes
          .sort((a, b) => (a.cookingTime || 0) - (b.cookingTime || 0))
          .slice(0, 3);
        return { recommendations: recommended };
      }

      // Find favorite recipes to analyze
      const favoriteRecipes = state.recipes.filter((r) =>
        state.favorites.includes(r.id)
      );

      // Get cooking times of favorite recipes to find similar ones
      const avgCookingTime =
        favoriteRecipes.reduce((sum, r) => sum + (r.cookingTime || 0), 0) /
        favoriteRecipes.length;

      // Recommend recipes with similar cooking time
      const recommended = unfavoritedRecipes
        .sort((a, b) => {
          const aDiff = Math.abs((a.cookingTime || 0) - avgCookingTime);
          const bDiff = Math.abs((b.cookingTime || 0) - avgCookingTime);
          return aDiff - bDiff;
        })
        .slice(0, 3);

      return { recommendations: recommended };
    }),
}));

export default useRecipeStore;
