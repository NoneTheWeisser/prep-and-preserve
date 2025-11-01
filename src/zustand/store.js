import { create } from "zustand";
import userSlice from "./slices/user.slice.js";
import createCloudinarySlice from "./slices/cloudinary.slice.js";
import createRecipeSlice from "./slices/recipe.slice.js";

// Combine all slices in the store:
const useStore = create((...args) => ({
  ...userSlice(...args),
  ...createCloudinarySlice(...args),
  ...createRecipeSlice(...args),
}));

export default useStore;
