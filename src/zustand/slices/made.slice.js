import axios from "axios";

const madeSlice = (set, get) => ({
  madeRecipes: [],
  trendingRecipes: [],

  fetchMade: async () => {
    try {
      const response = await axios.get("/api/made/user");
      // ensure counts are numbers
      const normalized = (response.data || []).map((r) => ({
        recipe_id: Number(r.recipe_id),
        count: Number(r.count) || 0,
        last_made_at: r.last_made_at || null,
      }));
      set({ madeRecipes: normalized });
    } catch (error) {
      console.error("Error fetching made recipes counts:", error);
    }
  },

  fetchTrending: async () => {
    try {
      const response = await axios.get("/api/trending/recent"); 
      // normalize keys...
      const normalized = response.data.map((r)=> ({
        id: r.recipe_id,
        title: r.recipe_title,
        image_url: r.recipe_image_url,
        username: r.recipe_owner_username,
        made_count: 1.

      }))
      set({ trendingRecipes: normalized });
    } catch (error) {
      console.error("Error fetching trending recipes:", error);
    }
  },

  // log one "made" event; update local store counts optimistically

  logMade: async (recipeId) => {
    try {
      const existing = get().madeRecipes.find((r) => r.recipe_id === recipeId);
      if (existing) {
        // increment existing count
        set((state) => ({
          madeRecipes: state.madeRecipes.map((r) =>
            r.recipe_id === recipeId
              ? { ...r, count: Number(r.count || 0) + 1 }
              : r
          ),
        }));
      } else {
        // add new entry with count 1
        set((state) => ({
          madeRecipes: [
            ...state.madeRecipes,
            { recipe_id: recipeId, count: 1 },
          ],
        }));
      }

      // Persist
      const response = await axios.post("/api/made", { recipe_id: recipeId });
      if (response.status !== 201) {
        throw new Error("Failed to save made record");
      }
      await get().fetchMade();
      return true;
    } catch (error) {
      console.error("Error logging made recipe:", error);
      // Rollback optimistic update if desired:
      const existingAfter = get().madeRecipes.find(
        (r) => r.recipe_id === recipeId
      );
      if (existingAfter) {
        set((state) => ({
          madeRecipes: state.madeRecipes.map((r) =>
            r.recipe_id === recipeId
              ? { ...r, count: Math.max(0, Number(r.count || 1) - 1) }
              : r
          ),
        }));
      }
      return false;
    }
  },
});
export default madeSlice;
