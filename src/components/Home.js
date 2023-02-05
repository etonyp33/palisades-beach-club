import React from "react";
// import Image from "next/image";
import { Inter } from "@next/font/google";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
// import { useTheme } from "@mui/material/styles";
// import { useMediaQuery } from "@mui/material";
// import App from "../src/App";
// import $ from "jquery";
import { Link } from "next/link";
// import HomeData from "./HomeData";
import NavBar from "./NavBar";
import Image from "next/image";

let indexPic = "indexPic";
let iw = "510";
let ih = "383";
const HomePage = () => (
  <Container>
    {/* <Box display="flex" justifyContent="center" sx={{ p: 4 }}>
      <img src="images/logoMainSm.png" />
    </Box> */}
    <Box display="flex" justifyContent="center" sx={{ p: 4 }}>
      <NavBar />
    </Box>
    <Grid
      container
      // spacing={{ xs: 2, md: 3 }}
      justifyContent="center"
      sx={{ margin: `20px 4px 0px 0px` }}
      columns={{ xs: 2, sm: 8, md: 12 }}
    >
      <Grid
        item
        xs={2}
        sm={2}
        md={2}
        display="flex"
        flexDirection={"column"}
        alignItems="center"
      >
        <Box
          display="flex"
          justifyContent="center"
          sx={{ p: 1, margin: `0px 0px 0px 0px` }}
        >
          {/* <HomeData /> */}
        </Box>
      </Grid>
      <Grid
        item
        xs={2}
        sm={4}
        md={4}
        display="flex"
        // flexDirection={"column"}
        alignItems="center"
      >
        <Image
          name=""
          src={`/images/homePic.jpg`}
          alt=""
          width="510"
          height="383"
        />
      </Grid>
    </Grid>
  </Container>
  // <div className="container">
  //   <div className="row">
  //     <div className="col home-left">
  //       <HomeData />
  //     </div>
  //     <div className="col home-right">
  //       <img id="homeHouseBottom" name="" src="http://tonypweb.com/ppbc/images/homePic.jpg" alt="" />
  //     </div>
  //   </div>
  // </div>
);

export default HomePage;
