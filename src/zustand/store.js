import { create } from "zustand";
import { devtools } from "zustand/middleware";
import userSlice from "./slices/user.slice.js";
import createCloudinarySlice from "./slices/cloudinary.slice.js";
import tagSlice from "./slices/tag.slice.js";
import recipeSlice from "./slices/recipe.slice.js";
import createFavoritesSlice from "./slices/favorites.slice.js";
import adminSlice from "./slices/admin.slice.js";
import axios from "axios";

axios.defaults.withCredentials = true;

// Combine all slices in the store:
const useStore = create(
  devtools((set, get) => ({
    ...adminSlice(set, get),
    ...userSlice(set, get),
    ...createCloudinarySlice(set, get),
    ...tagSlice(set, get),
    ...recipeSlice(set, get),
    ...createFavoritesSlice(set, get),
  }))
);

export default useStore;
