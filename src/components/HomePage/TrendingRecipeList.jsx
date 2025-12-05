import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../zustand/store";
import RecipeCard from "../RecipeFilterBar/RecipeCard";
import { Box, Container, Grid, Typography, Button } from "@mui/material";

export default function TrendingRecipeList() {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const fetchTrending = useStore((state) => state.fetchTrending);
  const fetchFavorites = useStore((state) => state.fetchFavorites);
  const trendingRecipes = useStore((state) => state.trendingRecipes);
  const favorites = useStore((state) => state.favorites);
  const toggleFavorite = useStore((state) => state.toggleFavorite);

  useEffect(() => {
    const loadTrending = async () => {
      setLoading(true);
      await Promise.all([fetchTrending(), fetchFavorites()]);
      setLoading(false);
    };
    loadTrending();
  }, [fetchTrending, fetchFavorites]);

  if (loading) {
    return (
      <Typography sx={{ textAlign: "center", color: "text.secondary" }}>
        Loading trending recipes...
      </Typography>
    );
  }

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
        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{ display: "flex", flexWrap: "wrap" }}
        >
          {trendingRecipes.slice(0, 10).map((recipe) => (
            <Grid
              key={recipe.id}
              item
              xs={6}
              sm={6}
              md={4}
              lg={3}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <RecipeCard
                recipe={recipe}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
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
