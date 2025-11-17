const snackbarSlice = (set) => ({
  snackbar: {
    open: false,
    message: "",
    // "success", "error", "warning", "info" - todo
    severity: "info",
    duration: 4000,
    onClose: null,
  },

  showSnackbar: ({
    message,
    severity = "info",
    duration = 4000,
    onClose = null,
  }) =>
    set(() => ({
      snackbar: {
        open: true,
        message,
        severity,
        duration,
        onClose,
      },
    })),

  closeSnackbar: () =>
    set((state) => {
      // call onClose if provided
      if (state.snackbar.onClose) {
        state.snackbar.onClose();
      }
      return {
        snackbar: { ...state.snackbar, open: false, onClose: null },
      };
    }),
});

export default snackbarSlice;
