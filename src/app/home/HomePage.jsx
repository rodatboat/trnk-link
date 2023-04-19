import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { styles } from "../styles";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <Box>
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            p: 1,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography fontWeight={"extraBold"} fontSize={18}>
              TrnkLink
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
            }}
          >
            <Button href={"/login"} sx={{ ...styles.button2, maxWidth: 100 }}>
              Login
            </Button>
            <Button
              href={"/register"}
              sx={{ ...styles.button2, maxWidth: 100 }}
            >
              Register
            </Button>
          </Box>
        </Box>

        <Box sx={{
          display:"flex",
          flexDirection:"column"
        }} height={"80vh"} justifyContent={"center"}>
          <Typography sx={{
            fontSize:28
          }}>Everything about you with one platform.</Typography>
          <Typography sx={{
            fontSize:18
          }}>Create link in bio pages & more.</Typography>
          <Button href={"/tools"} sx={{ ...styles.button, maxWidth: 200 }}>
            Get Started
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
