import { useEffect } from "react";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import { Tabs, Tab, Box } from "@mui/material";
import AdminTags from "./AdminTags";
import AdminUsers from "./AdminUsers";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentTab = location.pathname.includes("/tags") ? "tags" : "users";

  const handleChange = (event, newValue) => {
    navigate(`/admin/${newValue}`);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ position: "relative" }}>
        <img
          src={"/img/pexels-rachel-claire-5490824.jpg"}
          alt={"MyRecipe header image"}
          style={{
            width: "100%",
            height: "300px",
            objectFit: "cover",
            // borderBottom: "4px solid #000000ff",
          }}
        />

        <Box sx={{ justifyContent: "center" }}>
          <h2>Admin Dashboard</h2>
          <Tabs
            value={currentTab}
            onChange={handleChange}
            centered
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Users" value="users" />
            <Tab label="Tags" value="tags" />
            <Tab label="Recipes" value="recipes" />
          </Tabs>

          <Box sx={{ mt: 5 }}>
            <Routes>
              <Route path="users" element={<AdminUsers />} />
              <Route path="tags" element={<AdminTags />} />
              <Route path="" element={<AdminUsers />} /> {/* default tab */}
            </Routes>
          </Box>
        </Box>
      </div>
    </div>
  );
}
