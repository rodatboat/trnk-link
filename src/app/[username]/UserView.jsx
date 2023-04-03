import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import fetchComponent from "../api/components/fetchComponent";
import fetchUser from "../api/user/fetchUser";
import fetchUserLinks from "../api/user/fetchUserLinks";
import { styles } from "../styles";
import SocialIconElement from "../tools/preview/SocialIconElement";
import { elementStyles } from "./elementStyles";

const HeaderElement = ({ element }) => {
  return (
    <>
      <Grid item xs={12}>
        <Box p={2}>
          <Typography sx={elementStyles.title}>{element.title}</Typography>
        </Box>
      </Grid>
    </>
  );
};

const LinkElement = ({ element }) => {
  return (
    <>
      <Grid item xs={12}>
        <Link to={element.link}>
          <Box p={2} sx={elementStyles.squareStyle}>
            <Typography sx={elementStyles.elementText}>
              {element.title}
            </Typography>
          </Box>
        </Link>
      </Grid>
    </>
  );
};

const SocialElement = ({ element }) => {
  return (
    <>
      <Grid item xs={2} sm={2}>
        <Link to={element.link}>
          <Box
            p={2}
            color={"black"} // user color
          >
            <SocialIconElement iconName={element.icon} fontSize={32} />
          </Box>
        </Link>
      </Grid>
    </>
  );
};

export default function UserView({ minHeight = "100vh", setUsername = null }) {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [viewBackground, setViewBackground] = useState({
    background: "secondary.main",
  });

  const fetchData = async () => {
    await fetchUserLinks(username).then((data) =>
      data.success ? setUser(data.data) : setUser(null)
    );
  };

  const generateColor = () => {
    const selectedMode = user.user.background.mode;
    const selectedColors = user.user.background.colors;
    if (selectedMode === "gradient") {
      setViewBackground({
        background: `linear-gradient(90deg, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)`,
      });
    } else if (selectedMode === "solid") {
      setViewBackground({
        backgroundColor: `${selectedColors[0]}`,
      });
    }
  };

  const updateUser = () => {
    if(setUsername){
      setUser(setUsername);
    } else {
      fetchData();
    }
  }

  useEffect(() => {
    updateUser();
  }, []);

  useEffect(() => {
    updateUser();
  }, [setUsername]);

  useEffect(() => {
    if(user){
      generateColor();
    }
  }, [user]);

  useEffect(() => {
  }, [viewBackground]);

  return (
    <Box
    px={2}
    pt={8}
    pb={4}
    display={"flex"}
    minHeight={"100vh"}
    height={"fit-content"}
      sx={viewBackground}
    >
      {user ? (
        <Box mx={"auto"} maxWidth={680} textAlign={"center"}>
          <Box mb={4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 100,
                width: 100,
                borderRadius: 10,
                backgroundColor: "#000",
                mx: "auto",
                mb: 2,
              }}
            >
              <Typography color={"white"} fontSize={32} fontWeight={"medium"}>
                {user.user.username[0].toUpperCase()}
              </Typography>
            </Box>
            <Typography sx={elementStyles.username} color={"black"}>
              {user.user.displayName}
            </Typography>
            <Typography sx={elementStyles.bio} color={"black"}>
              {user.user.bio}
            </Typography>
          </Box>

          <Grid
            container
            sx={{
              justifyContent: "center",
            }}
            spacing={2}
          >
            {user.elements.map((e, i) =>
              e.elemType === "link" ? (
                <LinkElement key={i} element={e} />
              ) : e.elemType === "header" ? (
                <HeaderElement key={i} element={e} />
              ) : e.elemType === "social" ? (
                <SocialElement key={i} element={e} />
              ) : (
                <></>
              )
            )}
          </Grid>
        </Box>
      ) : (
        <Box mx={"auto"} my={"auto"} maxWidth={680} textAlign={"center"}>
          <Typography fontSize={20} mb={2}>
            The{" "}
            <Box component={"span"} fontWeight={"medium"}>
              TrnkLink
            </Box>{" "}
            you're looking for doesn't exist
          </Typography>
          <Typography fontSize={14}>
            Want this username?{" "}
            <Box
              component={"a"}
              display={"inline"}
              href="/register"
              sx={{ textDecoration: "underline" }}
            >
              Create an account
            </Box>
          </Typography>
        </Box>
      )}
    </Box>
  );
}
