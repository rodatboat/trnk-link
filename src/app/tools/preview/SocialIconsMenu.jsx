// @ts-nocheck
import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Button from "@Mui/material/Button";
import { styles } from "../../styles";
import { motion } from "framer-motion";
import { useFocusableInput } from "../../hooks/useFocusableInput";

const scrollbarStyles = {
  "::-webkit-scrollbar-track": {
    WebkitBoxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
    borderRadius: "10px",
    backgroundColor: "#F5F5F5",
  },
  "::-webkit-scrollbar": {
    width: "12px",
    backgroundColor: "#F5F5F5",
  },
  "::-webkit-scrollbar-thumb": {
    borderRadius: "10px",
    WebkitBoxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
    backgroundColor: "#555",
  },
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function SocialIcon(props) {
  // console.log(props.icon);
  const handleClick = () => {
    props.createSocialIconElement(props.icon);
    props.handleCloseMenu();
  };

  return (
    <>
      <Box
        sx={{
          m: 1,
        }}
      >
        <Button onClick={handleClick}>
          <Box
            sx={{
              "&:hover": {
                backgroundColor: "rgba(215, 215, 215, 0.6)",
                cursor: "pointer",
              },
              borderRadius: "5px",
              p: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "100px",
              width: "100px",
              margin: "auto",
            }}
          >
            <props.icon.icon
              style={{ p: 1, color: "black", height: "40px", width: "40px" }}
            />
            <Typography sx={{ color: "black" }} variant="caption">
              {props.icon.name}
            </Typography>
          </Box>
        </Button>
      </Box>
    </>
  );
}

export default function SocialIconsMenu(props) {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => {
      const delay = 0.15;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: {
            delay,
            type: "spring",
            duration: 0.5,
            bounce: 0.1,
          },
          opacity: { delay, duration: 0.01 },
        },
      };
    },
  };

  const { setInputRef } = useFocusableInput(props.shouldFocus);

  return (
    <>
      <Dialog
        open={props.openSocialIconsMenu}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleCloseSocialIconsMenu}
        aria-describedby="alert-dialog-slide-description"
        width="100%"
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            maxHeight: "50px",
            overflow: "hidden",
          }}
        >
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {"Select a social media icon"}
            <Box
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              <Button onClick={props.handleCloseSocialIconsMenu}>
                <motion.svg
                  fill="black"
                  width="100"
                  height="100"
                  viewBox="0 0 600 600"
                  initial="hidden"
                  style={{
                    color: "black",
                    translateX: "40px",
                  }}
                  whileHover={{
                    scale: 1.05,
                  }}
                  transition={{
                    type: "spring",
                    duration: 0.5,
                  }}
                  animate={props.openSocialIconsMenu ? "visible" : "hidden"}
                >
                  <motion.line
                    x1="220"
                    y1="30"
                    x2="360"
                    y2="170"
                    stroke="black"
                    strokeWidth="5"
                    variants={draw}
                    custom={2}
                  />
                  <motion.line
                    x1="220"
                    y1="170"
                    x2="360"
                    y2="30"
                    strokeWidth="5"
                    stroke="black"
                    variants={draw}
                    custom={2.5}
                  />
                </motion.svg>
              </Button>
            </Box>
          </DialogTitle>
        </Box>
        <DialogActions
          sx={{
            height: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: 0,
            width: "100%",
          }}
        >
          <TextField
            inputRef={setInputRef}
            sx={{
              ...styles.input,
              p: 2,
            }}
            placeholder="Search..."
            value={props.search}
            onChange={props.handleSearchChange}
          />
          <Divider
            variant="middle"
            sx={{
              width: "80%",
            }}
          />
          <Box
            sx={{
              display: "flex",
              m: "0 !important",
              justifyContent: "center",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                // maxWidth: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflowY: "scroll",
                overflowX: "hidden",
                maxHeight: "300px",
                ...scrollbarStyles,
              }}
            >
              {/* </Box> */}
              <Grid
                container
                rowSpacing={0}
                columnSpacing={0}
                columns={{ xs: 2, sm: 4, md: 5 }}
                rows={{ xs: 2, sm: 4, md: 5 }}
                margin="auto"
                width="100%"
              >
                {props.icons.map((icon, index) => {
                  return (
                    <Grid key={index} item xs={1}>
                      <SocialIcon
                        icon={icon}
                        createSocialIconElement={props.createSocialIconElement}
                        handleCloseMenu={props.handleCloseSocialIconsMenu}
                        // clearSearch={clearSearch}
                      />
                    </Grid>
                  );
                })}
                {props.icons.length === 0 ? (
                  <Typography>No icons found</Typography>
                ) : null}
              </Grid>
            </Box>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
}
