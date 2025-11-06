import axios from "axios";

const createFavoritesSlice = (set, get) => ({
  favorites: [],

  // load Favorites
  fetchFavorites: async () => {
    try {
      const response = await axios.get("/api/favorites");
      set({ favorites: response.data });
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  },

  // toggle Favorites
  toggleFavorite: async (recipeId) => {
    const { favorites } = get();
    const isFavorited = favorites.some((fav) => fav.id === recipeId);

    try {
      if (isFavorited) {
        await axios.delete(`/api/favorites/${recipeId}`);
        set({ favorites: favorites.filter((fav) => fav.id !== recipeId) });
      } else {
        await axios.post("/api/favorites", { recipe_id: recipeId });
        await get().fetchFavorites();
      }
    } catch (error) {
      console.error("toggleFavorite error:", error);
    }
  },
  // find T/F
  isFavorited: (recipeId) => {
    return get().favorites.some((fav) => fav.id === recipeId);
  },
});

export default createFavoritesSlice;
