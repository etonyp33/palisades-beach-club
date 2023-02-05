import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
// import RosterMount from "./RosterMount";
import NavBar from "./NavBar";
// sessionStorage.pg = 'roster'

const Roster = () => (
  <Container>
    <Box display="flex" justifyContent="center" sx={{ p: 4 }}>
      <NavBar />
    </Box>
    Roster
  </Container>

  // <div className="container">
  //   <iframe
  //     id="rosterIframe"
  //     src="http://tonypweb.com/pbc/files/roster.pdf"
  //   ></iframe>
  //   {/* <RosterMount /> */}
  // </div>
);

export default Roster;
