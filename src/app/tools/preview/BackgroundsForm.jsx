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

// Still need to pass colors from user, and setup formik to handle change by passing a change function into this. Save button needed for form too
const ColorPickTool = ({ defaultColor = "#fff", updateColor }) => {
  const [colorToggle, setColorToggle] = useState(false);
  const [currentColor, setCurrentColor] = useState(defaultColor);

  const handleColorChange = (color) => {
    setCurrentColor(color.hex);
  };

  const handleColorToggle = () => {
    setColorToggle(!colorToggle);
  };

  useEffect(() => {
    updateColor(currentColor);
  }, [currentColor]);
  return (
    <>
      <Box
        sx={
          !colorToggle
            ? {
                ...styles.bgStyle,
                maxWidth: "40px",
                maxHeight: "40px",
                borderRadius: 1.1,
                p: 0.6,
              }
            : {
                ...styles.bgSelectedStyle,
                maxWidth: "40px",
                maxHeight: "40px",
                borderRadius: 1.1,
                p: 0.6,
              }
        }
      >
        <Box
          component={"button"}
          sx={{
            width: "100%",
            aspectRatio: "1/1",
            borderRadius: 0.5,
            backgroundColor: currentColor,
          }}
          onClick={handleColorToggle}
        />
      </Box>
      {colorToggle ? (
        <Box
          sx={{
            position: "absolute",
            zIndex: "2",
          }}
        >
          <Box
            sx={{
              position: "fixed",
              top: "0px",
              right: "0px",
              bottom: "0px",
              left: "0px",
            }}
            onClick={handleColorToggle}
          />
          <ChromePicker color={currentColor} onChange={handleColorChange} />
        </Box>
      ) : null}
    </>
  );
};

export default function BackgroundsForm({ user }) {
  const [currentComponents, setCurrentComponents] = useOutletContext();
  const [updated, setUpdated] = useState(false);
  const [bgModes, setBgModes] = useState([
    {
      name: "solid",
      styling: styles.solidBgMode,
    },
    {
      name: "gradient",
      styling: styles.gradientBgMode,
    },
    // {
    //   name: "Image",
    //   styling: styles.solidBgMode,
    //   active: false,
    // },
    // {
    //   name: "Video",
    //   styling: styles.solidBgMode,
    //   active: false,
    // },
  ]);

  const [backgroundColors, setBackgroundColors] = useState(["#fff","#fff"]);
  const [mode, setMode] = useState("");

  const updateColor = (color) => {
    setBackgroundColors(color);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleModeChange = (mode) => {
    setMode(mode.name);

    // if(mode.name === "gradient"){
    //   setBackgroundColors[colors, "#fff"]
    //   setFieldValue("colors", [...values.colors, "#fff"]);
    // } else if(mode.name === "solid"){
    //   setFieldValue("colors", [...values.colors]);
    // }
  };

  const updateUserBackground = async () => {
    await updateUser({
      background: {
        mode: mode,
        colors: backgroundColors,
      },
    }).then((data) => {
      setCurrentComponents({
        ...currentComponents,
        user:{
          ...currentComponents.user,
          background: {
            mode: data.background.mode,
            colors: data.background.colors,
          },
        }
      });
    });
    setUpdated(false);
  };

  useEffect(() => {
    if (user.background) {
      setMode(user.background.mode);
      if (user.background.colors) {
        // setBackgroundColors(user.background.colors);
      }
    }
  }, [user]);

  useEffect(() => {
    if (
      JSON.stringify(backgroundColors) !==
        JSON.stringify(user.background.colors) ||
      mode !== user.background.mode
    ) {
      setUpdated(true);
    }
  }, [backgroundColors, mode]);

  return (
    <>
      <Typography sx={styles.title2} mt={6} mb={2} px={1}>
        Backgrounds
      </Typography>
      <Box sx={{ ...styles.elementSettings, p: 2 }}>
        <Grid container>
          <Grid item xs={12}>
            <Box mb={1}>
              <Typography
                sx={{ ...styles.subtitle, fontWeight: "bold", pl: 1 }}
              >
                Mode
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Grid container spacing={1}>
                {bgModes.map((mode, i) => (
                  <Grid item xs={4} md={3} key={i}>
                    <Box>
                      <Box
                        sx={
                          user.background
                            ? mode.name === mode
                              ? styles.bgSelectedStyle
                              : styles.bgStyle
                            : styles.bgStyle
                        }
                      >
                        <Box
                          sx={mode.styling}
                          onClick={() => handleModeChange(mode)}
                        />
                      </Box>
                      <Typography textAlign={"center"}>
                        {capitalizeFirstLetter(mode.name)}
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
                sx={{ ...styles.subtitle, fontWeight: "bold", pl: 1 }}
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
                sx={{ ...styles.smallButton, textTransform: "none", borderColor:"accent.hover" }}
                onClick={updateUserBackground}
              >
                <Box sx={{ pr: 1, display: "flex", alignItems: "center", color: "accent.main" }}>
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
