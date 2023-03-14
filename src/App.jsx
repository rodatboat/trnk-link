import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { ThemeProvider } from "@mui/system";
import { Box, createTheme, CssBaseline } from "@mui/material";
import { theme } from "./theme";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./app/home/HomePage";
import PrivateRoute from "./PrivateRoute";
import LoginPage from "./app/login/LoginPage";
import RegisterPage from "./app/register/RegisterPage";
import ToolsView from "./app/tools/ToolsView";

function App() {
  // const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [themeMode, setThemeMode] = useState(createTheme(theme));

  useEffect(() => {
    // setThemeMode({
    //   ...themeMode,
    //   palette:{
    //     ...themeMode.palette,
    //     mode:"light"
    //   }
    // });
    // verifyLoginStatus();
    // setAppTheme(createTheme(theme));
    console.log("Refreshed");
  }, []);

  return (
    <>
      <ThemeProvider theme={themeMode}>
        <CssBaseline />
        <Box className="App" sx={{ width: "100%", height: "100%" }}>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={
                <PrivateRoute or={<LoginPage />}>
                  <Navigate to="/tools" />
                </PrivateRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PrivateRoute or={<RegisterPage />}>
                  <Navigate to="/tools" />
                </PrivateRoute>
              }
            />
            <Route
              path="/tools/*"
              element={
                <PrivateRoute or={<LoginPage />}>
                  <ToolsView />
                </PrivateRoute>
              }
            />
            {/* <Route path="/privacy-policy" element={<Privacy />}/> */}
            {/* <Route path="/forgotpassword" element={<ForgotPassword />} /> */}
            {/* <Route path="/reset-password/:userId/:token" element={<ResetPassword />} /> */}
            {/* <Route exact path="/logout" element={<LogOut />} /> */}
            {/* <Route path="/*" element={<Navigate to={"/"} />} /> */}
          </Routes>
        </Box>
        <Toaster
          position="bottom-right"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            className: "",
            duration: 3000,
            iconTheme: {
              primary: "#CF5C36",
              secondary: "#fafafa",
            },
            style: {
              // border: '1px solid #CF5C36'
            },
          }}
        />
      </ThemeProvider>
    </>
  );
}

export default App;
