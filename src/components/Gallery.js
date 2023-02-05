import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
// import GalleryData from './GalleryData'
import NavBar from "./NavBar";

const Gallery = () => (
  <Container>
    <Box display="flex" justifyContent="center" sx={{ p: 4 }}>
      <NavBar />
    </Box>
    Gallery
  </Container>
);

export default Gallery;
