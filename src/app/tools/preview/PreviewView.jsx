import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { styles } from "../../styles";
import UserView from "../../[username]/UserView";
import Frame, { FrameContextConsumer } from "react-frame-component";

export default function PreviewView() {
  const [currentComponents, setCurrentComponents] = useState({
    user: { username: window.localStorage.getItem("username") },
    elements: [],
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        overflow:"hidden"
      }}
    >
      <Box sx={styles.previewLeft} p={2}>
        <Outlet context={[currentComponents, setCurrentComponents]} />
      </Box>
      <Box sx={styles.previewRight}>
        <Box
          height={500}
          width={300}
          border={4}
          mx={"auto"}
          overflow={"hidden"}
        >
          <Box overflow="scroll">
            <UserView setUsername={currentComponents} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
