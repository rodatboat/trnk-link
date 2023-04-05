import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { style } from "@mui/system";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { useOutletContext } from "react-router-dom";
import fetchUserLinks from "../../api/user/fetchUserLinks";
import { styles } from "../../styles";
import { profileValidationSchema } from "./validation/profile.validation";
import { ChromePicker, SketchPicker } from "react-color";
import BackgroundsForm from "./BackgroundsForm";
import updateUser from "../../api/user/updateUser";
import { RiSaveLine } from "react-icons/ri";

export default function CustomizePage() {
  const [currentComponents, setCurrentComponents] = useOutletContext();

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
    validationSchema: profileValidationSchema,
  });

  const handleUserUpdate = async () => {
    await updateUser({
      displayName: values.displayName,
      bio: values.bio,
    }).then((data) => {
      setCurrentComponents({
        ...currentComponents,
        user: {
          ...currentComponents.user,
          displayName: data.user.displayName,
          bio: data.user.bio,
        },
      });
    });
  };

  const fetchUserData = async () => {
    await fetchUserLinks(window.localStorage.getItem("username")).then(
      (data) => {
        setFieldValue("displayName", data.data.user.displayName);
        setFieldValue("bio", data.data.user.bio);

        setCurrentComponents({
          user: { ...data.data.user },
          elements: data.data.elements,
        });
      }
    );
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <Box m={"auto"} maxWidth={640}>
      <Typography sx={styles.title2} mt={6} mb={2} px={1}>
        Customize
      </Typography>
      <Box sx={{ ...styles.elementSettings, p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <Box>
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
                }}
              >
                <Typography color={"white"} fontSize={32} fontWeight={"medium"}>
                  R{/* {user.user.username[0].toUpperCase()} */}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Box
              sx={{
                display: "flex",
                height: "100%",
                flexDirection: "column",
                justifyContent: "space-evenly",
                gap: 1,
              }}
            >
              <TextField
                id={"displayName"}
                type="text"
                value={values.displayName}
                error={errors.displayName && touched.displayName}
                onBlur={handleBlur}
                onChange={handleChange}
                helperText={
                  errors.displayName &&
                  touched.displayName &&
                  errors.displayName
                }
                sx={{ ...styles.input, width: "100%" }}
                placeholder="Display Name"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" color="secondary">
                      <MdOutlineEdit />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end" color="secondary">
                      <Typography fontSize={12}>
                        {values.displayName.length > 0
                          ? `${values.displayName.length}/30`
                          : ""}
                      </Typography>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                id={"bio"}
                type="text"
                value={values.bio}
                error={errors.bio && touched.bio}
                onBlur={handleBlur}
                onChange={handleChange}
                helperText={errors.bio && touched.bio && errors.bio}
                sx={{ ...styles.input, width: "100%", mt: 1 }}
                multiline
                placeholder="Bio"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" color="secondary">
                      <MdOutlineEdit />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end" color="secondary">
                      <Typography fontSize={12}>
                        {values.bio.length > 0
                          ? `${values.bio.length}/120`
                          : ""}
                      </Typography>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box
              textAlign={"center"}
              mt={2}
              display={
                values.displayName === currentComponents.user.displayName &&
                values.bio === currentComponents.user.bio
                  ? "none"
                  : "block"
              }
            >
              <Button
                sx={{ ...styles.smallButton, textTransform: "none", borderColor:"accent.hover" }}
                onClick={handleUserUpdate}
              >
                <Box sx={{ pr: 1, display: "flex", alignItems: "center", color: "accent.main" }}>
                  <RiSaveLine fontSize={18} />
                </Box>
                <Typography color={"accent.main"} sx={styles.hint}>
                  Unsaved Changes
                </Typography>
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Typography sx={styles.title2} mt={6} mb={2} px={1}>
        Themes
      </Typography>
      <Box sx={{ ...styles.elementSettings, p: 2 }}>
        <Grid container>
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

      <BackgroundsForm user={currentComponents.user} />

      <Typography sx={styles.title2} mt={6} mb={2} px={1}>
        Buttons
      </Typography>
      <Box sx={{ ...styles.elementSettings, p: 2 }}>
        <Grid container>
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
    </Box>
  );
}
