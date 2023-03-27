import { useState, useEffect, useContext } from "react";
import { getData } from "./data";
import { useRouter } from "next/router";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import {getNavBar} from './NavBarComponent'
import { Pages_data } from "../context/context";

const pgName = "reservations";

const Reservations = () => {
  const [data, setData] = useState("");
  const { pages } = useContext(Pages_data);
  const router = useRouter();
  const dataObj = getData(pages, pgName);
  const [navMenu , setNavMenu] = useState('')

  useEffect(() => {
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

      <Box display="flex" justifyContent="center" sx={{ p: 1, margin: `0px 0px 0px 0px` }}>
        <div className="text-container text-container-reservations" dangerouslySetInnerHTML={{ __html: data }} />
      </Box>
    </Container>
  );
};

export default Reservations;
