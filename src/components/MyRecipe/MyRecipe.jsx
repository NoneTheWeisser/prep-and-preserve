import React, { useEffect, useState } from "react";
import MyRecipeList from "./MyRecipeList";
import useStore from "../../zustand/store";
import Avatar from "@mui/material/Avatar";
import { Typography, Box, Container, Tabs, Tab, Stack } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import RecipeFilterBar from "../RecipeFilterBar/RecipeFilterBar";

export default function MyRecipe() {
  const user = useStore((state) => state.user);
  const tags = useStore((state) => state.tags);
  const fetchTags = useStore((state) => state.fetchTags);

  // Filter state (shared with child tab routes via Outlet context)
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTagIds, setSelectedTagIds] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  const tabs = [
    { label: "My Recipes", path: "mine" },
    { label: "Favorites", path: "favorites" },
    { label: "Made", path: "made" },
  ];

  // determine tab index from URL (default to 0)
  const currentIndex = Math.max(
    0,
    tabs.findIndex((t) => location.pathname.endsWith(t.path))
  );

  // guard if user isn't signed in
  if (!user) {
    return (
      <Container maxWidth="md" sx={{ mt: 6, textAlign: "center" }}>
        <Typography variant="h6">
          Please sign in to manage your recipes.
        </Typography>
      </Container>
    );
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

      <div style={{ marginTop: "80px" }}>
        <Typography variant="h5" sx={{ textAlign: "center", mt: 4 }}>
          {user ? `${user.username}'s recipes` : "My Recipes"}
        </Typography>

        <Container maxWidth="xl" sx={{ mt: 3 }}>
          {/* Filter bar shared across tabs */}
          <RecipeFilterBar
            tags={tags}
            onFilterChange={({ searchTerm, selectedTagIds }) => {
              setSearchTerm(searchTerm);
              setSelectedTagIds(selectedTagIds);
            }}
          />
          {/* Tabs */}
          <Box
            sx={{
              width: "97%",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              p: 2,
              mb: 3,
              borderBottom: "1px solid #e0e0e0",
              borderRadius: 2,
            }}
          >
            {/* Left: Title */}
            <Typography
              variant="h6"
              component="h4"
              fontWeight={500}
              sx={{ fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" } }}
            >
              Recipe List View
            </Typography>

            {/* Right: Tabs */}
            <Tabs
              value={currentIndex}
              onChange={(event, newValue) => {
                navigate(`/myrecipes/${tabs[newValue].path}`);
              }}
              textColor="primary"
              indicatorColor="primary"
              sx={{
                minHeight: "48px",
                "& .MuiTab-root": {
                  minHeight: "48px",
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                },
              }}
            >
              {tabs.map((t) => (
                <Tab key={t.path} label={t.label} />
              ))}
            </Tabs>
          </Box>

          {/* Outlet for the tab contents; pass filter state via context */}
          <Outlet
            context={{
              searchTerm,
              selectedTagIds,
              setSearchTerm,
              setSelectedTagIds,
            }}
          />
        </Container>
      </div>
    </div>
  );
}
