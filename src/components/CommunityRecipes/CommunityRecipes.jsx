import CommunityRecipeList from "./CommunityRecipeList";
import { Typography, Box } from "@mui/material";

export default function CommunityRecipes() {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ position: "relative" }}>
        <img
          src={"/img/pexels-fauxels-3184195.jpg"}
          alt={"Community header image"}
          style={{
            width: "100%",
            height: "500px",
            objectFit: "cover",
            // borderBottom: "4px solid #000000ff",
          }}
        />
      </div>
      <Box sx={{ maxWidth: 800, mx: "auto", mt: 4, px: 2 }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Community Recipes
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Discover new flavors, try new ingredients, and get inspired!<br></br>{" "}
          See something you like? Tap the favorite icon to save it to your
          personal recipe book.
        </Typography>
      </Box>

      <CommunityRecipeList />
    </div>
  );
}
