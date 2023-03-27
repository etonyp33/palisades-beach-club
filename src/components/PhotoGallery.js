import { useState, useEffect, useContext } from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from "react-responsive-carousel";

import { Pages_data } from "../context/context";
import { useRouter } from "next/router";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
// import GalleryData from './GalleryData'
import NavBar from "./NavBar";
import NavBarCalendar from "./NavBarCalendar";
import NavBarAdmin from "./NavBarAdmin";
import $ from "jquery";
import {getNavBar} from './NavBarComponent'

const pgName = "gallery";

const PhotoGallery = () => {
  const [data, setData] = useState("");
  const { pages } = useContext(Pages_data);
  const router = useRouter();
  const [navMenu , setNavMenu] = useState('')

  useEffect(() => {
    const navBar = getNavBar(pages)
    setNavMenu(navBar)
    var folder = "gallery";

    $.ajax({
      url: folder,
      success: function (data) {
        // console.log(data);
        $(data)
          .find("a")
          .attr("href", function (i, val) {
            // console.log(val);
            // if (val.match(/\.(jpe?g|png|gif)$/)) {
            //   $("body").append("<img src='" + folder + val + "'>");
            // }
          });
      },
    });
    return;
  }, []);
  useEffect(() => {
    if (typeof pages === "undefined") {
      try {
        let pgtest = JSON.parse(sessionStorage.getItem("pgsData"));
      } catch (error) {
        router.push("/");
      }
    }
  }, []);
  return (
    <Container>
      <Box display="flex" justifyContent="center" sx={{ p: 0 }}>
        {navMenu}
      </Box>
      <Box display="flex" justifyContent="center" height={"100%"} sx={{ p: 0 }}>
        <iframe
          width="800"
          height="750"
          src="https://ppbc-main.s3.us-west-1.amazonaws.com/index.html"
        ></iframe>
      </Box>
      <p></p>
    </Container>
  );
};

export default PhotoGallery;

/*

<div className={styles.container}>
10          <Carousel
11            showArrows={true}
12            showIndicators={true}
13            infiniteLoop={true}
14            dynamicHeight={false}
15            className={styles.mySwiper}
16          >
17            {responsive.map((item) => (
18              <div key={item.id} className={styles.swipItem}>
19                <div className={styles.imgBox}>
20                  <img src={item.imageUrl} alt="slides" />
21                </div>
22                <div className={styles.detail}>
23                  <h2>{item.title}</h2>
24                  <p>{item.text}</p>
25                </div>
26              </div>
27            ))}
28          </Carousel>
29        </div>

*/
