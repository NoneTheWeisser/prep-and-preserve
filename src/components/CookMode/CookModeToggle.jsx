import { Box, Switch, Typography } from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import useStore from "../../zustand/store";

export default function CookModeToggle({ variant = "compact" }) {
  const cookModeEnabled = useStore((state) => state.cookModeEnabled);
  const setCookMode = useStore((state) => state.setCookMode);

  const isBar = variant === "bar";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1.5,
        width: isBar ? "100%" : "auto",
        px: isBar ? 0 : 1.5,
        py: isBar ? 0 : 0.75,
        borderRadius: 2,
        border: isBar ? "none" : "1px solid",
        borderColor: cookModeEnabled ? "primary.main" : "divider",
        bgcolor: isBar
          ? "transparent"
          : cookModeEnabled
            ? "rgba(226, 188, 163, 0.35)"
            : "background.paper",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <RestaurantMenuIcon
          fontSize={isBar ? "medium" : "small"}
          color={cookModeEnabled ? "primary" : "action"}
        />
        <Typography
          variant={isBar ? "subtitle1" : "body2"}
          fontWeight={600}
          sx={{ whiteSpace: "nowrap" }}
        >
          Cook Mode
        </Typography>
      </Box>
      <Switch
        checked={cookModeEnabled}
        onChange={(event) => setCookMode(event.target.checked)}
        color="primary"
        size={isBar ? "medium" : "small"}
        inputProps={{ "aria-label": "Cook Mode" }}
      />
    </Box>
  );
}
