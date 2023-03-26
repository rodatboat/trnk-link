import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { ChromePicker } from "react-color";
import { styles } from "../../styles";

const ColorPickTool = ({defaultColor="#fff"}) => {
  const [colorToggle, setColorToggle] = useState(false);
  const [currentColor, setCurrentColor] = useState(defaultColor)

  const handleColorChange = (color) => {
    setCurrentColor(color.hex)
  };

  const handleColorToggle = () => {
    setColorToggle(!colorToggle);
  };
  return (
    <>
      <Box
        sx={!colorToggle ? {
        ...styles.bgStyle,
          maxWidth: "40px",
          maxHeight: "40px",
          borderRadius: 1.1,
          p: 0.6,
        } : {
            ...styles.bgSelectedStyle,
              maxWidth: "40px",
              maxHeight: "40px",
              borderRadius: 1.1,
              p: 0.6,
            }}
      >
        <Box
          component={"button"}
          sx={{ width:"100%", aspectRatio: "1/1", borderRadius: 0.5, backgroundColor: currentColor }}
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
  const [bgModes, setBgModes] = useState([
    {
      name: "Solid",
      styling: styles.solidBgMode,
      active: true,
    },
    {
      name: "Gradient",
      styling: styles.gradientBgMode,
      active: false,
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

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    initialValues,
    resetForm,
    setFieldValue,
  } = useFormik({
    initialValues: {
      displayName: "",
      bio: "",
    },
    // validationSchema: profileValidationSchema,
    onSubmit: async (values, actions) => {
      await handleUserUpdate(values, actions);
    },
  });

  useEffect(() => {}, [user]);

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
              <Grid container>
                {bgModes.map((mode, i) => (
                  <Grid item xs={4} md={3} key={i}>
                    <Box>
                      <Box
                        sx={
                          mode.active ? styles.bgSelectedStyle : styles.bgStyle
                        }
                      >
                        <Box sx={mode.styling} />
                      </Box>
                      <Typography textAlign={"center"}>{mode.name}</Typography>
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
              <ColorPickTool />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Box textAlign={"center"} mt={2} display={"block"}>
                <Typography color={"accent.main"} sx={styles.hint}>
                  Unsaved Changes
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
