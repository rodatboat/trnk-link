import React from "react";
import { Route, Routes } from "react-router-dom";
import LinksPage from "./preview/LinksPage";
import NavBar from "./NavBar";
import PreviewView from "./preview/PreviewView";
import CustomizePage from "./preview/CustomizePage";
import SettingsPage from "./nopreview/SettingsPage";
import StatsPage from "./nopreview/StatsPage";
import { Box } from "@mui/material";

export default function ToolsView() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<PreviewView />}>
          <Route exact path="" element={<LinksPage />} />
          <Route exact path="/customize" element={<CustomizePage />} />
        </Route>
        <Route exact path="/stats" element={<StatsPage />} />
        <Route exact path="/settings" element={<SettingsPage />} />
      </Routes>
    </>
  );
}
