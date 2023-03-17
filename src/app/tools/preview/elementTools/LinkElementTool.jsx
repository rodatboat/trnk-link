import {
  Box,
  Button,
  InputAdornment,
  Modal,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { RiSaveLine } from "react-icons/ri";
import { RxDragHandleDots1, RxTrash } from "react-icons/rx";
import createComponent from "../../../api/components/createComponent";
import deleteComponent from "../../../api/components/deleteComponent";
import updateComponent from "../../../api/components/updateComponent";
import { styles } from "../../../styles";
import { linkElementValidationSchema } from "../validation/linkElement.validation";

export const LinkElementTool = ({ element, deleteElem, dragHandleProps }) => {
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
      active: element.active,
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
    // handleChange:async ()=>{
    //   console.log("changes")
    // }
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
              border: 1,
              borderRadius:1,
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
          gap={1}
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
              endAdornment: (
                <InputAdornment position="end" color="secondary">
                  <Typography fontSize={12}>
                    {values.title.length > 0 ? `${values.title.length}/50` : ""}
                  </Typography>
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
          <Box textAlign={"center"} mt={"auto"}>
            <Typography color={"accent.main"} sx={styles.hint}>
              {initialValues !== values || element.new ? "Unsaved Changes" : ""}
            </Typography>
          </Box>
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
          <Box
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={1}
          >
            <Switch
              id={"active"}
              // defaultChecked={initialValues.active}
              checked={values.active}
              onChange={handleChange}
              onBlur={handleBlur}
              size="small"
              sx={styles.switch}
            />
            <Button
              color={initialValues === values ? "secondary" : "primary"}
              sx={
                initialValues === values
                  ? styles.smallButton
                  : styles.smallButtonActive
              } //initialValues !== values
              type="submit"
              disabled={isSubmitting || initialValues === values}
            >
              <RiSaveLine fontSize={18} />
            </Button>
          </Box>
          <Box ml={"auto"} mt={"auto"}>
            <Button
              color={"secondary"}
              sx={styles.smallButton}
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
