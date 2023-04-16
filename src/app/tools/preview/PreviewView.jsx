import { Box, Button, Modal, Typography } from "@mui/material";
import { fontWeight } from "@mui/system";
import React, { useState, useEffect } from "react";
import { BsEye } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { Outlet } from "react-router-dom";
import { styles } from "../../styles";
import UserView from "../../[username]/UserView";
import fetchUserLinks from "../../api/user/fetchUserLinks";

export default function PreviewView() {
  const [previewDialog, setPreviewDialog] = useState(false);
  const [currentComponents, setCurrentComponents] = useState({
    user: {
      username: window.localStorage.getItem("username"),
      background:{
        mode: "",
      colors: [],
      }
    },
    elements: [],
  });

  const handlePreviewDialogToggle = () => {
    setPreviewDialog(!previewDialog);
  };

  const fetchUserData = async () => {
    await fetchUserLinks(window.localStorage.getItem("username")).then(
      (data) => {
        // setFieldValue("displayName", data.data.user.displayName);
        // setFieldValue("bio", data.data.user.bio);

        setCurrentComponents({
          user: { ...data.data.user },
          elements: data.data.elements,
        });
      }
    );
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(()=>{},[currentComponents])

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
      }}
    >
      <Modal open={previewDialog} onClose={handlePreviewDialogToggle}>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          height={"100%"}
        >
          <Box className={"user-preview"}>
            <Box
              sx={{
                position: "fixed",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                display: {
                  sm: "block",
                  md: "none",
                },
                zIndex: 99,
              }}
              mb={2}
            >
              <Button
                sx={{
                  ...styles.button3,
                  fontWeight: "regular",
                  boxShadow: 1,
                  borderRadius: 4,
                  transform: "scale(1.2)",
                  display: previewDialog ? "flex" : "none",
                }}
                onClick={handlePreviewDialogToggle}
              >
                <IoCloseSharp fontSize={24} />
              </Button>
            </Box>
            <Box
              sx={{
                maxHeight: 724,
                maxWidth: 352,
                height: "auto",
                width: "auto",
                overflowY: "scroll",
              }}
            >
              <UserView setUsername={currentComponents} />
            </Box>
          </Box>
        </Box>
      </Modal>

      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          display: {
            sm: "block",
            md: "none",
          },
          zIndex: 99,
        }}
        mb={4}
      >
        <Button
          sx={{
            ...styles.button3,
            fontWeight: "regular",
            boxShadow: 1,
            borderRadius: 4,
            transform: "scale(1.2)",
            display: previewDialog ? "none" : "flex",
          }}
          onClick={handlePreviewDialogToggle}
        >
          <BsEye style={{ marginRight: 8 }} fontSize={16} /> Preview
        </Button>
      </Box>

      <Box sx={styles.previewLeft} p={2}>
        <Outlet context={[currentComponents, setCurrentComponents]} />
      </Box>

      <Box sx={styles.previewRight}>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          height={"100%"}
        >
          <Box className={"user-preview"}>
            <Box
              sx={{
                maxHeight: 724,
                maxWidth: 352,

                height: { lg: 724 },
                width: { lg: 352 },
                aspectRatio: "9 / 16",
                overflowY: "scroll",
              }}
            >
              <UserView setUsername={currentComponents} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
