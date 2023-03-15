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
                await handleUpdate(values, actions);
            }
        },
    });

    const handleActiveToggle = () => {
        setActiveToggle(!activeToggle);
    };

  const handleDelete = async () => {
    handleDeleteDialogToggle();
    if(element.new){
      deleteElem(element);
    } else {
      deleteComponent({_id:element._id});
      deleteElem(element);
    }
  };

  const handleUpdate = async (values, actions) => {
    updateComponent({
      ...values,
      _id:element._id,
      active: activeToggle
    })
  };

  const handleCreate = async (values, actions) => {
    createComponent({
      ...values,
      elemType: element.elemType,
      active: activeToggle
    });
  };

    return (
        <>
            <Box
                sx={styles.elementSettings}
                component={"form"}
                onSubmit={handleSubmit}>
                <Modal
                    open={deleteDialog}
                    onClose={handleDeleteDialogToggle}
                    aria-labelledby='modal-modal-title'
                    aria-describedby='modal-modal-description'>
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
                        }}>
                        <Box m={2} minWidth={300}>
                            <Typography
                                variant='h6'
                                component='h2'
                                textAlign={"center"}
                                mb={4}>
                                Delete this forever?
                            </Typography>
                            <Box display={"flex"} flexDirection={"row"} gap={1}>
                                <Button
                                    onClick={handleDeleteDialogToggle}
                                    sx={styles.button2}
                                    color={"secondary"}>
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleDelete}
                                    sx={styles.button3}
                                    color={"primary"}>
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
                    width={"100%"}>
                    <TextField
                        id={"title"}
                        type='text'
                        value={values.title}
                        error={errors.title && touched.title}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        helperText={
                            errors.title && touched.title && errors.title
                        }
                        sx={styles.input}
                        placeholder='Title'
                        size='small'
                        InputProps={{
                            startAdornment: (
                                <InputAdornment
                                    position='start'
                                    color='secondary'>
                                    <MdOutlineEdit />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        id={"link"}
                        type='text'
                        value={values.link}
                        error={errors.link && touched.link}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        helperText={errors.link && touched.link && errors.link}
                        sx={styles.input}
                        placeholder='https://www.example.com/'
                        size='small'
                        InputProps={{
                            startAdornment: (
                                <InputAdornment
                                    position='start'
                                    color='secondary'>
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
                    gap={2}>
                    <Box>
                        <Switch
                            defaultChecked={values.active}
                            checked={activeToggle}
                            onChange={handleActiveToggle}
                            onBlur={handleBlur}
                            size='small'
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
                            type='submit'
                            disabled={isSubmitting}>
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
                            onClick={handleDeleteDialogToggle}>
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

    const deleteLinkElement = (e) => {
        let newList = linkElements.filter((i) => i._id !== e._id);
        if (newList !== linkElements) {
            setLinkElements(newList);
        }
    };

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
  
  const handleDragEnd = (result) => {
      const { destination, source } = result;
      
      if (!destination) return;
      if ((destination.droppableId === source.droppableId) && (destination.index === source.index)) return;
      const newLinkElements = Array.from(linkElements);
    
      // Swap elements by destructuring
      [newLinkElements[source.index], newLinkElements[destination.index]] = [newLinkElements[destination.index], newLinkElements[source.index]];
    
      setLinkElements(newLinkElements);
  }
      const getUserLinkElements = async () => {
        await fetchComponent().then((data)=>setLinkElements(data));
        // setLinkElements()
      }
      useEffect(() => {
          getUserLinkElements();
        }, []);

  useEffect(()=>{},[linkElements])

    
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
                        }}>
                        <Typography
                            color={"secondary"}
                            sx={{
                                fontWeight: "regular",
                            }}>
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
                                fontSize={14}>
                                <Box
                                    component={"span"}
                                    sx={{
                                        display: "inline-flex",
                                    }}
                                    p={0.5}>
                                    <BiLinkAlt fontSize={16} />
                                </Box>
                                Link
                            </Typography>
                        </Button>
                    </Box>
                </Grid>

                <Grid item xs={6}>
                    <Box>
                        <Button href='#' sx={styles.button2}>
                            <Typography
                                color={"secondary"}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    fontWeight: "regular",
                                }}
                                fontSize={14}>
                                <Box
                                    component={"span"}
                                    sx={{
                                        display: "inline-flex",
                                    }}
                                    p={0.5}>
                                    <MdTitle fontSize={16} />
                                </Box>
                                Header
                            </Typography>
                        </Button>
                    </Box>
                </Grid>

                <Grid item xs={6}>
                    <Box>
                        <Button href='#' sx={styles.button2}>
                            <Typography
                                color={"secondary"}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    fontWeight: "regular",
                                }}
                                fontSize={14}>
                                <Box
                                    component={"span"}
                                    sx={{
                                        display: "inline-flex",
                                    }}
                                    p={0.5}>
                                    <IoShareSocialOutline fontSize={16} />
                                </Box>
                                Social Icon
                            </Typography>
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId={uuidv4()}>
                    {(provided) => (
                        <Grid
                            ref={provided.innerRef}
                            mt={2}
                            container
                            spacing={1}
                            {...provided.droppableProps}>
                            {linkElements ? (
                                linkElements.map((e, i) => (
                                    <Draggable
                                        draggableId={e._id.toString()}
                                        index={i}
                                        key={e._id}
                                        >
                                        {(provided) => (
                                            <Grid
                                                item
                                                xs={12}
                                                key={e._id}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                >
                                                {e.type === "link" ? (
                                                    <LinkElementTool
                                                        element={e}
                                                        deleteElem={
                                                            deleteLinkElement
                                                        }
                                                        index={i}
                                                        dragHandleProps={...provided.dragHandleProps}
                                                    />
                                                ) : e.type === "header" ? (
                                                    <HeaderElementTool
                                                        element={e}
                                                        deleteElem={
                                                            deleteLinkElement
                                                        }
                                                        index={i}
                                                    />
                                                ) : e.type === "social" ? (
                                                    <SocialElementTool
                                                        element={e}
                                                        deleteElem={
                                                            deleteLinkElement
                                                        }
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
                                <></>
                                )}
                                {provided.placeholder}
                        </Grid>
                    )}
                </Droppable>
            </DragDropContext>
        </Box>
    );
}
