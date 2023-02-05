import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
// import RulesData from './RulesData'
// sessionStorage.pg = 'rules'
import NavBar from "./NavBar";

const Rules = () => (
  <Container>
    <Box display="flex" justifyContent="center" sx={{ p: 4 }}>
      <NavBar />
    </Box>
  </Container>
);

export default Rules;
