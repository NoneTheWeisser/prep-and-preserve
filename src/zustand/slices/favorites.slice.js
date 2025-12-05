import axios from "axios";

const createFavoritesSlice = (set, get) => ({
  favorites: [],

  // load Favorites
  fetchFavorites: async () => {
    try {
      const response = await axios.get("/api/favorites");
      const normalized = response.data.map((fav) => ({
        id: fav.recipe_id, //  match recipe.id
        ...fav,
      }));
      set({ favorites: normalized });
    } catch (error) {
      console.error(error);
    }
  },

  //   Toggle Favorites
  toggleFavorite: async (recipeId) => {
    const { favorites } = get();
    const isFavorited = favorites.some((fav) => fav.id === recipeId);

    try {
      if (isFavorited) {
        await axios.delete(`/api/favorites/${recipeId}`);
        //this should refresh my store
        get().fetchFavorites();
      } else {
        // Add instantly using API response
        const response = await axios.post("/api/favorites", {
          recipe_id: recipeId,
        });
        get().fetchFavorites();
      }
    } catch (error) {
      console.error("toggleFavorite error:", error);
      set({ favorites });
    }
  },

  // find T/F
  isFavorited: (recipeId) => {
    return get().favorites.some((fav) => fav.id === recipeId);
  },
});

export default createFavoritesSlice;
