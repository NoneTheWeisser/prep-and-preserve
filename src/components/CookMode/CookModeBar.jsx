import { Box, Paper } from "@mui/material";
import useStore from "../../zustand/store";
import CookModeToggle from "./CookModeToggle";

export default function CookModeBar() {
  const cookModeEnabled = useStore((state) => state.cookModeEnabled);

  if (!cookModeEnabled) return null;

  return (
    <Paper
      elevation={8}
      sx={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: (theme) => theme.zIndex.appBar + 1,
        borderRadius: 0,
        borderTop: "2px solid",
        borderColor: cookModeEnabled ? "primary.main" : "divider",
        bgcolor: "rgba(226, 188, 163, 0.5)",
        px: 2,
        py: 1.5,
        pb: "calc(12px + env(safe-area-inset-bottom))",
      }}
    >
      <Box sx={{ maxWidth: "md", mx: "auto" }}>
        <CookModeToggle variant="bar" />
      </Box>
    </Paper>
  );
}
