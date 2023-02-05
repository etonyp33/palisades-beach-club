import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
// import ReservationsData from "./ReservationsData";
import NavBar from "./NavBar";

const Reservations = () => (
  <Container>
    <Box display="flex" justifyContent="center" sx={{ p: 4 }}>
      <NavBar />
    </Box>
    Reservations
  </Container>
);

export default Reservations;
