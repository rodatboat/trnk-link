// @ts-nocheck
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { styles } from "../../styles";
import { useFocusableInput } from "../../hooks/useFocusableInput";
import { IoMdClose } from "react-icons/io";
import { Modal, Button } from "@mui/material";
import { icons } from "./icons";

function SocialIcon({
  IconComp,
  onChange,
  handleCloseMenu,
}) {
  const handleClick = () => {
      onChange(IconComp.name);
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
            p: 1,
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
              fontSize: 40
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
  onSocialIconSelect,
  shouldFocus,
}) {
  const [search, setSearch] = useState("");
  const [resultIcons, setResultIcons] = useState(icons);
  const { setInputRef } = useFocusableInput(shouldFocus);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const searchIcons = () => {
    const newIcons = Array.from(icons);

    if (search.length === 0) {
      setResultIcons(newIcons);
      return;
    }

    // Adjust these thresholds as desired for strictness of the search algorithm
    const minThreshold = 0.3; // The threshold when there are few characters in the search query
    const maxThreshold = 0.8; // The threshold when there are many characters in the search query

    /**
     * Calculate the threshold based on the length of the search query
     * using a linear interpolation function (credit chatGPT)
     */
    let threshold =
      minThreshold + ((maxThreshold - minThreshold) * (search.length - 1)) / 5;

    if (threshold > maxThreshold) threshold = maxThreshold;
    else if (threshold < minThreshold) threshold = minThreshold;

    // Map each search query char to the number of times it appears
    const searchQueryChars = {};
    for (let n = 0; n < search.length; n++) {
      if (searchQueryChars[search[n]]) {
        searchQueryChars[search[n]]++;
      } else {
        searchQueryChars[search[n]] = 1;
      }
    }

    for (let j = newIcons.length - 1; j >= 0; j--) {
      // Map each icon char to the number of times it appears
      let currIconChars = {};
      for (let k = 0; k < newIcons[j].name.length; k++) {
        if (currIconChars[newIcons[j].name[k]]) {
          currIconChars[newIcons[j].name[k]]++;
        } else {
          currIconChars[newIcons[j].name[k]] = 1;
        }
      }

      let matchingChars = 0;

      for (let i = 0; i < search.length; i++) {
        // Only if the character was not counted yet, count it
        if (currIconChars[search[i]] > 0) {
          matchingChars++;
          currIconChars[search[i]]--;
        }
      }

      let percentMatchingChars = matchingChars / search.length;
      newIcons[j].percentage = percentMatchingChars;
      if (percentMatchingChars < threshold) {
        newIcons.splice(j, 1);
      }
    }

    // Sort the icons by their percentage in non-decreasing order
    newIcons.sort((a, b) => b.percentage - a.percentage);
    setResultIcons(newIcons);
  };

  useEffect(() => {
    searchIcons();
  }, [search]);

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
              p: 3,
            }}
          >
            <Box
              sx={{
                backgroundColor: "primary.main",
                border: 1,
                borderRadius: 1,
                borderColor: "black",
                maxWidth: "600px",
                maxHeight: "600px",
                p: 1.5,
                // px:1,
                mx: "auto",
              }}
            >
              <Box minWidth={"fit-content"}>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection:"column",
                    alignItems: "center",
                  }}
                  mb={2}
                >
                  <Box alignSelf={"flex-end"} mb={2}>
                    <Button
                      sx={styles.button2}
                      onClick={handleToggleSocialIconsMenu}
                    >
                      <IoMdClose color={"#000"} fontSize={20} />
                    </Button>
                  </Box>
                  <Typography variant="h6" component="h2" textAlign={"left"} fontSize={18}>
                    Select a social media icon
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    "& .MuiFormControl-root": {
                      width: "100%",
                      px: 2,
                    },
                  }}
                >
                  <TextField
                    inputRef={setInputRef}
                    sx={styles.input}
                    placeholder="Search..."
                    value={search}
                    onChange={handleSearchChange}
                    autoComplete="off"
                    size="small"
                  />
                  <Box my={2} px={5} width={"100%"}>
                    <Divider />
                  </Box>
                  <Box
                    sx={{
                      overflow: "hidden",
                      border: 1,
                      borderRadius: 1,
                      maxHeight: "300px",
                      minHeight: "300px",
                      borderColor: "complement.main",
                      width: "100%",
                    }}
                  >
                    <Box
                      p={1}
                      sx={{
                        overflowX: "hidden",
                        overflowY: "scroll",
                        maxHeight: "inherit",
                        width: "100%",
                      }}
                    >
                      <Grid container width="100%" spacing={1}>
                        {resultIcons.map((icon, i) => {
                          return (
                            <Grid key={i} item xs={3} md={2}>
                              <SocialIcon
                                name={icon.name}
                                IconComp={icon.icon}
                                onChange={
                                  onSocialIconSelect
                                }
                                handleCloseMenu={handleToggleSocialIconsMenu}
                              />
                            </Grid>
                          );
                        })}
                        {resultIcons.length <= 0 ? (
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
