import { Box, Button, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { useOutletContext } from "react-router-dom";
import fetchComponent from "../../api/components/fetchComponent";
import { styles } from "../../styles";

export default function CustomizePage() {
  const [currentComponents, setCurrentComponents] = useOutletContext();

  useEffect(() => {
    if (
      currentComponents.elements
        ? currentComponents.elements.length === 0
        : false
    ) {
      fetchComponent().then((data) => {
        setCurrentComponents({
          ...currentComponents,
          elements: data,
        });
      });
    }
  }, []);

  return (
    <Box m={"auto"} maxWidth={640}>
      <Typography sx={styles.title2} mt={6} mb={2} px={1}>
        Customize
      </Typography>
      <Box component={"form"} sx={{...styles.elementSettings, p:2}}>
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
                R
                {/* {user.user.username[0].toUpperCase()} */}
              </Typography>
            </Box>
            </Box>
          </Grid>
          <Grid item xs={7} sm={9}>
            <Box sx={{
              display:"flex",
              height:"100%",
              flexDirection:"column",
              justifyContent:"space-evenly",
              gap:1
            }}>
              <Button sx={{...styles.button2, height:"100%"}}>Save</Button>
              <Button sx={{...styles.button2, height:"100%"}}>Cancel</Button>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box mt={4}>
            <TextField id={"displayName"}
            type="text"
            // value={values.title}
            // error={errors.title && touched.title}
            // onBlur={handleBlur}
            // onChange={handleChange}
            // helperText={errors.title && touched.title && errors.title}
            sx={{...styles.input, width:"100%"}}
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
                    {/* {values.title.length > 0 ? `${values.title.length}/30` : ""} */}
                  </Typography>
                </InputAdornment>
              ),
            }} />
              <TextField id={"bio"}
            type="text"
            // value={values.title}
            // error={errors.title && touched.title}
            // onBlur={handleBlur}
            // onChange={handleChange}
            // helperText={errors.title && touched.title && errors.title}
            sx={{...styles.input, width:"100%", mt:1}}
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
                    {/* {values.title.length > 0 ? `${values.title.length}/120` : ""} */}
                  </Typography>
                </InputAdornment>
              ),
            }} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
