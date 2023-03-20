import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { SiSourcetree } from "react-icons/si";
import { RxSection } from "react-icons/rx";
import {
  MdOutlineShapeLine,
  MdOutlineSettings,
  MdQueryStats,
} from "react-icons/md";
import { IoShapesOutline } from "react-icons/io5";

export const NavBarItem = ({ tab }) => {
    return (
        <>
            <Box
                py={1.5}
                px={{xs:0,
                md:1}}
                sx={{
                    borderRadius: "5px",
                    "&:hover": {
                        backgroundColor: "secondary.main",
                    },
                }}>
                <Box
                    component={"a"}
                    href={tab.href}
                    sx={{
                        display: "flex",
                        flexDirection: {
                            xs: "column",
                            md: "row",
                        },
                        alignItems: "center",
                    }}
                    px={1}
                    pt={{
                        xs: 0.5,
                        md: 0,
                    }}
                    pb={{ xs: 1, md: 0 }}>
                    <Box
                        component={"span"}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            "& svg": {
                                fontSize: 18,
                            },
                        }}
                        pr={0.7}
                        py={"auto"}>
                        {tab.icon}
                    </Box>
                    <Box
                        component={"span"}
                        py={"auto"}
                        fontSize={15}
                        fontWeight={"regular"}>
                        {tab.title}
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default function NavBar() {
  const [tabs, setTabs] = useState([
    {
      title: "Links",
      icon: <RxSection />,
      href: "/tools",
    },
    {
      title: "Customize",
      icon: <IoShapesOutline />,
      href: "/tools/customize",
    },
    {
      title: "Statistics",
      icon: <MdQueryStats />,
      href: "/tools/stats",
    },
    {
      title: "Settings",
      icon: <MdOutlineSettings />,
      href: "/tools/settings",
    },
  ]);
    return (
        <AppBar
            component={"nav"}
            elevation={0}
            position='sticky'
            color={"primary"}
            sx={{
                boxShadow: "0px 1px 1px 0px rgba(0,0,0,0.75)",
                height: {
                    xs: 128,
                    md: 72,
                },
                overflow:"hidden"
            }}>
            <Toolbar
                sx={{
                    display: "flex",
                    flexDirection: {
                        xs: "column",
                        md: "row",
                    },
                    alignItems: "center",
                    height: "100%",
                    // "@media all": {
                    //   xs: 128,
                    //   md: 64,
                    // },
                }}>
                <Box
                    component={"a"}
                    href={"#"}
                    sx={{
                        display: {
                            xs: "none",
                            md: "flex",
                        },
                        alignItems: "center",
                        height: "100%",
                    }}
                    p={3}
                    pr={4}>
                    <SiSourcetree fontSize={20} />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: {
                            xs: "space-between",
                            md: "flex-start",
                        },
                        height: "100%",
                        width: "100%",
                        gap: {
                            md: 4,
                        },
                        order: {
                            xs: 2,
                            md: 1,
                        },
                    }}>
                    {tabs.map((tab, i) => (
                        <NavBarItem key={i} tab={tab} />
                    ))}
                </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
            order: {
              xs: 1,
              md: 2,
            },
            width: {
              xs: "100%",
              md: "auto",
            },
          }}
          py={"auto"}
        >
          <Box
            component={"a"}
            href={"#"}
            sx={{
              display: {
                xs: "flex",
                md: "none",
              },
            }}
            p={3}
            pl={0}
          >
            <SiSourcetree fontSize={20} />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            {/* Notifications, upgrade, share, profile button */}
            <Typography>Test</Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
