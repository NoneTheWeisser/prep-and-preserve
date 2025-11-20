import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Stack,
  Button,
  Avatar,
  Typography,
  TextField,
  Alert,
} from "@mui/material";
import useStore from "../../zustand/store";
import { useNavigate } from "react-router-dom";

export default function ProfileSettings() {
  const user = useStore((state) => state.user);
  const updateProfile = useStore((state) => state.updateProfile);
  const updatePassword = useStore((state) => state.updatePassword);
  const deactivateAccount = useStore((state) => state.deactivateAccount);
  const showSnackbar = useStore((state) => state.showSnackbar);
  const logOut = useStore((state) => state.logOut);
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  useEffect(() => {
    if (user) {
      setProfileImage(user.profile_image_url || "");
    }
  }, [user]);

  const openCloudinaryWidget = () => {
    if (!window.cloudinary) return;

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDINARY_NAME,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
        sources: ["local", "url", "camera"],
      },
      async (error, result) => {
        if (!error && result && result.event === "success") {
          const url = result.info.secure_url;
          setProfileImage(url);

          try {
            await updateProfile({ profile_image_url: url });
            showSnackbar({
              message: "Profile picture updated!",
              severity: "success",
            });
          } catch (err) {
            console.error(err);
            showSnackbar({
              message: "Failed to update profile picture.",
              severity: "error",
            });
          }
        }
      }
    );
    widget.open();
  };

  const handlePasswordUpdate = async () => {
    setPasswordError("");
    setPasswordSuccess("");

    if (!oldPassword || !newPassword) {
      showSnackbar({
        message: "Please fill out both fields.",
        severity: "warning",
      });
      return;
    }

    try {
      await updatePassword({ oldPassword, newPassword });
      setOldPassword("");
      setNewPassword("");
      showSnackbar({
        message: "Password updated successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error(error);
      showSnackbar({
        message:
          error.response?.status === 401
            ? "Old password is incorrect"
            : "Failed to udpate password.",
        severity: "error",
      });
    }
  };

  const handleDeactivateAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to deactivate your account? This can be reversed by contacting support."
    );
    if (!confirmed) return;

    try {
      await deactivateAccount();
      showSnackbar({ message: "Your account has been deactivated.", severity: "success"});
      logOut();
      navigate("/");
    } catch (err) {
      console.error("Error deactivating account:", err);
      showSnackbar({ message: "Something went wrong. Please try again.", severity: "error" });
    }
  };

  return (
    <Box>
      <img
        src={"/img/pexels-zvolskiy-2062426.jpg"}
        alt={"MyRecipe header image"}
        style={{
          width: "100%",
          height: "400px",
          objectFit: "cover",
          // borderBottom: "4px solid #000000ff",
        }}
      />
      <Box sx={{ p: 2, maxWidth: 600, mx: "auto" }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Profile Settings
        </Typography>
        {/* Profile pic update */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Profile Picture
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center ">
            <Avatar
              src={profileImage}
              alt={user?.username || "Profile"}
              sx={{ width: 80, height: 80 }}
            />
            <Button variant="contained" onClick={openCloudinaryWidget}>
              Change Profile Picture
            </Button>
          </Stack>
        </Box>
        {/* Password update */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Change Password
          </Typography>
          <Stack spacing={2}>
            {passwordError && <Alert severity="error">{passwordError}</Alert>}
            {passwordSuccess && (
              <Alert severity="success">{passwordSuccess}</Alert>
            )}
            <TextField
              label="Current Password"
              type="password"
              value={oldPassword}
              onChange={(e) => {
                setOldPassword(e.target.value);
                setPasswordError("");
                setPasswordSuccess("");
              }}
              fullWidth
            />
            <TextField
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setPasswordError("");
                setPasswordSuccess("");
              }}
              fullWidth
            />
            <Button variant="contained" onClick={handlePasswordUpdate}>
              Update Password
            </Button>
          </Stack>
        </Box>

        {/* deactivate account  */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Deactivate Account
          </Typography>
          <Stack spacing={2}>
            <Button variant="contained" onClick={handleDeactivateAccount}>
              Deactivate Account
            </Button>
          </Stack>
        </Box>

        {/*todo -  Stretch goals - theme toggle, notifcations?  */}
      </Box>
    </Box>
  );
}
