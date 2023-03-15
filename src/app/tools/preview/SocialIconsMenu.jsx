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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

function SocialIcon(props) {
    return (
        <>
            <Box
                sx={{
                    m: 1,
                }}>
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
            </Box>
        </>
    );
}

export default function SocialIconsMenu(props) {
    console.log(mediaIcons);
    const icons = [];
    for (const [key, value] of Object.entries(mediaIcons)) {
        icons.push({ icon: value[0].type, name: key });
    }

    console.log(icons);
    return (
        <>
            <Dialog
                open={props.openSocialIconsMenu}
                TransitionComponent={Transition}
                keepMounted
                onClose={props.handleCloseSocialIconsMenu}
                aria-describedby='alert-dialog-slide-description'>
                <DialogTitle>{"Select a social media icon"}</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText id='alert-dialog-slide-description'>
                        Let Google help apps determine location. This means
                        sending anonymous location data to Google, even when no
                        apps are running.
                    </DialogContentText> */}
                    <Paper
                        sx={{
                            height: "auto",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        elevation={12}>
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
                        <Box
                            p={2}
                            sx={
                                {
                                    // width: "600px",
                                }
                            }>
                            <Box
                                sx={{
                                    // width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    p: 2,
                                    overflowY: "scroll",
                                    maxHeight: "300px",
                                }}></Box>
                        </Box>
                    </Paper>
                </DialogContent>
                <DialogActions>
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
                                    />
                                </Grid>
                            );
                        })}
                    </Grid>
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
