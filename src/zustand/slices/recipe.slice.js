// import axios from "axios";

// //////// Code from Spike
// const createRecipeSlice = (set, get) => ({
//   recipes: [],
//   addRecipe: async (recipeData) => {
//     try {
//       const response = await axios.post("/api/recipes", recipeData);
//       set((state) => ({
//         recipes: [...state.recipes, response.data],
//       }));
//       console.log("Recipes Added:", response.data);
//     } catch (error) {
//       console.error("Error adding recipe:", error);
//     }
//   },

//   fetchRecipes: async () => {
//     try {
//       const response = await axios.get("/api/recipes");
//       set({ recipes: response.data });
//     } catch (error) {
//       console.error("Error fetching recipes:", error);
//     }
//   },
// });

// export default createRecipeSlice;
