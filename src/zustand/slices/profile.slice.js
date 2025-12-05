import axios from "axios";

const profileSlice = (set, get) => ({
  // existing state
  user: null, // currently logged-in user
  profileUser: null, // user being viewed on profile page
  profileRecipes: [], // recipes of that profile user
  loadingProfile: false,
  profileError: null,

  fetchUserProfile: async (userId) => {
    set({ loadingProfile: true, profileError: null });
    try {
      const [userRes, recipesRes] = await Promise.all([
        axios.get(`/api/user/public/${userId}`),
        axios.get(`/api/user/${userId}/recipes`),
      ]);
      set({
        profileUser: userRes.data,
        profileRecipes: recipesRes.data,
      });
    } catch (err) {
      console.error("Error fetching user profile:", err);
      set({ profileError: "Failed to load user profile." });
    } finally {
      set({ loadingProfile: false });
    }
  },

  //   reset profile state
  resetProfile: () =>
    set({ profileUser: null, profileRecipes: [], profileError: null }),
});

export default profileSlice;
