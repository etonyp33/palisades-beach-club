import { useState, useEffect, useContext } from "react";
import { Box, Container } from "@mui/material";
import { useRouter } from "next/router";
import { Pages_data } from "../context/context";
import { getNavBar } from "./NavBarComponent";
const Roster = () => {
  const router = useRouter();
  const { pages } = useContext(Pages_data);
  const [navMenu, setNavMenu] = useState("");

  useEffect(() => {
    const navBar = getNavBar(pages);
    setNavMenu(navBar);
  }, []);
  return (
    <Container>
      <Box display="flex" justifyContent="center" sx={{ p: 0 }}>
        {navMenu}
      </Box>

      <Box display="flex" justifyContent="center" className="text-container">
        <iframe id="rosterIframe" src="files/roster.pdf" width={"1200px"} height={"800px"}></iframe>
      </Box>
    </Container>
  );
};

export default Roster;
