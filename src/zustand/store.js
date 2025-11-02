import { create } from "zustand";
import userSlice from "./slices/user.slice.js";
import createCloudinarySlice from "./slices/cloudinary.slice.js";
// import createRecipeSlice from "./slices/recipe.slice.js";
// import getTags from "./slices/tag.slice.js";
import axios from "axios";

// Combine all slices in the store:
const useStore = create((set, get) => ({
  ...userSlice(set, get),
  ...createCloudinarySlice(set, get),
  // ...createRecipeSlice(...args),
  // ...getTags(...args),

  recipes: [],
  userRecipes: [],

  // Fetch all public recipes
  fetchRecipes: async () => {
    try {
      const response = await axios.get("/api/recipes");
      set({ recipes: response.data });
    } catch (error) {
      console.error("Error fetching public recipes:", error);
    }
  },

  // Fetch recipes for logged-in users
  fetchUserRecipes: async () => {
    try {
      const response = await axios.get("/api/recipes/mine");
      set({ userRecipes: response.data });
    } catch (error) {
      console.error("Error fetching user recipes:", error);
    }
  },

  // Fetch recipe by id
  fetchRecipeById: async (id) => {
    try {
      const response = await axios.get(`/api/recipes/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching recipe by id:", error)
    }
  },

  // Add new recipe
  addRecipe: async (recipeData) => {
    try {
      const response = await axios.post("/api/recipes", recipeData);
      const newRecipe = response.data;

      set((state) => ({
        recipes: [newRecipe, ...state.recipes],
        userRecipes: [newRecipe, ...state.userRecipes],
      }));

      console.log("Recipe successfully added:", newRecipe);
      return newRecipe;
    } catch (error) {
      console.error("Error adding recipe:", error);
      alert("Something went wrong while saving your recipe");
    }
  },

  // Update a recipe
  updateRecipe: async (id, updatedData) => {
    try {
      const response = await axios.put(`/api/recipes/${id}`, updatedData);
      const updatedRecipe = response.data;

      set((state) => ({
        recipes: state.recipes.map((recipe) =>
          recipe.id === recipeId ? updatedRecipe : recipe
        ),
        userRecipes: state.userRecipes.map((recipe) =>
          recipe.id === recipeId ? updatedRecipe : recipe
        ),
      }));

      console.log("Recipe updated:", updatedRecipe);
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  },

  // delete recipe
  deleteRecipe: async (recipeId) => {
    try {
      await axios.delete(`/api/recipes/${recipeId}`);

      set((state) => ({
        recipes: state.recipes.filter((recipe) => recipe.id !== recipeId),
        userRecipes: state.userRecipes.filter(
          (recipe) => recipe.id !== recipeId
        ),
      }));

      console.log("Recipe deleted:", recipeId);
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  },
}));

export default useStore;
