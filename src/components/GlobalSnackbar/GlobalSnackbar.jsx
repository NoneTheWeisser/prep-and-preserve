import { Snackbar, Alert, Button } from "@mui/material";
import useStore from "../../zustand/store";

export default function GlobalSnackbar() {
  const snackbar = useStore((state) => state.snackbar);
  const closeSnackbar = useStore((state) => state.closeSnackbar);

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={snackbar.duration}
      onClose={closeSnackbar}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        severity={snackbar.severity}
        onClose={closeSnackbar}
        action={
          snackbar.action ? (
            <Button
              color="inherit"
              size="small"
              onClick={snackbar.action.onClick}
            >
              {snackbar.action.label}
            </Button>
          ) : null
        }
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
}
