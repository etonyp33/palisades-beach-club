import { useState, useEffect, useContext } from "react";
import { getData } from "./data";
import { useRouter } from "next/router";
import { Box, Container } from "@mui/material";
import { Pages_data } from "../context/context";
import {getNavBar} from './NavBarComponent'

const pgName = "rules";

const Rules = () => {
  const [data, setData] = useState("");
  const { pages } = useContext(Pages_data);
  const router = useRouter();
  const dataObj = getData(pages, pgName);
  const [navMenu , setNavMenu] = useState('')

  useEffect(() => {
    try {
      const navBar = getNavBar(pages)
      setNavMenu(navBar)
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
        <div className="text-container text-container-rules" dangerouslySetInnerHTML={{ __html: data }} />
      </Box>
    </Container>
  );
};

export default Rules;
