import axios from "axios";

const madeSlice = (set, get) => ({
  madeRecipes: [],

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

  // log one "made" event; update local store counts optimistically

  logMade: async (recipeId) => {
    try {
      // todo - Optimistically update store before request
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

      // todo - Optionally: refetch authoritative counts from server to ensure sync:
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
