import axios from "axios";

const getTags = (set) => ({
  allTags: [],

  fetchTags: async () => {
    try {
      const response = await axios.get("/api/tags");
      set({ allTags: response.data });
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  },
});

export default getTags;
