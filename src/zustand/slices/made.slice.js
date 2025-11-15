import axios from "axios";

const madeSlice = (set, get) => ({
  madeRecipes: [],

  fetchMade: async () => {
    try {
      const response = await axios.get("/api/trending/recent");
      set({ madeRecipes: response.data });
    } catch (error) {
      console.error("Error fetching made recipes:", error);
    }
},

  logMade: async (recipeId) => {
    try {
      const response = await axios.post('/api/made', { recipe_id: recipeId });
      if (response.status === 201) {
        // Optional: update local state immediately
        get().fetchMade();
      }
    } catch (error) {
      console.error('Error logging made recipe:', error);
    }
  },
});

export default madeSlice;