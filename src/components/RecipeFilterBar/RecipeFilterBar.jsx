import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Chip,
  Stack,
  Typography,
  InputAdornment,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useStore from "../../zustand/store";
import SearchIcon from "@mui/icons-material/Search";

export default function RecipeFilterBar({ onFilterChange, ...props }) {
  const fetchTags = useStore((state) => state.fetchTags);
  // const tags = useStore((state) => state.tags);
  const tags = props.tags || [];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTagIds, setSelectedTags] = useState([]);
  const [accordionOpen, setAccordionOpen] = useState(false);

  useEffect(() => {
    fetchTags();
  }, []);

  // moved onFilterChange into a useEffect to help solve the warning I was getting
  useEffect(() => {
    if (typeof onFilterChange === "function") {
      onFilterChange({ searchTerm, selectedTagIds });
    }
  }, [searchTerm, selectedTagIds]);

  // handle search input
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Handle Tag Selection
  const handleTagChange = (tagId) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  // Clear tags
  const clearTag = (tagId) => {
    setSelectedTags((prev) => prev.filter((id) => id !== tagId));
  };
  const clearAllTags = () => setSelectedTags([]);
  const selectedTags = tags.filter((tag) => selectedTagIds.includes(tag.id));

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
    {/* Filter and search bar row */}
    <Stack
      direction={{ xs: "column", sm: "row" }} 
      spacing={2}
      alignItems="stretch"
    >
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setAccordionOpen((prev) => !prev)}
        sx={{
          width: { xs: "100%", sm: "25%" }, 
          flexShrink: 0, 
        }}
        endIcon={
          <ExpandMoreIcon
            sx={{
              transform: accordionOpen ? "rotate(180deg)" : "none",
              transition: "0.2s",
            }}
          />
        }
      >
        Filter
      </Button>

      {/* Search box */}
      <TextField
        placeholder="Search Recipes..."
        value={searchTerm}
        onChange={handleSearchChange}
        size="small"
        sx={{ width: { xs: "100%", sm: "auto" }, flexGrow: 1 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Stack>

    {/* Accordion for tags */}
    {accordionOpen && (
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        {tags.map((tag) => (
          <Chip
            key={tag.id}
            label={tag.name}
            clickable
            color={selectedTagIds.includes(tag.id) ? "primary" : "default"}
            variant={selectedTagIds.includes(tag.id) ? "filled" : "outlined"}
            onClick={() => handleTagChange(tag.id)}
          />
        ))}
      </Box>
    )}

    {/* Selected Tag Chips */}
    {selectedTags.length > 0 && (
      <Stack direction="row" spacing={1} flexWrap="wrap" alignItems="center">
        <Typography variant="body2" sx={{ alignSelf: "center" }}>
          Filtering by:
        </Typography>
        {selectedTags.map((tag) => (
          <Chip
            key={tag.id}
            label={tag.name}
            onDelete={() => clearTag(tag.id)}
            color="primary"
            variant="outlined"
          />
        ))}
        <Chip label="Clear All" onClick={clearAllTags} />
      </Stack>
    )}
  </Box>
);
}