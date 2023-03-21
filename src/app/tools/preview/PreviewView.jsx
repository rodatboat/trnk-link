import { Box, Typography } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import { styles } from "../../styles";

export default function PreviewView() {
  return (
    <Box sx={{
      display: "flex",
      flexDirection:"row",
      height: "100%"
    }}>
      <Box sx={styles.previewLeft} p={2}>
        <Outlet />
      </Box>
      <Box sx={styles.previewRight} p={2}>
        <Typography>TEST</Typography>
      </Box>
    </Box>
  );
}
