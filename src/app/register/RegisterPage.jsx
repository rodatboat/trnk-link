import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import React, { useEffect } from 'react'
import registerUser from '../api/user/registerUser';
import { styles } from '../styles';
import {registerValidationSchema} from '../validation/register.validation'

export default function RegisterPage() {
    const {values, touched, errors, handleBlur, handleChange, handleSubmit, isSubmitting} = useFormik({
      initialValues: {
        username: "",
        email: "",
        password: "",
      },
      validationSchema: registerValidationSchema,
      onSubmit: async (values, actions) => {
        await registerUser(values);
      },
    });
  
    useEffect(()=>{
      if(Cookies.get("jwt")){
        window.location.href = "/tools";
      }
    },[]);
  
    return (
        <Box
        m={"auto"}
        height={"100vh"}
        display={"flex"}
      >
        <Box
          component={"form"}
          maxWidth={"500px"}
          width={"100%"}
          m={"auto"}
          onSubmit={handleSubmit}
        >
          <Box mb={4}>
            <Typography mb={1} sx={styles.title}>
              Create your account
            </Typography>
            <Typography sx={styles.subtitle} color={"complement.main"}>
              Choose your TrnkLink handle.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <TextField
              placeholder="Username"
              id={"username"}
              type="text"
              value={values.username}
              error={errors.username && touched.username}
              onBlur={handleBlur}
              onChange={handleChange}
              sx={styles.input}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" color="secondary">
                    trnkl.ink/
                  </InputAdornment>
                ),
              }}
              helperText={errors.username && touched.username && errors.username}
            />
            <TextField
              placeholder="Email"
              id={"email"}
              type="text"
              value={values.email}
              error={errors.email && touched.email}
              onBlur={handleBlur}
              onChange={handleChange}
              sx={styles.input}
              helperText={errors.email && touched.email && errors.email}
            />
            <TextField
              placeholder="Password"
              id={"password"}
              error={errors.password && touched.password}
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              sx={styles.input}
              type="password"
              helperText={errors.password && touched.password && errors.password}
            />
          </Box>
          <Box mt={8}>
            <Button type="submit" sx={styles.button} disabled={isSubmitting}>
              Create Account
            </Button>
            <Typography
              textAlign={"center"}
              sx={styles.subtitle}
              color={"complement.main"}
              mt={2}
            >
              Already have an account?{" "}
              <Box component={"a"} display={"inline"} href="/login" color={"black"}>
                Log in
              </Box>
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }