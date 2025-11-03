import axios from "axios";

const tagSlice = (set) => ({
  tags: [],

  fetchTags: async () => {
    try {
      const response = await axios.get("/api/tags");
      set({ tags: response.data });
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  },
});

export default tagSlice;
