import { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Button,
  Avatar,
  Typography,
  TextField,
} from "@mui/material";
import useStore from "../../zustand/store";

export default function ProfileSettings() {
  const user = useStore((state) => state.user);
  const updateProfile = useStore((state) => state.updateProfile);
  const updatePassword = useStore((state) => state.updatePassword);

  const [profileImage, setProfileImage] = useState("");
  const [newPassword, setNewPassword] = useState("");

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

  const handlePasswordUpdate = () => {
    if (!newPassword) return;
    updatePassword(newPassword);
    setNewPassword("");
  };
  return (
    <Box>
      <img
        src={"/img/pexels-rachel-claire-5490824.jpg"}
        alt={"MyRecipe header image"}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
          // borderBottom: "4px solid #000000ff",
        }}
      />
      <Box sx={{ p: 2, maxWidth: 600, mx: "auto" }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Profile Settings
        </Typography>
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
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Password
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              type="password"
              label="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              size="small"
            />
            <Button variant="contained" onClick={handlePasswordUpdate}>
              Update
            </Button>
          </Stack>
        </Box>

        {/*todo -  Stretch goals - theme toggle, notifcations?  */}
      </Box>
    </Box>
  );
}
