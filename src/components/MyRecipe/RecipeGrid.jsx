import React from "react";
import { Grid } from "@mui/material";
import RecipeCard from "../RecipeFilterBar/RecipeCard";
import { useNavigate } from "react-router-dom";

export default function RecipeGrid({
  recipes = [],
  favorites = [],
  toggleFavorite, 
}) {
  const navigate = useNavigate();

  return (
    <Grid
      container
      spacing={2}
      sx={{ mt: 2, justifyContent: "center" }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {recipes.map((recipe) => (
        <Grid
          key={recipe.id}
          xs={2} 
          sm={4}
          md={3}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <RecipeCard
            recipe={recipe} 
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            onClick={() => navigate(`/recipes/${recipe.id}`)}
          />
        </Grid>
      ))}
    </Grid>
  );
}
