import React, { useState, useEffect, useContext } from "react";
import Nav from "./nav";
import { Box, Container, Grid } from "@mui/material";
import { useRouter } from "next/router";
import PhotoAlbum from "react-photo-album";
import axios from "axios";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import NextJsImage from "./nextImage";
import Image from "next/image";
const pgName = "gallery";

const PhotoGallery = () => {
  const [data, setData] = useState("");
  const router = useRouter();
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    try {
      fetchData();
      // setData(dataObj["content"]);
    } catch (error) {
      router.push("/");
    }
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://tonypweb.com/pbc/photos/images.php");
      console.log(response.data.images);
      let imgs = response.data.images;
      const imgData = [];
      for (let i in imgs) {
        if (parseInt(imgs[i]["width"]) > 599) {
          const obj = {};
          obj.src = imgs[i]["image"];
          obj.key = imgs[i]["id"];
          obj.width = imgs[i]["width"];
          obj.height = imgs[i]["height"];
          obj.alt = "Image";
          imgData.push(obj);
        }
      }
      setData(imgData);
    } catch (error) {}
  };
  return (
    <>
      <Nav />
      <div
        id={`container-${pgName}`}
        className="basic-pg flex items-center justify-center h-screen mb-12 bg-fixed bg-center bg-cover custom-img"
      >
        <div className="absolute top-0 left-0 right-0 bottom-0  bg-black/40 z-[2] bgUnderlay" />
        <div className=" z-[2] main-box p-5 m-auto">
          <div className="flex-col text-center p-5 basic-page">
            <div className="hd-text-bold formatted-link page-header">Gallery</div>
            <hr></hr>
            <div className="w-100">
              <PhotoAlbum
                photos={data}
                layout="rows"
                targetRowHeight={150}
                onClick={({ index }) => setIndex(index)}
              />

              {/* <PhotoAlbum
                layout="rows"
                photos={data}
                renderPhoto={NextJsImage}
                defaultContainerWidth={1200}
                sizes={{ size: "calc(100vw - 240px)" }}
              /> */}
              <Lightbox
                slides={data}
                open={index >= 0}
                index={index}
                close={() => setIndex(-1)}
                // enable optional lightbox plugins
                plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PhotoGallery;
// / ml-[-10rem] mt-[-10rem]
// <h2 className="text-5xl font-bold">Heading</h2>
