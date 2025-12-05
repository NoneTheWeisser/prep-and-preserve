import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useStore from "../../zustand/store";
import RecipeFilterBar from "../RecipeFilterBar/RecipeFilterBar";
import RecipeCard from "../RecipeFilterBar/RecipeCard";
import { Container, Grid, Typography, Box, Avatar } from "@mui/material";

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
    <div style={{ textAlign: "center" }}>
      <div style={{ position: "relative" }}>
        <img
          src={"/img/pexels-rdne-8581016.jpg"}
          alt={"MyRecipe header image"}
          style={{
            width: "100%",
            height: "500px",
            objectFit: "cover",
          }}
        />
        <Avatar
          src={user?.profile_image_url || undefined}
          alt={user?.username || "User"}
          sx={{
            width: 250,
            height: 250,
            position: "absolute",
            bottom: "-40px",
            left: "50%",
            transform: "translateX(-50%)",
            border: "4px solid white",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            bgcolor: "#afac9aff",
            fontSize: 64,
          }}
        >
          {!user?.profile_image_url && user?.username?.[0]?.toUpperCase()}
        </Avatar>
      </div>
      <Container maxWidth="xl" sx={{ mt: 6 }}>
        {/* Profile Header */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h5" fontWeight={600}>
            {profileUser.username}
          </Typography>
          <Typography sx={{ mt: 1, color: "text.secondary" }}>
            Member since {new Date(profileUser.created_at).toLocaleDateString()}
          </Typography>
          <Typography sx={{ mt: 1, color: "text.secondary" }}>
            {profileRecipes.length}{" "}
            {profileRecipes.length === 1 ? "recipe" : "recipes"}
          </Typography>
        </Box>

        {/* Filter/Search Bar */}
        <RecipeFilterBar tags={usedTags} onFilterChange={handleFilterChange} />

        {/* Recipes Grid */}
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
    </div>
  );
}
