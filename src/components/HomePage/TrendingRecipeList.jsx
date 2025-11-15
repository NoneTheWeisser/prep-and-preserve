import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../zustand/store";
import RecipeCard from "../RecipeFilterBar/RecipeCard";
import { Box, Container, Grid, Typography, Button } from "@mui/material";

export default function TrendingRecipeList() {
  const navigate = useNavigate();
  const fetchTrending = useStore((state) => state.fetchTrending);
  const trendingRecipes = useStore((state) => state.trendingRecipes);

  useEffect(() => {
    fetchTrending();
  }, [fetchTrending]);

  return (
    <Container maxWidth="xl" sx={{ mt: 6 }}>
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h5" fontWeight={600}>
          Trending Recipes
        </Typography>
        <Typography sx={{ mt: 1, color: "text.secondary" }}>
          Take a look at what people have been cooking lately!
        </Typography>
      </Box>

      {/* Trending Grid */}
      {trendingRecipes.length === 0 ? (
        <Typography sx={{ textAlign: "center", color: "text.secondary" }}>
          No trending recipes yet.
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {trendingRecipes.map((recipe) => (
            <Grid
              key={recipe.id}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <RecipeCard
                recipe={recipe}
                extraInfo={
                  <Typography
                    variant="body2"
                    sx={{ mt: 1, textAlign: "center", color: "text.secondary" }}
                  >
                    Made it ({recipe.made_count || 0})
                  </Typography>
                }
                onClick={() => navigate(`/recipes/${recipe.id}`)}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Community CTA */}
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography sx={{ color: "text.secondary" }}>
          To view all recipes, please check out the{" "}
          <Button variant="text" onClick={() => navigate("/community")}>
            Community Recipe Page
          </Button>
          .
        </Typography>
      </Box>
    </Container>
  );
}
