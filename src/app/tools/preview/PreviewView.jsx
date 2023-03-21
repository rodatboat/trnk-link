import { Box, Typography } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import { styles } from "../../styles";
import UserView from "../../[username]/UserView";
import Frame, { FrameContextConsumer } from 'react-frame-component';

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
      <Box sx={styles.previewRight}>
        <Box height={500} width={300} border={1}><UserView minHeight="100%" setUsername={"rollypollyro"} /></Box>
      </Box>
    </Box>
  );
}
