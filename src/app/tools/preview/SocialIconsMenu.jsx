import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Button from "@Mui/material/Button";
import { mediaIcons } from "./icons";
import { styles } from "../../styles";
import { motion, useAnimationControls, useAnimation } from "framer-motion";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

function SocialIcon(props) {
    // console.log(`props.icon in SocialIconsMenu.socialicon: ${props.icon}`);
    return (
        <>
            <Box
                sx={{
                    m: 1,
                }}>
                <Button
                    onClick={() => props.createSocialIconElement(props.icon)}>
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
                            // height: "50px",
                            // width: "50px",
                            margin: "auto",
                        }}>
                        <props.icon style={{ p: 1 }} />
                        <Typography variant='caption'>{props.name}</Typography>
                    </Box>
                </Button>
            </Box>
        </>
    );
}

export default function SocialIconsMenu(props) {
    // console.log(mediaIcons);
    const icons = [];
    for (const [key, value] of Object.entries(mediaIcons)) {
        icons.push({ icon: value[0].type, name: key });
    }

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

    return (
        <>
            <Dialog
                open={props.openSocialIconsMenu}
                TransitionComponent={Transition}
                keepMounted
                onClose={props.handleCloseSocialIconsMenu}
                aria-describedby='alert-dialog-slide-description'>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        maxHeight: "50px",
                        overflow: "hidden",
                    }}>
                    <DialogTitle
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}>
                        {"Select a social media icon"}
                        <Box
                            sx={{
                                "&:hover": {
                                    cursor: "pointer",
                                },
                            }}>
                            <Button onClick={props.handleCloseSocialIconsMenu}>
                                <motion.svg
                                    fill='black'
                                    width='100'
                                    height='100'
                                    viewBox='0 0 600 600'
                                    initial='hidden'
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
                                    animate={
                                        props.openSocialIconsMenu
                                            ? "visible"
                                            : "hidden"
                                    }>
                                    <motion.line
                                        x1='220'
                                        y1='30'
                                        x2='360'
                                        y2='170'
                                        stroke='black'
                                        strokeWidth='5'
                                        variants={draw}
                                        custom={2}
                                    />
                                    <motion.line
                                        x1='220'
                                        y1='170'
                                        x2='360'
                                        y2='30'
                                        strokeWidth='5'
                                        stroke='black'
                                        variants={draw}
                                        custom={2.5}
                                    />
                                </motion.svg>
                            </Button>
                        </Box>
                    </DialogTitle>
                </Box>
                {/* <DialogContent>
                     <DialogContentText id='alert-dialog-slide-description'>
                        Let Google help apps determine location. This means
                        sending anonymous location data to Google, even when no
                        apps are running.
                    </DialogContentText> 
                </DialogContent> */}
                <DialogActions
                    sx={{
                        height: "auto",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    {/* <Paper
                        sx={{
                            height: "auto",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        elevation={12}> */}
                    <TextField
                        sx={{
                            ...styles.input,
                            p: 2,
                        }}
                        placeholder='Search...'
                    />
                    <Divider
                        variant='middle'
                        sx={{
                            width: "80%",
                        }}
                    />
                    {/* <Box
                        p={2}
                        sx={
                            {
                                // width: "600px",
                            }
                        }> */}
                    <Box
                        sx={{
                            // width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            p: 2,
                            overflowY: "scroll",
                            maxHeight: "300px",
                        }}>
                        {/* </Box> */}
                        <Grid
                            container
                            justifyContent='center'
                            alignItems='center'
                            rowSpacing={0}
                            columnSpacing={0}
                            columns={{ xs: 2, sm: 4, md: 6 }}
                            rows={{ xs: 2, sm: 4, md: 6 }}
                            maxWidth='100%'
                            margin='auto'>
                            {icons.map((icon, index) => {
                                return (
                                    <Grid key={index} item xs={1}>
                                        <SocialIcon
                                            name={icon.name}
                                            icon={icon.icon}
                                            createSocialIconElement={
                                                props.createSocialIconElement
                                            }
                                        />
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Box>
                    {/* </Paper> */}
                    {/* <Button onClick={props.handleCloseSocialIconsMenu}>
                        Disagree
                        </Button>
                        <Button onClick={props.handleCloseSocialIconsMenu}>
                        Agree
                    </Button> */}
                </DialogActions>
            </Dialog>
        </>
    );
}
