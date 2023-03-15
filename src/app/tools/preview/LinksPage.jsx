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
import { v4 as uuidv4 } from "uuid";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import fetchComponent from "../../api/components/fetchComponent";
import createComponent from "../../api/components/createComponent";
import updateComponent from "../../api/components/updateComponent";
import deleteComponent from "../../api/components/deleteComponent";
import { TbMenuOrder } from "react-icons/tb";
import changeOrder from "../../api/components/changeOrder";

const LinkElementTool = ({ element, deleteElem, index, dragHandleProps }) => {
  const theme = useTheme();
  const [activeToggle, setActiveToggle] = useState(element.active);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    initialValues,
  } = useFormik({
    initialValues: {
      title: element.title,
      link: element.link,
      icon: element.icon,
    },
    validationSchema: linkElementValidationSchema,
    onSubmit: async (values, actions) => {
      if (element.new) {
        await handleCreate(values, actions);
      } else {
        if (initialValues !== values) {
          await handleUpdate(values, actions);
        }
      }
    },
  });

  const handleActiveToggle = () => {
    setActiveToggle(!activeToggle);
  };

  const handleDeleteDialogToggle = () => {
    setDeleteDialog(!deleteDialog);
  };

  const handleDelete = async () => {
    handleDeleteDialogToggle();
    if (element.new) {
      deleteElem(element);
    } else {
      deleteComponent({ _id: element._id });
      deleteElem(element);
    }
  };

  const handleUpdate = async (values, actions) => {
    updateComponent({
      ...values,
      _id: element._id,
      active: activeToggle,
    });
    deleteElem(element);
  };

  const handleCreate = async (values, actions) => {
    createComponent({
      ...values,
      elemType: element.elemType,
      active: activeToggle,
    });
    deleteElem(element);
  };

  return (
    <>
      <Box
        sx={styles.elementSettings}
        component={"form"}
        onSubmit={handleSubmit}
      >
        <Modal
          open={deleteDialog}
          onClose={handleDeleteDialogToggle}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "fit-content",
              backgroundColor: "primary.main",
              border: 2,
              borderColor: "black",
              p: 1,
            }}
          >
            <Box m={2} minWidth={300}>
              <Typography
                variant="h6"
                component="h2"
                textAlign={"center"}
                mb={4}
              >
                Delete this forever?
              </Typography>
              <Box display={"flex"} flexDirection={"row"} gap={1}>
                <Button
                  onClick={handleDeleteDialogToggle}
                  sx={styles.button2}
                  color={"secondary"}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDelete}
                  sx={styles.button3}
                  color={"primary"}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>

        <Box
          id="handle-box"
          pr={1.5}
          display={"flex"}
          alignItems={"center"}
          {...dragHandleProps}
        >
          <RxDragHandleDots1 />
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          height={"100%"}
          justifyContent={"space-evenly"}
          width={"100%"}
        >
          <TextField
            id={"title"}
            type="text"
            value={values.title}
            error={errors.title && touched.title}
            onBlur={handleBlur}
            onChange={handleChange}
            helperText={errors.title && touched.title && errors.title}
            sx={styles.input}
            placeholder="Title"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" color="secondary">
                  <MdOutlineEdit />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id={"link"}
            type="text"
            value={values.link}
            error={errors.link && touched.link}
            onBlur={handleBlur}
            onChange={handleChange}
            helperText={errors.link && touched.link && errors.link}
            sx={styles.input}
            placeholder="https://www.example.com/"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" color="secondary">
                  <MdOutlineEdit />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box
          pl={1.5}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          height={"100%"}
          gap={2}
        >
          <Box>
            <Switch
              defaultChecked={values.active}
              checked={activeToggle}
              onChange={handleActiveToggle}
              onBlur={handleBlur}
              size="small"
              sx={styles.switch}
            />
          </Box>
          <Box>
            <Button
              color={"secondary"}
              sx={{
                border: 1,
                borderRadius: 1,
                boxShadow: 1,
                width: "fit-content",
                minWidth: "fit-content",
                borderColor: "complement.main",
                maxWidth: "fit-content",
                ".MuiButtonBase-root": {
                  maxWidth: "fit-content",
                },
              }}
              type="submit"
              disabled={isSubmitting || initialValues === values}
            >
              <RiSaveLine fontSize={18} />
            </Button>
          </Box>
          <Box>
            <Button
              color={"secondary"}
              sx={{
                border: 1,
                borderRadius: 1,
                boxShadow: 1,
                width: "fit-content",
                minWidth: "fit-content",
                borderColor: "complement.main",
                maxWidth: "fit-content",
                ".MuiButtonBase-root": {
                  maxWidth: "fit-content",
                },
              }}
              onClick={handleDeleteDialogToggle}
            >
              <RxTrash fontSize={18} />
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};
const HeaderElementTool = ({ element }) => {
  return <>Header</>;
};
const SocialElementTool = ({ element }) => {
  return <>Social</>;
};

export default function LinksPage() {
  const [orderChange, setOrderChange] = useState(false);
  const [updated, setUpdated] = useState(null);
  const [linkElements, setLinkElements] = useState([
    // {
    //   _id: 1,
    //   active: true,
    //   elemType: "link",
    //   title: "Youtube",
    //   link: "https://youtube.com/",
    //   icon: mediaIcons.youtube[0],
    // },
    // {
    //   _id: 2,
    //   active: true,
    //   elemType: "header",
    //   title: "",
    //   link: "",
    //   icon: <></>,
    // },
    // {
    //   _id: 3,
    //   active: true,
    //   elemType: "social",
    //   title: "",
    //   link: "",
    //   icon: <></>,
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
        // icon: <></>,
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

    if(linkElements !== newLinkElements){
      setOrderChange(true);
    }
    setLinkElements(newLinkElements);
  };

  const handleOrderChange = () => {
    if(orderChange){
      changeOrder(linkElements.filter((e)=> !e.new));
    }
    setOrderChange(false);
  }

  useEffect(() => {
    getUserLinkElements();
  }, []);

  useEffect(() => {
    getUserLinkElements();
  }, [updated]);

  useEffect(() => {}, [linkElements]);

  return (
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
            <Typography
              color={"secondary"}
              sx={{
                fontWeight: "regular",
              }}
            >
              Choose what element to create:
            </Typography>
          </Box>
        </Grid>

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
                  sx={{
                    display: "inline-flex",
                  }}
                  p={0.5}
                >
                  <BiLinkAlt fontSize={16} />
                </Box>
                Link
              </Typography>
            </Button>
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Box>
            <Button sx={styles.button2}>
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
                  sx={{
                    display: "inline-flex",
                  }}
                  p={0.5}
                >
                  <MdTitle fontSize={16} />
                </Box>
                Header
              </Typography>
            </Button>
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Box>
            <Button sx={styles.button2}>
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
                  sx={{
                    display: "inline-flex",
                  }}
                  p={0.5}
                >
                  <IoShareSocialOutline fontSize={16} />
                </Box>
                Social Icon
              </Typography>
            </Button>
          </Box>
        </Grid>

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
                  sx={{
                    display: "inline-flex",
                  }}
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
            spacing={1}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {
              linkElements ? (
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
                            dragHandleProps={...provided.dragHandleProps}
                            index={i}
                          />
                        ) : e.elemType === "header" ? (
                          <HeaderElementTool
                            element={e}
                            deleteElem={deleteLinkElement}
                            dragHandleProps={...provided.dragHandleProps}
                            index={i}
                          />
                        ) : e.elemType === "social" ? (
                          <SocialElementTool
                            element={e}
                            deleteElem={deleteLinkElement}
                            dragHandleProps={...provided.dragHandleProps}
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
              )
            }
            {provided.placeholder}
          </Grid>
        )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
}
