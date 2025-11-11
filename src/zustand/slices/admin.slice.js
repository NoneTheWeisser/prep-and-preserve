import axios from "axios";
import { create } from "zustand";

const adminSlice =  ((set, get) => ({
  users: [],
  tags: [],

  fetchUsers: async () => {
    try {
      const response = await axios.get("/api/admin/users");
      set({ users: response.data });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  },

  fetchTags: async () => {
    try {
      const response = await axios.get("/api/admin/tags");
      set({ tags: response.data });
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  },

  addTag: async (tagName) => {
    try {
      const response = await axios.post("/api/admin/tags", { name: tagName });
      set((state) => ({ tags: [...state.tags, response.data] }));
    } catch (error) {
      console.error("Error adding tags:", error);
    }
  },

  updateTag: async (id, newName) => {
    try {
      await axios.put(`/api/admin/tags/${id}`, { name: newName });
      await get().fetchTags();
    } catch (error) {
      console.error("Error updating tag:", error);
    }
  },

  deleteTag: async (tagId) => {
    try {
      await axios.delete(`/api/admin/tags/${tagId}`);
      set((state) => ({ tags: state.tags.filter((t) => t.id !== tagId) }));
    } catch (error) {
      console.error("Error deleting tag:", error);
    }
  },
}));

export default adminSlice;
