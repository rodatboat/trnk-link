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
import { mediaIcons } from "./icons";
import { styles } from "../../styles";
import { motion } from "framer-motion";


const scrollbarStyles = {
    '::-webkit-scrollbar-track': {
        WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
        borderRadius: '10px',
        backgroundColor: '#F5F5F5'
      },
      '::-webkit-scrollbar': {
        width: '12px',
        backgroundColor: '#F5F5F5'
      },
      '::-webkit-scrollbar-thumb': {
        borderRadius: '10px',
        WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,.3)',
        backgroundColor: '#555'
      }
}
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

function SocialIcon(props) {

    const handleClick = () => {
        props.createSocialIconElement(props.icon)
        props.handleCloseMenu();
    }
    return (
        <>
            <Box
                sx={{
                    m: 1,
                }}>
                <Button
                    onClick={handleClick}>
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
                        }}>
                        <props.icon style={{ p: 1, color: "black", height: "40px", width: "40px" }} />
                        <Typography sx={{ color: "black" }}variant='caption'>{props.name}</Typography>
                    </Box>
                </Button>
            </Box>
        </>
    );
}

export default function SocialIconsMenu(props) {
    
    const getIcons = () => {
        const icons = [];

        for (const [key, value] of Object.entries(mediaIcons)) {
            if (value[1]) {
                icons.push({ icon: value[1].type, name: key })
            }
            else {
                icons.push({ icon: value[0].type, name: key });
            }
        }

        return icons;
    }

    // A constant for all icons 
    const ICONS = getIcons();

    const [search, setSearch] = React.useState("");
    const [icons, setIcons] = React.useState(ICONS); // The icons that match the search query

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    }
    

    

    React.useEffect(() => {        
        // Always filter the constant icons
        const newIcons = ICONS.filter(icon => icon.name.toLowerCase().includes(search.toLowerCase()));
        setIcons(newIcons);

    }, [search])

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
                aria-describedby='alert-dialog-slide-description'
                margin="0">
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
                <DialogActions
                    sx={{
                        height: "auto",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: 0
                    }}>
                    <TextField
                        sx={{
                            ...styles.input,
                            p: 2,
                        }}
                        placeholder='Search...'
                        value={search}
                        onChange={handleSearchChange}
                    />
                    <Divider
                        variant='middle'
                        sx={{
                            width: "80%",
                        }}
                    />
                    <Box
                    sx={{
                        display: "flex",
                        m: "0 !important",
                        p: 0,
                        justifyContent: "center",
                        width: "100%",
                        alignItems: "center",
                        top: 0,
                        left: 0,
                        boxSizing: "border-box",
                    }}
                        >
                    <Box
                        sx={{
                            width: "100%",
                            // maxWidth: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            p: 1,
                            overflowY: "scroll",
                            overflowX: "hidden",
                            maxHeight: "300px",  
                            ...scrollbarStyles,

                        }} >
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
                            {icons.map((icon, index) => {
                                return (
                                    <Grid key={index} item xs={1}>
                                        <SocialIcon
                                            name={icon.name}
                                            icon={icon.icon}
                                            createSocialIconElement={
                                                props.createSocialIconElement
                                            }
                                            handleCloseMenu={props.handleCloseSocialIconsMenu}
                                        />
                                    </Grid>
                                );
                            })}
                            {icons.length === 0 ? 
                                <Typography>No icons found</Typography> : null}
                        </Grid>
                    </Box>
                    </Box>
                </DialogActions>
            </Dialog>
        </>
    );
}
