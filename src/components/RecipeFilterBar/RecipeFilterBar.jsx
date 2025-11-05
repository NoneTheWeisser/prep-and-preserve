import { useEffect, useState } from "react";
import useStore from "../../zustand/store";

export default function RecipeFilterBar({ onFilterChange }) {
  const fetchTags = useStore((state) => state.fetchTags);
  const tags = useStore((state) => state.tags);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTagIds, setSelectedTags] = useState([]);

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
const handleSearchChange = (e) => {
  setSearchTerm(e.target.value);
  };

  // Handle Tag Selection
  const handleTagChange = (tagId) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        marginBottom: "1.5rem",
        padding: "0.5rem 1rem",
        backgroundColor: "#fafafa",
        borderRadius: "5px",
      }}
    >
      <input
        type="text"
        placeholder="Search Recipes..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{
          padding: "0.5rem",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      {/* could be a dropdown/accordion ? */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {tags.map((tag) => (
          <button key={tag.id} onClick={() => handleTagChange(tag.id)}>
            {tag.name}
          </button>
        ))}
      </div>
    </div>
  );
}

