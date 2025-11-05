import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Checkbox,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useStore from "../../zustand/store";

export default function RecipeFilterBar({ onFilterChange, ...props }) {
  const fetchTags = useStore((state) => state.fetchTags);
  // const tags = useStore((state) => state.tags);
  const tags = props.tags || [];

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
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Handle Tag Selection
  const handleTagChange = (tagId) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  // Clear tags?
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
      {/* Search box, needs updating */}
      <TextField
        placeholder="Search Recipes..."
        value={searchTerm}
        onChange={handleSearchChange}
        fullWidth
        size="small"
      />
      {/* Accordion for tag list */}
      <Accordion elevation={0} disableGutters>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Filter
        </AccordionSummary>
        <AccordionDetails sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
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
        </AccordionDetails>
      </Accordion>
      {/* Selected Tag Chips */}
      {selectedTags.length > 0 && (
        <Stack direction="row" spacing={1} flexWrap="wrap">
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
