import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
// import CalendarData from './CalendarData'
// sessionStorage.pg = 'calendar'
import NavBar from "./NavBar";

const Calendar = () => (
  <Container>
    <Box display="flex" justifyContent="center" sx={{ p: 4 }}>
      <NavBar />
    </Box>
    Calendar
  </Container>
);

export default Calendar;
