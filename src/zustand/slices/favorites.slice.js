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

    if (isFavorited) {
      // remove favorite
      try {
        await axios.delete(`/api/favorites/${recipeId}`);
        set({ favorites: favorites.filter((f) => f.id !== recipeId) });
      } catch (error) {
        console.error("Error removing favorite:", error);
      }
    } else {
      // add favorite
      try {
        const response = await axios.post("/api/favorites", {
          recipe_id: recipeId,
        });
        // refetch the data
        await get().fetchFavorites();
      } catch (error) {
        console.error("Error adding favorite:", error);
      }
    }
  },
    // find T/F
  isFavorited: (recipeId) => {
    return get().favorites.some((fav) => fav.id === recipeId);
  },
});

export default createFavoritesSlice;
