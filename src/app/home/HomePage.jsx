import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { styles } from "../styles";
import { Link } from "react-router-dom";
import {BsGithub,
} from "react-icons/bs";
export default function HomePage() {
  return (
    <Box sx={{
      display:"flex"
      ,flexDirection:"column",
      justifyContent:"space-between",
      height:"100%"
    }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          p: 3,
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
          <Button href={"/register"} sx={{ ...styles.button2, maxWidth: 100 }}>
            Register
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          px: 6,
        }}
        height={"100%"}
        justifyContent={"center"}
      >
        <Typography
          sx={{
            fontSize: 56,
            fontWeight: "extraBold",
          }}
        >
          Everything about you with one platform.
        </Typography>
        <Typography
          sx={{
            fontSize: 24,
          }}
        >
          Create link in bio pages & more.
        </Typography>
        <Box pt={6}>
          <Button
            href={"/tools"}
            sx={{ ...styles.button, maxWidth: 250, fontSize: 18 }}
          >
            Get Started
          </Button>
        </Box>
      </Box>

      <Box display={"flex"} justifyContent={"end"} mb={2} mr={2}>
          <a href="https://github.com/rodatboat/trnk-link"><BsGithub /></a>
      </Box>
    </Box>
  );
}
