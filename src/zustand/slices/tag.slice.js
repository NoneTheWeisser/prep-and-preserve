// import { create } from "zustand";
// import axios from "axios";

// const getTags = create((set, get) => ({
//   tags: [],
//   isLoadingTags: false,
//   fetchTags: async () => {
//     try {
//       set({ isLoadingTags: true });
//       const res = await axios.get("/api/tags");
//       set({ tags: res.data, isLoadingTags: false });
//     } catch (error) {
//       console.error("Error fetching tags:", error);
//       set({ isLoadingTags: false });
//     }
//   },
// }));

// export default getTags;