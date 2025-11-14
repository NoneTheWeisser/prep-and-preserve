import { useState, useEffect } from "react";
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

export default function ProfileSettings() {
  const user = useStore((state) => state.user);
  const updateProfile = useStore((state) => state.updateProfile);
  const updatePassword = useStore((state) => state.updatePassword);

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
      (error, result) => {
        if (!error && result && result.event === "success") {
          setProfileImage(result.info.secure_url);
          updateProfile({ profile_image_url: result.info.secure_url });
        }
      }
    );

    widget.open();
  };

  const handlePasswordUpdate = async () => {
    setPasswordError("");
    setPasswordSuccess("");

    if (!oldPassword || !newPassword) {
      setPasswordError("Please fill out both fields.");
      return;
    }

    try {
      await updatePassword({ oldPassword, newPassword });
      setPasswordSuccess("Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        setPasswordError("Old password is incorrect");
      } else {
        setPasswordError("Failed to update password. Please try again");
      }
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

        {/*todo -  Stretch goals - theme toggle, notifcations?  */}
      </Box>
    </Box>
  );
}
