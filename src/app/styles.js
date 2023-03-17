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
  subtitle: {
    fontWeight: "regular",
    fontSize: 16,
  },
  hint: {
    fontWeight: "regular",
    fontSize: 10,
    lineHeight: 1,
  },
  smallButton: {
    border: 1,
    borderRadius: 1,
    // boxShadow: 1,
    width: "fit-content",
    minWidth: "fit-content",
    backgroundColor: "#fff",
    borderColor: "complement.main",
    maxWidth: "fit-content",
    ".MuiButtonBase-root": {
      maxWidth: "fit-content",
    },
    "&:hover": {},
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
        borderColor: "black",
      },
    },
  },
  previewLeft: {
    width: {
      xs: "60%",
      md: "65%",
      lg: "70%",
    },
    borderRight: 1,
    minHeight: "100vh",
    height: "100%",
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
    paddingY: 2,
    boxShadow: 1,
    height: "100%",
  },
  previewRight: {
    width: "100%",
  },
  button2: {
    backgroundColor: "primary",
    border: 1,
    color: "secondary",
    borderColor: "complement.main",
    borderRadius: 1,
    boxShadow: 1,
    width: "100%",
    paddingX: 2,
    textTransform: "none",
    "&:hover": {
      // borderColor: "accent.main",
    },
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
  scrollbarStyled:{
    '::-webkit-scrollbar-track': {
        WebkitBoxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
        borderRadius: '10px',
        backgroundColor: 'primary.main'
      },
      '::-webkit-scrollbar': {
        width: '12px',
        backgroundColor: 'primary.main'
      },
      '::-webkit-scrollbar-thumb': {
        borderRadius: '10px',
        WebkitBoxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
        backgroundColor: 'complement.main'
      }
}
};
