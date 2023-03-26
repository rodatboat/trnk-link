import { styled } from "@mui/system";
import { Button, Switch } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const styles = {
  login: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontWeight: "extraBold",
    fontSize: {
      xs: 28,
      md: 38,
    },
    lineHeight: 1.2,
    // whiteSpace: "nowrap"
  },
  title2: {
    fontWeight: "extraBold",
    fontSize: 32,
    lineHeight: 1.2,
    // whiteSpace: "nowrap"
  },
  subtitle: {
    fontWeight: "regular",
    fontSize: 16,
  },
  hint: {
    fontWeight: "regular",
    fontSize: 10,
    lineHeight: 1,
  },
  input: {
    "&.input-error": {
      borderColor: "error",
    },
    "&.MuiTextField-root": {
      borderRadius: 1,
    },
    "& label.Mui-focused": {
      color: "accent.hover",
    },
    "& .MuiInput-underline:after": {
      // borderBottomColor: 'blue',
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        // borderColor: 'accent.main',
      },
      "&:hover fieldset": {
        // borderColor: 'yellow',
      },
      "&.Mui-focused fieldset": {
        borderColor: "black.main",
      },
    },
    backgroundColor: "secondary.main",
  },
  elementSettings: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "primary.main",
    border: 1,
    borderColor: "complement.main",
    borderRadius: 1,
    padding: 1,
    // paddingY: 1,
    boxShadow: 1,
    height: "100%",
    overflow: "hidden",
  },
  previewLeft: {
    backgroundColor: "secondary.main",
    width: {
      xs: "100% !important",
      sm: "100% !important",
      md: "65% !important",
      lg: "70% !important",
    },
    borderRight: {
      xs: 0,
      md: 1,
    },
    height: "fit-content",
    minHeight: "100%",
  },
  previewRight: {
    backgroundColor: "secondary.main",
    display: {
      xs: "none",
      sm: "none",
      md: "block",
    },
    width: {
      xs: 0,
      sm: 0,
      md: "35%",
      lg: "30%",
    },
    position:"fixed",
    right:0,
    height:"100%",
    ".user-preview":{
      border: 12,
      borderRadius: 4,
      overflowY:"hidden",
      transform: {
        xs:"scale(.60)",
        md:"scale(.75)",
        lg:"scale(.8)"
      },
    }
  },
  smallButton: {
    border: 1,
    borderRadius: 1,
    // boxShadow: 1,
    width: "fit-content",
    minWidth: "fit-content",
    color: "black.main",
    backgroundColor: "primary.main",
    borderColor: "complement.main",
    maxWidth: "fit-content",
    ".MuiButtonBase-root": {
      maxWidth: "fit-content",
    },
    "&:hover": {
      backgroundColor: "secondary.main",
    },
    overflow: "hidden",
  },
  smallButtonActive: {
    border: 1,
    borderRadius: 1,
    // boxShadow: 1,
    borderColor: "accent.main",
    borderBottomColor: "accent.hover",
    width: "fit-content",
    minWidth: "fit-content",
    backgroundColor: "accent.main",
    maxWidth: "fit-content",
    ".MuiButtonBase-root": {
      maxWidth: "fit-content",
    },
    "&:hover": {
      backgroundColor: "accent.hover",
    },
    overflow: "hidden",
  },
  button: {
    fontSize: 16,
    fontWeight: "medium",
    backgroundColor: "accent.main",
    borderBottom: 1,
    borderColor: "accent.hover",
    borderRadius: 1,
    // boxShadow: 1,
    padding: 1.25,
    textTransform: "none",
    width: "100%",
    "&:hover": {
      backgroundColor: "accent.hover",
    },
    overflow: "hidden",
  },
  button2: {
    backgroundColor: "secondary.main",
    border: 1,
    color: "black.main",
    borderColor: "complement.main",
    borderRadius: 1,
    // boxShadow: 1,
    width: "100%",
    paddingX: 2,
    textTransform: "none",
    "&:hover": {
      backgroundColor: "primary.main",
      // borderColor: "accent.main",
    },
    overflow: "hidden",
  },
  button3: {
    backgroundColor: "accent.main",
    border: 1,
    borderColor: "accent.hover",
    borderRadius: 1,
    // boxShadow: 1,
    width: "100%",
    paddingX: 2,
    textTransform: "none",
    "&:hover": {
      backgroundColor: "accent.hover",
    },
    overflow: "hidden",
  },
  switch: {
    "& .MuiSwitch-thumb": {
      color: "primary",
      border: 1,
      borderColor: "complement.main",
      "&:hover": {
        // backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "accent.main",
      opacity: 1,
    },
  },
  bgStyle:{
    p: 1,
    border: 2,
    borderRadius: 2,
    borderColor: "secondary.main",
    mb: 1,
  },
  bgSelectedStyle:{
    p: 1,
    border: 2,
    borderRadius: 2,
    borderColor: "black",
    mb: 1,
  },
  solidBgMode:{
    backgroundColor: "complement.main",
    width: "100%",
    aspectRatio: "9 / 16",
    borderRadius: 1.5,
  },
  gradientBgMode: {
    background: "linear-gradient(#9e9e9e 0%, #fafafa 100%)",
    width: "100%",
    aspectRatio: "9 / 16",
    borderRadius: 1.5,
  }
};
