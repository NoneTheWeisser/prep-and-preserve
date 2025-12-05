import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useStore from "../../zustand/store";
import RecipeFilterBar from "../RecipeFilterBar/RecipeFilterBar";
import RecipeCard from "../RecipeFilterBar/RecipeCard";
import { Container, Grid, Typography, Box, Avatar, Paper } from "@mui/material";

export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useStore((state) => state.user);

  // Profile slice
  const profileUser = useStore((state) => state.profileUser);
  const profileRecipes = useStore((state) => state.profileRecipes);
  const loadingProfile = useStore((state) => state.loadingProfile);
  const profileError = useStore((state) => state.profileError);
  const fetchUserProfile = useStore((state) => state.fetchUserProfile);
  const resetProfile = useStore((state) => state.resetProfile);

  // Favorites slice
  const favorites = useStore((state) => state.favorites);
  const fetchFavorites = useStore((state) => state.fetchFavorites);
  const toggleFavorite = useStore((state) => state.toggleFavorite);

  // Tags slice
  const tags = useStore((state) => state.tags);

  // Local filter state
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedTagIds, setSelectedTagIds] = useState([]);
  const [loading, setLoading] = useState(true);

  //  Total Favorites
  const totalFavorites = profileRecipes.reduce(
    (sum, recipe) => sum + Number(recipe.favorites_count || 0),
    0
  );

  // Fetch profile and favorites
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchUserProfile(id), fetchFavorites()]);
      setLoading(false);
    };
    loadData();
    return () => resetProfile();
  }, [id, fetchUserProfile, fetchFavorites, resetProfile]);

  // Sync filtered recipes with fetched data
  useEffect(() => {
    setFilteredRecipes(profileRecipes);
  }, [profileRecipes]);

  // Handle search/filter changes
  const handleFilterChange = ({ searchTerm, selectedTagIds }) => {
    setSelectedTagIds(selectedTagIds);

    let filtered = profileRecipes;

    if (searchTerm) {
      filtered = filtered.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedTagIds && selectedTagIds.length > 0) {
      filtered = filtered.filter((recipe) => {
        const recipeTagIds = recipe.tags?.map((tag) => tag.id) || [];
        return selectedTagIds.every((id) => recipeTagIds.includes(id));
      });
    }

    setFilteredRecipes(filtered);
  };

  // Only show tags that exist in profileRecipes
  const usedTags = tags.filter((tag) =>
    profileRecipes.some((recipe) => recipe.tags?.some((rt) => rt.id === tag.id))
  );

  if (loading || loadingProfile) {
    return (
      <Typography sx={{ textAlign: "center", color: "text.secondary" }}>
        Loading recipes...
      </Typography>
    );
  }

  if (profileError) {
    return <Typography color="error">{profileError}</Typography>;
  }

  if (!profileUser) {
    return <Typography>User not found.</Typography>;
  }

  return (
    <Box>
      {/* Hero Image */}
      <Box
        sx={{
          height: 400,
          backgroundImage: `url('/img/pexels-ron-lach-8176603.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      />

      {/* Profile Info */}
      <Container maxWidth="xl" sx={{ mt: -10, mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "flex-start" },
            textAlign: { xs: "center", md: "left" },
            gap: 2,
          }}
        >
          {/* Avatar */}
          <Avatar
            src={profileUser?.profile_image_url || undefined}
            alt={profileUser?.username || "User"}
            sx={{
              width: 200,
              height: 200,
              border: "4px solid white",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              bgcolor: "#afac9aff",
              fontSize: 64,
            }}
          >
            {!profileUser?.profile_image_url &&
              profileUser?.username?.[0]?.toUpperCase()}
          </Avatar>

          {/* Username */}
          <Typography variant="h4" fontWeight="bold">
            {profileUser?.username}
          </Typography>

          {/* Stats */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Typography variant="body1" color="text.secondary">
              Member since{" "}
              {new Date(profileUser?.created_at).toLocaleDateString()}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Recipes: {profileRecipes.length}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Total Favorites:{" "}
              {profileRecipes.reduce(
                (sum, recipe) => sum + Number(recipe.favorites_count || 0),
                0
              )}
            </Typography>
          </Box>
        </Box>
      </Container>

      {/* Recipe Filter + Grid */}
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <RecipeFilterBar tags={usedTags} onFilterChange={handleFilterChange} />

        {filteredRecipes.length === 0 ? (
          <Typography
            sx={{ textAlign: "center", color: "text.secondary", mt: 4 }}
          >
            This user has no public recipes.
          </Typography>
        ) : (
          <Grid container spacing={2} sx={{ mt: 2, justifyContent: "center" }}>
            {filteredRecipes.map((recipe) => (
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
                  onClick={() => navigate(`/recipes/${recipe.id}`)}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
