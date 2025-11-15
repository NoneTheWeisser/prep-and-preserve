import * as React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import useStore from "../../zustand/store";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuIcon from "@mui/icons-material/Menu";

export default function Nav() {
  const user = useStore((state) => state.user);
  const logOut = useStore((state) => state.logOut);
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = async () => {
    await logOut();
    navigate("/");
  };

  // Links that always show
  const commonPages = [
    { label: "About", to: "/about" },
    { label: "Community Recipes", to: "/community" },
  ];

  // if not logged in
  const publicPages = [
    // { label: "Home", to: "/" },
    { label: "Login", to: "/login" },
    { label: "Sign Up", to: "/registration" },
  ];

  // if user is logged in
  const privatePages = [
    { label: "My Recipes", to: "/myrecipes" },
    { label: "Add Recipe", to: "/addrecipe" },
  ];

  const pages = [...commonPages, ...(user?.id ? privatePages : publicPages)];

  return (
    <AppBar
      position="static"
      color="white"
      sx={{ boxShadow: "none", borderBottom: "1px solid #e0e0e0" }}
    >
      <Container maxWidth={false}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: { xs: 56, sm: 48 },
            px: 2,
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* --- LEFT: Logo --- */}
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <NavLink to="/">
              <Box
                component="img"
                src="/img/prepperservelogo_horizontal.svg"
                alt="Logo"
                sx={{ height: { xs: 28, md: 40 } }}
              />
            </NavLink>
          </Box>

          {/* --- CENTER: Desktop Links --- */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              gap: 3, // add some spacing between links
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.label}
                component={NavLink}
                to={page.to}
                sx={{ color: "black", textTransform: "none", p: 0 }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          {/* --- RIGHT: Desktop avatar / Mobile avatar + hamburger --- */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              ml: "auto",
            }}
          >
            {/* Desktop avatar */}
            {user?.id && (
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <Tooltip title="Profile Menu">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      src={user?.profile_image_url || undefined}
                      alt={user?.username || "User"}
                      sx={{
                        width: 32,
                        height: 32,
                        fontSize: 16,
                        bgcolor: "#afac9aff",
                      }}
                    >
                      {!user?.profile_image_url &&
                        user?.username?.[0]?.toUpperCase()}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {user?.is_admin && (
                    <MenuItem
                      component={NavLink}
                      to="/admin"
                      onClick={handleCloseUserMenu}
                    >
                      Admin
                    </MenuItem>
                  )}
                  <MenuItem
                    component={NavLink}
                    to="/myrecipes"
                    onClick={handleCloseUserMenu}
                  >
                    My Recipes
                  </MenuItem>
                  <MenuItem
                    component={NavLink}
                    to="/settings"
                    onClick={handleCloseUserMenu}
                  >
                    Profile Settings
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                </Menu>
              </Box>
            )}

            {/* Mobile: avatar first, hamburger second */}
            {user?.id && (
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <Tooltip title="Profile Menu">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      src={user?.profile_image_url || undefined}
                      alt={user?.username || "User"}
                      sx={{
                        width: 32,
                        height: 32,
                        fontSize: 16,
                        bgcolor: "#afac9aff",
                      }}
                    >
                      {!user?.profile_image_url &&
                        user?.username?.[0]?.toUpperCase()}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
            )}

            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                {pages.map((page) => (
                  <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                    <NavLink
                      to={page.to}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {page.label}
                    </NavLink>
                  </MenuItem>
                ))}
                {user?.id && (
                  <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                )}
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
