import { useEffect, useState } from "react";
import useStore from "../../zustand/store";
import {
  Box,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Chip,
} from "@mui/material";

export default function RecipeFilterBar({ onFilterChange }) {
  const fetchTags = useStore((state) => state.fetchTags);
  const tags = useStore((state) => state.tags);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTagIds, setSelectedTags] = useState([]);
  const [matchType, setMatchType] = useState("all");

  useEffect(() => {
    fetchTags();
  }, []);

  // moved onFilterChange into a useEffect to help solve the warning I was getting
  useEffect(() => {
    if (typeof onFilterChange === "function") {
      onFilterChange({ searchTerm, selectedTagIds, matchType });
    }
  }, [searchTerm, selectedTagIds, matchType]);

  // handle search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle Tag Selection
  const handleTagChange = (tagId) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mb: 2,
        p: 2,
        bgcolor: "#fafafa",
        borderRadius: 1,
      }}
    >
      <TextField
        placeholder="Search Recipes..."
        value={searchTerm}
        onChange={handleSearchChange}
        fullWidth
        size="small"
      />
        {/* would I need these? */}
      <ToggleButtonGroup
        value={matchType}
        exclusive
        onChange={(_, newType) => newType && setMatchType(newType)}
        size="small"
        sx={{ mb: 1 }}
      >
        <ToggleButton value="none">None</ToggleButton>
        <ToggleButton value="any">Any</ToggleButton>
        <ToggleButton value="all">All</ToggleButton>
      </ToggleButtonGroup>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {tags.map((tag) => (
          <Chip
            key={tag.id}
            label={tag.name}
            color={selectedTagIds.includes(tag.id) ? "primary" : "default"}
            onClick={() => handleTagChange(tag.id)}
            clickable
          />
        ))}
      </Box>
    </Box>
  );
}
