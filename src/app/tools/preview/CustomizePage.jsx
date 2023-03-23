import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { useOutletContext } from "react-router-dom";
import fetchUserLinks from "../../api/user/fetchUserLinks";
import { styles } from "../../styles";
import { profileValidationSchema } from "./validation/profile.validation";

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
    onSubmit: async (values, actions) => {
      await handleUserUpdate(values, actions);
    },
  });

  const handleUserUpdate = async (values, actions) => {};

  const fetchUserData = async () => {
    await fetchUserLinks(window.localStorage.getItem("username")).then(
      (data) => {
        setFieldValue("displayName", data.data.user.displayName);
        setFieldValue("bio", data.data.user.bio);

        setCurrentComponents({
          user: { ...currentComponents.user, ...data.data.user },
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
      <Box component={"form"} sx={{ ...styles.elementSettings, p: 2 }}>
        <Grid container>
          <Grid item xs={5} sm={3}>
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
          <Grid item xs={7} sm={9}>
            <Box
              sx={{
                display: "flex",
                height: "100%",
                flexDirection: "column",
                justifyContent: "space-evenly",
                gap: 1,
              }}
            >
              <Button
                sx={{ ...styles.button2, height: "100%" }}
                type="submit"
                disabled={
                  isSubmitting ||
                  (values.displayName === currentComponents.user.displayName &&
                    values.bio === currentComponents.user.bio)
                }
              >
                Save
              </Button>
              <Button sx={{ ...styles.button2, height: "100%" }}>Cancel</Button>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box mt={4}>
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
                <Typography color={"accent.main"} sx={styles.hint}>
                  Unsaved Changes
                </Typography>
              </Box>
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

      <Typography sx={styles.title2} mt={6} mb={2} px={1}>
        Backgrounds
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
