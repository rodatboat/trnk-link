// @ts-nocheck
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@Mui/material/Button";
import { styles } from "../../styles";
import { useFocusableInput } from "../../hooks/useFocusableInput";
import { IoMdClose } from "react-icons/io";
import { Modal } from "@mui/material";

function SocialIcon({ IconComp, createSocialIconElement, handleCloseMenu }) {
  const handleClick = () => {
    createSocialIconElement(IconComp.name);
    handleCloseMenu();
  };

  return (
    <>
      <Box display={"flex"} justifyContent={"center"}>
        <Button
          onClick={handleClick}
          sx={{
            border: 1,
            borderColor: "primary.main",
            "&:hover": {
              borderColor: "complement.main",
              cursor: "pointer",
            },
            borderRadius: 1,
            p: 2,
            aspectRatio: "1 / 1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconComp
            style={{
              p: 1,
              color: "black",
              width: "40px",
              height: "40px",
            }}
          />
        </Button>
      </Box>
    </>
  );
}

export default function SocialIconsMenu({
  toggleIconsMenu,
  handleToggleSocialIconsMenu,
  search,
  handleSearchChange,
  icons,
  createSocialIconElement,
  shouldFocus,
}) {
  const { setInputRef } = useFocusableInput(shouldFocus);
  useEffect(() => {}, [icons]);

  return (
    <>
      <Modal
        open={toggleIconsMenu}
        onClose={handleToggleSocialIconsMenu}
        keepMounted
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%",

              p: 4,
            }}
          >
            <Box
              sx={{
                backgroundColor: "primary.main",
                border: 1,
                borderRadius: 1,
                borderColor: "black",
              }}
            >
              <Box m={2} minWidth={"fit-content"}>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  mb={3}
                >
                  <Typography variant="h6" component="h2" textAlign={"center"}>
                    Select a social media icon
                  </Typography>
                  <Box>
                    <Button
                      sx={styles.button2}
                      onClick={handleToggleSocialIconsMenu}
                    >
                      <IoMdClose color={"#000"} fontSize={20} />
                    </Button>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    "& .MuiFormControl-root": {
                      width: "100%",
                      px: 3,
                    },
                  }}
                >
                  <TextField
                    inputRef={setInputRef}
                    sx={styles.input}
                    placeholder="Search..."
                    value={search}
                    onChange={handleSearchChange}
                  />
                  <Box my={2} px={5} width={"100%"}>
                    <Divider />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        overflowX: "hidden",
                        maxHeight: "300px",
                        minHeight: "300px",
                        width: "100%",
                        p: 1,
                        border: 1,
                        borderRadius: 1,
                        borderColor: "complement.main",
                      }}
                    >
                      <Grid container width="100%" spacing={1}>
                        {icons.map((icon, i) => {
                          return (
                            <Grid key={i} item xs={3} md={2} xl={1}>
                              <SocialIcon
                                name={icon.name}
                                IconComp={icon.icon}
                                createSocialIconElement={
                                  createSocialIconElement
                                }
                                handleCloseMenu={handleToggleSocialIconsMenu}
                              />
                            </Grid>
                          );
                        })}
                        {icons.length <= 0 ? (
                          <Grid item xs={12}>
                            <Typography
                              textAlign={"center"}
                              m={2}
                              color={"complement.main"}
                            >
                              No icons found
                            </Typography>
                          </Grid>
                        ) : (
                          <></>
                        )}
                      </Grid>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
