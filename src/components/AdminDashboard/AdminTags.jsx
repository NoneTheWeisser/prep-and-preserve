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
  Paper,
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
        textAlign: "left",
        p: 2,
        bgcolor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: { xs: "100%", sm: "95%", md: "85%", lg: "70%" },
          maxWidth: 900,
          p: 3,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            mb: 2,
            gap: 2, 
          }}
        >
          <h2 style={{ margin: 0 }}>Manage Tags</h2>

          {/* Add Tag section */}
          <Stack direction="row" spacing={1}>
            <TextField
              label="New Tag"
              size="small"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              sx={{ width: 200 }} 
            />
            <Button variant="contained" onClick={handleAdd}>
              Add
            </Button>
          </Stack>
        </Box>

        {/* DataGrid */}
        <Paper elevation={1} sx={{ height: 500, width: "100%", p: 1 }}>
          <DataGrid
            rows={tags}
            columns={columns}
            pageSize={20}
            disableRowSelectionOnClick
            sx={{
              border: "none",
            }}
          />
        </Paper>

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
      </Paper>
    </Box>
  );
}
