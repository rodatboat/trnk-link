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
      <Grid item xs={2} sm={1}>
        <Link to={element.link}>
          <Box
            p={2}
            color={"black"} // user color
          >
            <Typography sx={elementStyles.elementText}>
              {element.title}
            </Typography>
            <SocialIconElement iconName={element.icon} fontSize={32} />
          </Box>
        </Link>
      </Grid>
    </>
  );
};

export default function UserView() {
  const { username } = useParams();
  const [user, setUser] = useState(null);

  const fetchData = async () => {
    await fetchUserLinks(username).then((data) => setUser(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Box
        sx={{
          paddingX: 2,
          paddingTop: 8,
          paddingBottom: 4,
          backgroundColor: "secondary.main", // user background for entire page
        }}
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
                @{user.user.username}
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
          <></>
        )}
      </Box>
    </>
  );
}
