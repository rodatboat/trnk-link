// @ts-nocheck
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Modal,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineEdit, MdTitle } from "react-icons/md";
import { BiLinkAlt } from "react-icons/bi";
import { IoShareSocialOutline } from "react-icons/io5";
import { RxDragHandleDots1, RxTrash } from "react-icons/rx";
import { useTheme } from "@mui/material/styles";
import { useFormik } from "formik";
import { RiSaveLine } from "react-icons/ri";
import { toast } from "react-hot-toast";
import { styles } from "../../styles";
import { linkElementValidationSchema } from "./validation/linkElement.validation";
import { mediaIcons } from "./icons";
import { LinkElementTool } from "./elementTools/LinkElementTool";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import fetchComponent from "../../api/components/fetchComponent";
import createComponent from "../../api/components/createComponent";
import updateComponent from "../../api/components/updateComponent";
import deleteComponent from "../../api/components/deleteComponent";
import SocialIconsMenu from "./SocialIconsMenu";
import { TbMenuOrder } from "react-icons/tb";
import changeOrder from "../../api/components/changeOrder";
import { HeaderElementTool } from "./elementTools/HeaderElementTool";

const SocialElementTool = ({ element }) => {
  return (
    <>
      <Box>
        {element}
      </Box>
    </>
  );
};

export default function LinksPage() {
  const [orderChange, setOrderChange] = useState(false);
  const [updated, setUpdated] = useState(null);
  const [linkElements, setLinkElements] = useState([
    // {
    // _id: 1,
    // active: true,
    // elemType: "link",
    // title: "Youtube",
    // link: "https://youtube.com/",
    // icon: mediaIcons.youtube[0],
    // },
    // {
    // _id: 2,
    // active: true,
    // elemType: "header",
    // title: "",
    // link: "",
    // icon: <></>,
    // },
    // {
    // _id: 3,
    // active: true,
    // elemType: "social",
    // title: "",
    // link: "",
    // icon: <></>,
    // },
  ]);
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
        icon: <></>,
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
        elemType: "header",
        title: "",
        // icon: <></>,
      },
    ]);
  };

  const createSocialElement = (icon) => {
    setLinkElements([
      ...linkElements,
      {
        _id: uuidv4(),
        new: true,
        active: true,
        elemType: "social",
        title: "",
        icon: icon,
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

  useEffect(() => {
    getUserLinkElements();
  }, []);

  useEffect(() => {
    getUserLinkElements();
  }, [updated]);

  useEffect(() => {}, [linkElements]);

  const [toggleIconsMenu, setToggleIconsMenu] = useState(false);
  const [openSocialIconsMenu, setOpenSocialIconsMenu] = React.useState(false);
  const [shouldFocus, setShouldFocus] = React.useState(false);

  const handleToggleSocialIconsMenu = () => {
    if(toggleIconsMenu){
      setSearch("");
    }
    setToggleIconsMenu(!toggleIconsMenu);
  }

  const getIcons = () => {
    const icons = Object.entries(mediaIcons).map(([key, value])=>{
     return icons.push({icon: value[value.length - 1].type, name: key})
    });

    return icons;
  };

  // A constant for all icons
  const [search, setSearch] = useState("");
  const [icons, setIcons] = useState(getIcons()); // The icons that match the search query

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    // Always filter the constant icons
    const newIcons = icons.filter((icon) =>
      icon.name.toLowerCase().includes(search.toLowerCase())
    );
    setIcons(newIcons);
  }, [search]);

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
                  linkElements.map((e, i) => (
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
                              deleteElem={deleteLinkElement}
                              dragHandleProps={
                                  ...provided.dragHandleProps
                              }
                              index={i}
                            />
                          ) : e.elemType === "header" ? (
                            <HeaderElementTool
                              element={e}
                              deleteElem={deleteLinkElement}
                              dragHandleProps={
                                  ...provided.dragHandleProps
                              }
                              index={i}
                            />
                          ) : e.elemType === "social" ? (
                            <SocialElementTool
                              element={e.icon}
                              deleteElem={deleteLinkElement}
                              dragHandleProps={
                                  ...provided.dragHandleProps
                              }
                              index={i}
                            />
                          ) : (
                            <></>
                          )}{" "}
                        </Grid>
                      )}{" "}
                    </Draggable>
                  ))
                ) : (
                  <>Empty</>
                )}
                {provided.placeholder}{" "}
              </Grid>
            )}{" "}
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
          icons={icons}
          search={search}
          handleSearchChange={handleSearchChange}
          createSocialIconElement={createSocialElement}
          openSocialIconsMenu={openSocialIconsMenu}
          handleToggleSocialIconsMenu={handleToggleSocialIconsMenu}
        />
      </Box>
    </>
  );
}
