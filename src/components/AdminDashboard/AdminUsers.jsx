import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Switch,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useStore from "../../zustand/store";
import { useEffect } from "react";

export default function UsersTab() {
  const users = useStore((state) => state.users);
  const fetchUsers = useStore((state) => state.fetchUsers);
  const updateUser = useStore((state) => state.updateUser); 

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleAdmin = (user) => {
    updateUser(user.id, { is_admin: !user.is_admin });
  };

  const handleDeactivate = (user) => {
    updateUser(user.id, { is_active: false });
  };

  return (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      p: 2,
      width: "100%", // full width container
      boxSizing: "border-box",
    }}
  >
    <Box
      sx={{
        width: { xs: "100%", sm: "90%", md: "80%", lg: "70%" }, // responsive width
        padding: 2,
        textAlign: "left",
        bgcolor: "white",
        borderRadius: 2,
        overflowX: "auto", // allows horizontal scroll on very small screens
      }}
    >
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Manage Users
      </Typography>

      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Admin</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Switch
                  checked={user.is_admin}
                  onChange={() => handleToggleAdmin(user)}
                  color="primary"
                />
              </TableCell>
              <TableCell>{user.is_active ? "Yes" : "No"}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleDeactivate(user)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  </Box>
);
}