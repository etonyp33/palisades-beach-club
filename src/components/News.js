import React from "react";
import { useState, useEffect, useContext } from "react";

import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { getData } from "./data";
import { Pages_data } from "../context/context";
import { useRouter } from "next/router";
import {getNavBar} from './NavBarComponent'

const pgName = "news";
const decodeBase64 = (data) => {
  return Buffer.from(data, "base64").toString("ascii");
};

export default function News() {
  const [data, setData] = useState("");
  const { pages, setPages } = useContext(Pages_data);
  const router = useRouter();
  const [navMenu , setNavMenu] = useState('')

  useEffect(() => {
    const dataObj = getData(pages, pgName);
    const navBar = getNavBar(pages)
    setNavMenu(navBar)
    try {
      setData(dataObj["content"]);
    } catch (error) {
      router.push("/");
    }
  }, []);
  return (
    <Container>
      <Box display="flex" justifyContent="center" sx={{ p: 0 }}>
        {navMenu}
      </Box>
      <Box display="flex" justifyContent="center" height={"100%"} sx={{ p: 0 }}>
        <div className="text-container text-container-news" dangerouslySetInnerHTML={{ __html: data }} />
      </Box>
    </Container>
  );
}
