import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { ChromePicker } from "react-color";
import { RiSaveLine } from "react-icons/ri";
import { useOutletContext } from "react-router-dom";
import updateUser from "../../api/user/updateUser";
import { styles } from "../../styles";
import { backgroundFormValidationSchema } from "./validation/backgrounds.validation";
import { ColorPickTool } from "./BackgroundsForm";

export default function ButtonsForm({ user }) {
  const [currentComponents, setCurrentComponents] = useOutletContext();
  const [updated, setUpdated] = useState(false);
  //   "fill", "outline", "hardshadow", "softshadow"
  const [buttonModes, setButtonModes] = useState([
    {
      name: "fill",
      styling: styles.fillButtonMode,
    },
    {
      name: "outline",
      styling: styles.gradientBgMode,
    },
    // {
    //   name: "hardshadow",
    //   styling: styles.gradientBgMode,
    // },
    // {
    //   name: "softshadow",
    //   styling: styles.gradientBgMode,
    // },
  ]);

  const [backgroundColors, setBackgroundColors] = useState([]);
  const [buttonMode, setButtonMode] = useState("");

  const updateColor = (color, i = -1) => {
    if (i !== -1) {
      let colorsCopy = backgroundColors;
      colorsCopy[i] = color;

      setBackgroundColors(colorsCopy);
      setUpdated(true);
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleModeChange = (mode) => {
    if (mode.name !== buttonMode) {
      setButtonMode(mode.name);

      if (mode.name === "gradient") {
        setBackgroundColors([...backgroundColors, "#fff"]);
      } else if (mode.name === "solid") {
        setBackgroundColors([backgroundColors[0]]);
      }
    }
  };

  const updateUserBackground = async () => {
    await updateUser({
      background: {
        mode: buttonMode,
        colors: backgroundColors,
      },
    }).then((data) => {
      setCurrentComponents({
        ...currentComponents,
        user: {
          ...currentComponents.user,
          background: {
            mode: data.background.mode,
            colors: data.background.colors,
          },
        },
      });
    });
    setUpdated(false);
  };

  useEffect(() => {
    if (user.background) {
      setButtonMode(user.background.mode);
      if (user.background.colors) {
        setBackgroundColors(user.background.colors);
      }
    }
  }, [user]);

  useEffect(() => {
    if (
      JSON.stringify(backgroundColors) !==
        JSON.stringify(user.background.colors) ||
      buttonMode !== user.background.mode
    ) {
      setUpdated(true);
    }
  }, [backgroundColors, buttonMode]);

  useEffect(() => {}, [backgroundColors]);

  return (
    <>
      <Typography sx={styles.title2} mt={6} mb={2} px={1}>
        Buttons
      </Typography>
      <Box sx={{ ...styles.elementSettings, p: 2 }}>
        <Grid container>
          <Grid item xs={12}>
            <Box mb={1}>
              <Typography
                sx={{ ...styles.subtitle, fontWeight: "extraBold", pl: 1 }}
              >
                Type
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Grid container spacing={1}>
                {buttonModes.map((indexedMode, i) => (
                  <Grid item xs={4} md={4} key={i}>
                    <Box>
                      <Box
                        sx={
                          indexedMode.name === buttonMode
                            ? styles.bgSelectedStyle
                            : styles.bgStyle
                        }
                      >
                        <Box
                          sx={indexedMode.styling}
                          onClick={() => handleModeChange(indexedMode)}
                        />
                      </Box>
                      <Typography textAlign={"center"}>
                        {capitalizeFirstLetter(indexedMode.name)}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
          {/* <Grid item xs={12}>
            <Box mb={1}>
            <Typography sx={{...styles.subtitle, fontWeight: "bold", pl: 1}}>Direction</Typography>
            </Box>
          </Grid> */}
          <Grid item xs={12}>
            <Box mb={1}>
              <Typography
                sx={{
                  ...styles.subtitle,
                  fontWeight: "extraBold",
                  pl: 1,
                  mt: 6,
                }}
              >
                Color
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box>
              {backgroundColors
                ? backgroundColors.map((c, i) => (
                    <ColorPickTool
                      key={i}
                      defaultColor={c}
                      index={i}
                      updateColor={updateColor}
                    />
                  ))
                : null}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Box
                textAlign={"center"}
                mt={2}
                display={updated ? "block" : "none"}
              >
                <Button
                  sx={{
                    ...styles.smallButton,
                    textTransform: "none",
                    borderColor: "accent.hover",
                  }}
                  onClick={updateUserBackground}
                >
                  <Box
                    sx={{
                      pr: 1,
                      display: "flex",
                      alignItems: "center",
                      color: "accent.main",
                    }}
                  >
                    <RiSaveLine fontSize={18} />
                  </Box>
                  <Typography color={"accent.main"} sx={styles.hint}>
                    Unsaved Changes
                  </Typography>
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
