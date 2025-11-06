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
  //   Toggle Favorites
toggleFavorite: async (recipeId) => {
  const { favorites } = get();
  const isFavorited = favorites.some((fav) => fav.id === recipeId);
  console.log('what was found?', isFavorited);

  try {
    if (isFavorited) {
      // Remove instantly
    //   set({ favorites: favorites.filter((fav) => fav.id !== recipeId) });
      await axios.delete(`/api/favorites/${recipeId}`);
      //this should refresh my store
      get().fetchFavorites();
    } else {
      // Add instantly using API response
      const response = await axios.post("/api/favorites", { recipe_id: recipeId });
    //   set({ favorites: [...favorites, response.data] });
    //refresh favorites
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
