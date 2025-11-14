import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  Typography,
  Stack,
} from "@mui/material";
import useStore from "../../zustand/store";

export default function AdminTags() {
  const tags = useStore((state) => state.tags);
  const fetchTags = useStore((state) => state.fetchTags);
  const addTag = useStore((state) => state.addTag);
  const updateTag = useStore((state) => state.updateTag);
  const deleteTag = useStore((state) => state.deleteTag);

  const [open, setOpen] = useState(false);
  const [editingTag, setEditingTag] = useState(null);
  const [tagName, setTagName] = useState("");

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  // Create new tag
  const handleAdd = () => {
    if (!tagName.trim()) return;
    addTag(tagName.trim());
    setTagName("");
  };

  // Open dialog for editing
  const handleEditClick = (tag) => {
    setEditingTag(tag);
    setTagName(tag.name);
    setOpen(true);
  };

  // Save edit
  const handleSave = async () => {
    await updateTag(editingTag.id, tagName);
    setOpen(false);
  };

  // DataGrid Columns
  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "name", headerName: "Tag Name", flex: 1 },
    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      renderCell: (params) => (
        <Button
          variant="outlined"
          size="small"
          onClick={() => handleEditClick(params.row)}
        >
          Edit
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      renderCell: (params) => (
        <Button
          variant="outlined"
          size="small"
          color="error"
          onClick={async () => {
            if (!window.confirm(`Delete tag "${params.row.name}"?`)) return;
            await deleteTag(params.row.id);
          }}
        >
          Delete
        </Button>
      ),
    },
  ];

return (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      minHeight: "100vh",
      p: 2,
      boxSizing: "border-box",
      bgcolor: "#f5f5f5", // optional: subtle background
    }}
  >
    <Box
      sx={{
        width: { xs: "100%", sm: "95%", md: "85%", lg: "70%" }, // responsive width
        maxWidth: 880,
        bgcolor: "white",
        borderRadius: 2,
        padding: 3,
        boxShadow: 2,
        overflowX: "auto", // horizontal scroll if necessary
      }}
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Manage Tags
      </Typography>

      {/* Add New Tag */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ mb: 2 }}
      >
        <TextField
          label="New Tag"
          size="small"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handleAdd}>
          Add Tag
        </Button>
      </Stack>

      {/* DataGrid */}
      <Box sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={tags}
          columns={columns}
          pageSize={20}
          disableRowSelectionOnClick
          sx={{
            "& .MuiDataGrid-root": { border: "none" },
          }}
        />
      </Box>

      {/* Edit Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Tag</DialogTitle>
        <DialogContent>
          <TextField
            label="Tag Name"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  </Box>
);
}
