import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import { styles } from "../../styles";

export default function PreviewView() {
  return (
    <Box backgroundColor={"secondary"}>
      <Box sx={styles.previewLeft} p={2}>
        <Outlet />
      </Box>
      <Box sx={styles.previewRight}></Box>
    </Box>
  );
}
