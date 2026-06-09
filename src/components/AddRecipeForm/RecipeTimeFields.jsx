import React from "react";
import { Box, TextField, Typography } from "@mui/material";

function TimeGroup({ label, hours, setHours, minutes, setMinutes }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
      <Typography variant="subtitle2" fontWeight={600}>
        {label}
      </Typography>
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          label="Hours"
          variant="outlined"
          type="number"
          inputProps={{ min: 0 }}
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          sx={{ width: { xs: "50%", sm: 100 } }}
        />
        <TextField
          label="Minutes"
          variant="outlined"
          type="number"
          inputProps={{ min: 0, max: 59 }}
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          sx={{ width: { xs: "50%", sm: 100 } }}
        />
      </Box>
    </Box>
  );
}

export default function RecipeTimeFields({
  prepHours,
  setPrepHours,
  prepMinutes,
  setPrepMinutes,
  cookHours,
  setCookHours,
  cookMinutes,
  setCookMinutes,
  servings,
  setServings,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "stretch", sm: "flex-end" },
        gap: { xs: 2.5, sm: 4 },
      }}
    >
      <TimeGroup
        label="Prep Time"
        hours={prepHours}
        setHours={setPrepHours}
        minutes={prepMinutes}
        setMinutes={setPrepMinutes}
      />
      <TimeGroup
        label="Cook Time"
        hours={cookHours}
        setHours={setCookHours}
        minutes={cookMinutes}
        setMinutes={setCookMinutes}
      />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
        <Typography variant="subtitle2" fontWeight={600}>
          Servings
        </Typography>
        <TextField
          variant="outlined"
          placeholder="e.g. 4 or 4-6"
          value={servings}
          onChange={(e) => setServings(e.target.value)}
          sx={{ width: { xs: "100%", sm: 140 } }}
          inputProps={{ "aria-label": "Servings" }}
        />
      </Box>
    </Box>
  );
}
