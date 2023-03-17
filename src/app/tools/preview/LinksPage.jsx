// @ts-nocheck
import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BiLinkAlt } from "react-icons/bi";
import { IoShareSocialOutline } from "react-icons/io5";
import { styles } from "../../styles";
import { icons } from "./icons";
import { LinkElementTool } from "./elementTools/LinkElementTool";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import fetchComponent from "../../api/components/fetchComponent";
import SocialIconsMenu from "./SocialIconsMenu";
import { TbMenuOrder } from "react-icons/tb";
import changeOrder from "../../api/components/changeOrder";
import { HeaderElementTool } from "./elementTools/HeaderElementTool";
import { SocialElementTool } from "./elementTools/SocialElementTool";
import SocialIconElement from './SocialIconElement';
import { MdTitle } from "react-icons/md";

export default function LinksPage() {
  const [orderChange, setOrderChange] = useState(false);
  const [updated, setUpdated] = useState(null);
  const [linkElements, setLinkElements] = useState([]);
  const [toggleIconsMenu, setToggleIconsMenu] = useState(false);
  const [shouldFocus, setShouldFocus] = React.useState(false);
  const [search, setSearch] = useState("");
  const [resultIcons, setResultIcons] = useState(icons); // The icons that match the search query

  const createLinkElement = () => {
    setLinkElements([
      ...linkElements,
      {
        _id: uuidv4(),
        new: true,
        active: true,
        elemType: "link",
        title: "",
        link: "",
        icon: "",
      },
    ]);
  };

  const createSocialIconElement = (icon) => {
    setLinkElements([
      ...linkElements,
      {
        _id: uuidv4(),
        new: true,
        active: true,
        elemType: "social",
        title: "",
        link: "",
        icon: icon,
      },
    ]);
  };

  const createHeaderElement = () => {
    setLinkElements([
      ...linkElements,
      {
        _id: uuidv4(),
        new: true,
        active: true,
        link: "",
        elemType: "header",
        title: "",
        icon: "",
      },
    ]);
  };

  const deleteLinkElement = (e) => {
    let newList = linkElements.filter((i) => i._id !== e._id);
    if (newList !== linkElements) {
      setLinkElements(newList);
    }
    setUpdated(Math.random());
  };

  const updateLinkElement = (e, new_e) => {
    let newList = linkElements.filter((i) => i._id !== e._id);
    newList.push(new_e);
    if (newList !== linkElements) {
      setLinkElements(newList);
    }
    setUpdated(Math.random());
  }

  const getUserLinkElements = async () => {
    await fetchComponent().then((data) => setLinkElements(data));
    // setLinkElements()
  };

  const handleDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    const newLinkElements = Array.from(linkElements);

    // Swap elements by destructuring
    [newLinkElements[source.index], newLinkElements[destination.index]] = [
      newLinkElements[destination.index],
      newLinkElements[source.index],
    ];

    if (linkElements !== newLinkElements) {
      setOrderChange(true);
    }
    setLinkElements(newLinkElements);
  };

  const handleOrderChange = () => {
    if (orderChange) {
      changeOrder(linkElements.filter((e) => !e.new));
    }
    setOrderChange(false);
  };

  const handleToggleSocialIconsMenu = () => {
    setShouldFocus(!shouldFocus);
    if (toggleIconsMenu) {
      setSearch("");
    }
    setToggleIconsMenu(!toggleIconsMenu);
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

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    searchIcons();
  }, [search]);

  useEffect(() => {
    getUserLinkElements();
  }, []);

  useEffect(() => {
    // getUserLinkElements();
  }, [updated]);

  useEffect(() => {}, [linkElements]);

  return (
    <>
      <Box m={"auto"} maxWidth={640}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Box
              mt={1}
              mb={0.5}
              sx={{
                backgroundColor: "primary",
                color: "secondary",
                borderColor: "complement.main",
              }}
            >
              <Typography color={"secondary"} sx={{ fontWeight: "regular" }}>
                Choose what element to create:
              </Typography>
            </Box>
          </Grid>

          {/* Create Link */}
          <Grid item xs={12}>
            <Box>
              <Button onClick={createLinkElement} sx={styles.button2}>
                <Typography
                  color={"secondary"}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontWeight: "regular",
                  }}
                  fontSize={14}
                >
                  <Box
                    component={"span"}
                    sx={{ display: "inline-flex" }}
                    p={0.5}
                  >
                    <BiLinkAlt fontSize={16} />
                  </Box>
                  Link
                </Typography>
              </Button>
            </Box>
          </Grid>

          {/* Create Header */}
          <Grid item xs={6}>
            <Box>
              <Button onClick={createHeaderElement} sx={styles.button2}>
                <Typography
                  color={"secondary"}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontWeight: "regular",
                  }}
                  fontSize={14}
                >
                  <Box
                    component={"span"}
                    sx={{ display: "inline-flex" }}
                    p={0.5}
                  >
                    <MdTitle fontSize={16} />
                  </Box>
                  Header
                </Typography>
              </Button>
            </Box>
          </Grid>

          {/* Create Icon */}
          <Grid item xs={6}>
            <Box>
              <Button onClick={handleToggleSocialIconsMenu} sx={styles.button2}>
                <Typography
                  color={"secondary"}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontWeight: "regular",
                  }}
                  fontSize={14}
                >
                  <Box
                    component={"span"}
                    sx={{ display: "inline-flex" }}
                    p={0.5}
                  >
                    <IoShareSocialOutline fontSize={16} />
                  </Box>
                  Social Icon
                </Typography>
              </Button>
            </Box>
          </Grid>

          {/* Order Change Button */}
          <Grid item xs={12} display={orderChange ? "block" : "none"}>
            <Box>
              <Button sx={styles.button} onClick={handleOrderChange}>
                <Typography
                  color={"#fff"}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontWeight: "medium",
                  }}
                  fontSize={14}
                >
                  <Box
                    component={"span"}
                    sx={{ display: "inline-flex" }}
                    p={0.5}
                  >
                    <TbMenuOrder fontSize={16} />
                  </Box>
                  Save Link Order
                </Typography>
              </Button>
            </Box>
          </Grid>
        </Grid>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="link-element">
            {(provided) => (
              <Grid
                mt={2}
                container
                spacing={2.5}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {linkElements ? (
                  linkElements.sort((a, b)=> !b.new - !a.new).map((e, i) => (
                    <Draggable key={e._id} draggableId={e._id} index={i}>
                      {(provided) => (
                        <Grid
                          item
                          xs={12}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          {e.elemType === "link" ? (
                            <LinkElementTool
                              className={"link-element"}
                              element={e}
                              updateElem={updateLinkElement}
                              deleteElem={deleteLinkElement}
                              dragHandleProps={provided.dragHandleProps}
                              index={i}
                            />
                          ) : e.elemType === "header" ? (
                            <HeaderElementTool
                              element={e}
                              updateElem={updateLinkElement}
                              deleteElem={deleteLinkElement}
                              dragHandleProps={provided.dragHandleProps}
                              index={i}
                            />
                          ) : e.elemType === "social" ? (
                            <SocialElementTool
                              element={e}
                              updateElem={updateLinkElement}
                              deleteElem={deleteLinkElement}
                              dragHandleProps={provided.dragHandleProps}
                              index={i}
                            />
                          ) : (
                            <></>
                          )}
                        </Grid>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <>Empty</>
                )}
                {provided.placeholder}
              </Grid>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "100%",
        }}
      >
        <SocialIconsMenu
          shouldFocus={shouldFocus}
          icons={resultIcons}
          search={search}
          handleSearchChange={handleSearchChange}
          createSocialIconElement={createSocialIconElement}
          toggleIconsMenu={toggleIconsMenu}
          handleToggleSocialIconsMenu={handleToggleSocialIconsMenu}
        />
      </Box>
    </>
  );
}
