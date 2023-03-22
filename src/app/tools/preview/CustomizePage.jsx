import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import fetchComponent from "../../api/components/fetchComponent";

export default function CustomizePage() {
  const [currentComponents, setCurrentComponents] = useOutletContext();

  useEffect(() => {
    console.log(currentComponents.elements);
    if (
      currentComponents.elements
        ? currentComponents.elements.length === 0
        : false
    ) {

      fetchComponent().then((data) => {
        setCurrentComponents({
          ...currentComponents,
          elements: data,
        });
      });
    }
  }, []);

  return (
    <Box m={"auto"} maxWidth={640}>
      CustomizePage
    </Box>
  );
}
