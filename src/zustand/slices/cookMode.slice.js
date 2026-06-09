const STORAGE_KEY = "cookModeEnabled";

const readStoredCookMode = () => {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
};

const cookModeSlice = (set) => ({
  cookModeEnabled: readStoredCookMode(),

  setCookMode: (enabled) => {
    try {
      sessionStorage.setItem(STORAGE_KEY, String(enabled));
    } catch {
      // sessionStorage may be unavailable in some contexts
    }
    set({ cookModeEnabled: enabled });
  },

  toggleCookMode: () =>
    set((state) => {
      const next = !state.cookModeEnabled;
      try {
        sessionStorage.setItem(STORAGE_KEY, String(next));
      } catch {
        // ignore
      }
      return { cookModeEnabled: next };
    }),
});

export default cookModeSlice;
