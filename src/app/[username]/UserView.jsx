import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import fetchComponent from "../api/components/fetchComponent";
import fetchUser from "../api/user/fetchUser";
import SocialIconElement from "../tools/preview/SocialIconElement";

/**
 * This component handles the social icons,
 * which are all together either above or below the LinkElements
 *
 * @param {Array} icons - An array of social icons
 * @returns {React.FC} - A React function component
 */
const SocialIcons = ({ icons }) => {
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      {icons.map((icon, i) => (
        <Link
          key={i}
          to={`https://${icon.link}`}
          rel="noopener"
          target="_blank"
        >
          <Box
            sx={{
              m: 1,
            }}
          >
            <SocialIconElement key={i} iconName={icon.icon} />
          </Box>
        </Link>
      ))}
    </Box>
  );
};

/**
 * This component handles link and header elements
 *
 * @param {Array} links - The array of link elements
 * @returns {React.FC}
 */
const LinkElements = ({ links }) => {
  return (
    <>
      {links.map((link, i) => {
        return link.elemType === "link" ? (
          <Link
            key={i}
            rel="noopener"
            target="_blank"
            to={`https://${link.link}`}
          >
            <Box
              sx={{
                m: 2,
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                width: "600px",
                height: "50px",
                border: "1px solid rgba(0, 0, 0, 0.8)",
                borderRadius: "25px",
              }}
            >
              {link.title}
            </Box>
          </Link>
        ) : (
          <Box
            key={i}
            sx={{
              m: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "600px",
              height: "50px",
            }}
          >
            <Typography variant="h6">{link.title}</Typography>
          </Box>
        );
      })}
    </>
  );
};

export default function UserView() {
  // The user's data. I guess these are not actually stateful in this component. This is more just a static webapage.
  const [links, setLinks] = useState(null);
  const [user, setUser] = useState(null);
  const [icons, setIcons] = useState(null);
  const iconsTop = true; // Whether the icons are above or below the links

  // Need a field in the user schema for social icons on top or bottom of links. Or some other solution.

  /**
   * Fetches the user and components, filters the icons
   * from the headers and links, and sets state
   *
   * @return {void}
   */
  const getData = async () => {
    const components = await fetchComponent().then((data) => data);
    const user = await fetchUser().then((data) => data);

    const links = components.filter(
      (component) =>
        component.elemType === "header" || component.elemType === "link"
    );
    const icons = components.filter(
      (component) => component.elemType === "social"
    );

    setLinks(links);
    setUser(user);
    setIcons(icons);
  };

  // Fetch the user's data on page load
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: "5rem",
        }}
      >
        {/* Wait for user data to be ready */}
        {user && links && (
          <>
            {/* Profile picture */}
            {/* This null is a placeholder until we add a profile picture to the user schema */}
            {user.image ? null : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "5rem",
                  width: "5rem",
                  borderRadius: "50%",
                  backgroundColor: "red",
                  m: 1,
                }}
              >
                {user.username[0].toUpperCase()}
              </Box>
            )}

            {/* Username */}
            <Typography variant="h5" sx={{ m: 1 }}>
              @{user.username}
            </Typography>

            {/* Links Section */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                flexDirection: "column",
                alignItems: "center",
                height: "60vh",
              }}
            >
              {/* If user wants icons above links */}
              {iconsTop && <SocialIcons icons={icons} />}

              {/* Links */}
              <LinkElements links={links} />

              {/* If user wants icons below links */}
              {!iconsTop && <SocialIcons icons={icons} />}
            </Box>
          </>
        )}
      </Box>
    </>
  );
}
