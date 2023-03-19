// @ts-nocheck
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
import { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { RiSaveLine } from "react-icons/ri";
import { RxDragHandleDots1, RxTrash } from "react-icons/rx";
import createComponent from "../../../api/components/createComponent";
import deleteComponent from "../../../api/components/deleteComponent";
import updateComponent from "../../../api/components/updateComponent";
import { styles } from "../../../styles";
import SocialIconElement from "../SocialIconElement";
import SocialIconsMenu from "../SocialIconsMenu";
import { socialElementValidationSchema } from "../validation/socialElement.validation";

export const SocialElementTool = ({
  element,
  updateElem,
  deleteElem,
  dragHandleProps,
  index,
}) => {
  const [deleteDialog, setDeleteDialog] = useState(false);

  const [toggleIconsMenu, setToggleIconsMenu] = useState(false);
  const [shouldFocus, setShouldFocus] = useState(false);

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    initialValues,
    resetForm,
  } = useFormik({
    initialValues: {
      title: element.title,
      active: element.active,
      icon: element.icon,
    },
    validationSchema: socialElementValidationSchema,
    onSubmit: async (values, actions) => {
      if (element.new) {
        await handleCreate(values, actions);
      } else {
        if (initialValues !== values) {
          await handleUpdate(values, actions);
        }
      }
      initialValues.title = values.title;
    },
  });

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
    const newElem = await updateComponent({
      ...values,
      _id: element._id,
      active: element.active,
      icon: element.icon,
      index: index
    });
    updateElem(element, newElem);
  };

  const handleCreate = async (values, actions) => {
    const newElem = await createComponent({
      ...values,
      elemType: element.elemType,
      active: values.active,
      icon: element.icon,
      index: index,
    });
    updateElem(element, newElem, true);
  };

  const handleToggleSocialIconsMenu = () => {
    setShouldFocus(!shouldFocus);
    setToggleIconsMenu(!toggleIconsMenu);
  };

  /**
   * Creates a copy of the old link and changes the icon field
   * to the new icon, then updates linkElements state with the new link
   *
   * @param icon { String } the name of the new icon
   */
  const changeIcon = (icon) => {
    element.icon = icon;
    // const newIcon = Object.assign({}, linkElements[index]);
    // newIcon.icon = icon;
    // const newLinks = [...linkElements];
    // newLinks[index] = newIcon;
    // setLinkElements(newLinks);
  };


  // useEffect(() => {
  //   values.icon = element.icon;
  // }, [element.icon]);

  return (
    <>
      <Box
        sx={styles.elementSettings}
        component={"form"}
        onSubmit={handleSubmit}
      >
        {/* Delete Modal */}
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
              borderRadius: 1,
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

        {/* Social Icons Menu */}
        <SocialIconsMenu
        shouldFocus={shouldFocus}
        onSocialIconSelect={changeIcon}
        toggleIconsMenu={toggleIconsMenu}
        handleToggleSocialIconsMenu={handleToggleSocialIconsMenu}
        />

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
          <SocialIconElement iconName={element.icon} />
          <Button
            sx={{ color: "black" }}
            onClick={handleToggleSocialIconsMenu}
          >
            Edit Icon
          </Button>
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
