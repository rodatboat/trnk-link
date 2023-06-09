import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BiLinkAlt } from "react-icons/bi";
import { IoShareSocialOutline } from "react-icons/io5";
import { styles } from "../../styles";
import { LinkElementTool } from "./elementTools/LinkElementTool";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import fetchComponent from "../../api/components/fetchComponent";
import SocialIconsMenu from "./SocialIconsMenu";
import { TbMenuOrder } from "react-icons/tb";
import changeOrder from "../../api/components/changeOrder";
import { HeaderElementTool } from "./elementTools/HeaderElementTool";
import { SocialElementTool } from "./elementTools/SocialElementTool";
import SocialIconElement from "./SocialIconElement";
import { MdTitle } from "react-icons/md";
import { useOutletContext } from "react-router-dom";

export default function LinksPage() {
  const [nextIndex, setNextIndex] = useState(0);
  const [orderChange, setOrderChange] = useState(false);
  const [linkElements, setLinkElements] = useState([]);
  const [toggleIconsMenu, setToggleIconsMenu] = useState(false);
  const [shouldFocus, setShouldFocus] = useState(false);
  const [currentComponents, setCurrentComponents] = useOutletContext();

  const createLinkElement = () => {
    setLinkElements([
      ...linkElements,
      {
        _id: uuidv4(),
        index: linkElements.length,
        new: true,
        active: true,
        elemType: "link",
        title: "",
        link: "",
        icon: "",
        version: uuidv4(),
      },
    ]);
  };

  /**
   * Creates a social icon element, using the icon passed and adds it to the list
   * of link elements.
   *
   * @param {String} icon the icon used to create the element
   */
  const createSocialIconElement = (icon) => {
    setLinkElements([
      ...linkElements,
      {
        _id: uuidv4(),
        index: linkElements.length,
        new: true,
        active: true,
        elemType: "social",
        title: "",
        link: "",
        icon: icon,
        version: uuidv4(),
      },
    ]);
  };

  const createHeaderElement = () => {
    setLinkElements([
      ...linkElements,
      {
        _id: uuidv4(),
        index: linkElements.length,
        new: true,
        active: true,
        link: "",
        elemType: "header",
        title: "",
        icon: "",
        version: uuidv4(),
      },
    ]);
  };

  const deleteLinkElement = (e) => {
    let newList = linkElements.filter((i) => i._id !== e._id);
    if (newList !== linkElements) {
      setLinkElements(newList);
    }
  };

  /**
   * Updates existing element component or creates a new one if it doesn't
   * already exist in the DB.
   * 
   * @param {*} e Current element
   * @param {*} new_e Updated element
   * @param {*} elemIsNew If the element is new or previously existing
   */
  const updateLinkElement = (e, new_e, elemIsNew = false) => {
    if (elemIsNew) {
      let newList = linkElements.filter((i) => i._id !== e._id);
      newList.push(new_e);
      if (newList !== linkElements) {
        setLinkElements(newList);
      }
    } else {
      const newList = linkElements.map((i) =>
        i._id === e._id ? { ...new_e, version: uuidv4() } : i
      );
      if (newList !== linkElements) {
        setLinkElements(newList);
      }
    }
  };

  /**
   * Fetch user element components from DB.
   */
  const getUserLinkElements = async () => {
    await fetchComponent().then((data) => {
      setNextIndex(data.length);
      return setLinkElements(data);
    });
  };

  /**
   * Handles the logic behind click-and-drag and changing the order of 
   * the link elements state.
   * 
   * @param {*} result
   * @returns 
   */
  const handleDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const newLinkElements = Array.from(linkElements);

    const [removed] = newLinkElements.splice(result.source.index, 1);
    newLinkElements.splice(result.destination.index, 0, removed);

    if (linkElements !== newLinkElements) {
      setOrderChange(true);
    }

    setLinkElements(newLinkElements);
  };

  /**
   * Checks which elements' indices need to be updated and calls changeOrder
   */
  const handleOrderChange = () => {
    // Components is the array of links that need to be updated
    const components = linkElements.filter((component, i) => {
      if (component.index !== i) {
        // Set the new component's index value to its index in the state array
        component.index = i;
        return component;
      }
    });

    if (components.length > 0) {
      changeOrder(components);
    }

    setOrderChange(false);
  };

  const handleToggleSocialIconsMenu = () => {
    setShouldFocus(!shouldFocus);
    setToggleIconsMenu(!toggleIconsMenu);
  };

  useEffect(() => {
    getUserLinkElements();
  }, []);

  useEffect(()=>setCurrentComponents({
    ...currentComponents,
    elements:linkElements.filter((e)=>!e.new)
  }),[linkElements]);

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
                color: "black",
                borderColor: "complement.main",
              }}
            >
              <Typography color={"black"} sx={{ fontWeight: "regular" }}>
                Choose what element to create:
              </Typography>
            </Box>
          </Grid>

          {/* Create Link */}
          <Grid item xs={12}>
            <Box>
              <Button onClick={createLinkElement} sx={styles.button2}>
                <Typography
                  color={"black"}
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
                  color={"black"}
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
                  color={"black"}
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
                {linkElements.length > 0 ? (
                  linkElements
                    .sort((a, b) => !b.new - !a.new)
                    .map((e, i) => (
                      <Draggable
                        key={e.version ? e._id + e.version : e._id}
                        draggableId={e._id}
                        index={i}
                      >
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
                                index={nextIndex}
                                setIndex={setNextIndex}
                              />
                            ) : e.elemType === "header" ? (
                              <HeaderElementTool
                                element={e}
                                updateElem={updateLinkElement}
                                deleteElem={deleteLinkElement}
                                dragHandleProps={provided.dragHandleProps}
                                index={nextIndex}
                                setIndex={setNextIndex}
                              />
                            ) : e.elemType === "social" ? (
                              <SocialElementTool
                                element={e}
                                updateElem={updateLinkElement}
                                deleteElem={deleteLinkElement}
                                dragHandleProps={provided.dragHandleProps}
                                index={nextIndex}
                                setIndex={setNextIndex}
                              />
                            ) : (
                              <></>
                            )}
                          </Grid>
                        )}
                      </Draggable>
                    ))
                ) : (
                  <></>
                )}
                {provided.placeholder}
              </Grid>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
      {/* Social Icons Menu Modal */}
      <SocialIconsMenu
        shouldFocus={shouldFocus}
        onSocialIconSelect={createSocialIconElement}
        toggleIconsMenu={toggleIconsMenu}
        handleToggleSocialIconsMenu={handleToggleSocialIconsMenu}
      />
    </>
  );
}
