import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../zustand/store";
import { Tabs, Tab, Box } from "@mui/material";
import AdminTags from "./AdminTags";

export default function AdminDashboard() {
  const fetchUsers = useStore((state) => state.fetchUsers);
  const fetchTags = useStore((state) => state.fetchTags);
  const users = useStore((state) => state.users);
  const tags = useStore((state) => state.ta2gs);

  // useEffect(() => {
  //   fetchUsers();
  //   fetchTags();
  // }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Admin Dashboard</h1>
      <AdminTags />
    </div>
  );
}
