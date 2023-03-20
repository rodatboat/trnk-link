import {createTheme} from "@mui/material"

export const theme = {
    palette: {
        mode:"light",
        primary:{
            // Light will be main, dark will be dark.
            main:"#fff",
            dark:"#000"
        },
        secondary:{
            main:"#fafafa",
        },
        complement:{
            main:"#9e9e9e", // rgba(215, 215, 215, 0.6)
        },
        black:{
            main: "#000"
        },
        accent:{
          main:"#CF5C36",
          hover:"#B54E2C" 
        },
        info:{
            main:"#5b97ff",
            light: "#7aabff"
        },
        success:{
          main:"#07BC0C",
          light:"#d0ffd1",
        },
        error:{
            main:"#dc3545",
            light:"#ed5a69"
        },
    },
    shape: {
        borderRadius: 12
    },
    breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 900,
          lg: 1200,
          xl: 1536,
        },
    },
    typography:{
        fontFamily:"Montserrat",
        fontWeightLight: 400,
        fontWeightRegular: 500,
        fontWeightMedium: 600,
        fontWeightBold:700,
        fontWeightExtraBold:800
    },
};