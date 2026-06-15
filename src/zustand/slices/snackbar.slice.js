const snackbarSlice = (set) => ({
  snackbar: {
    open: false,
    message: "",
    // "success", "error", "warning", "info" - todo - need to add these for error and such for log in etc
    severity: "info",
    duration: 4000,
    onClose: null,
    action: null,
  },

  showSnackbar: ({
    message,
    severity = "info",
    duration = 4000,
    onClose = null,
    action = null,
  }) =>
    set(() => ({
      snackbar: {
        open: true,
        message,
        severity,
        duration,
        onClose,
        action,
      },
    })),

  closeSnackbar: () =>
    set((state) => {
      // call onClose if provided
      if (state.snackbar.onClose) {
        state.snackbar.onClose();
      }
      return {
        snackbar: {
          ...state.snackbar,
          open: false,
          onClose: null,
          action: null,
        },
      };
    }),
});

export default snackbarSlice;
