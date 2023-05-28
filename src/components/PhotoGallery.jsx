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
      let imgJson = `[{"image":"http://tonypweb.com/pbc/photos/img-1.jpg","width":640,"height":462,"id":"img1"},{"image":"http://tonypweb.com/pbc/photos/img-2.jpg","width":640,"height":480,"id":"img2"},{"image":"http://tonypweb.com/pbc/photos/img-3.jpg","width":1600,"height":1200,"id":"img3"},{"image":"http://tonypweb.com/pbc/photos/img-4.jpg","width":1600,"height":1200,"id":"img4"},{"image":"http://tonypweb.com/pbc/photos/img-5.jpg","width":1600,"height":1200,"id":"img5"},{"image":"http://tonypweb.com/pbc/photos/img-6.jpg","width":1600,"height":1200,"id":"img6"},{"image":"http://tonypweb.com/pbc/photos/img-7.jpg","width":1600,"height":1200,"id":"img7"},{"image":"http://tonypweb.com/pbc/photos/img-8.jpg","width":1600,"height":1200,"id":"img8"},{"image":"http://tonypweb.com/pbc/photos/img-9.jpg","width":1600,"height":1200,"id":"img9"},{"image":"http://tonypweb.com/pbc/photos/img-10.jpg","width":1600,"height":1200,"id":"img10"},{"image":"http://tonypweb.com/pbc/photos/img-11.jpg","width":1600,"height":1200,"id":"img11"},{"image":"http://tonypweb.com/pbc/photos/img-12.jpg","width":640,"height":480,"id":"img12"},{"image":"http://tonypweb.com/pbc/photos/img-13.jpg","width":1600,"height":1200,"id":"img13"},{"image":"http://tonypweb.com/pbc/photos/img-14.jpg","width":1600,"height":1200,"id":"img14"},{"image":"http://tonypweb.com/pbc/photos/img-15.jpg","width":1600,"height":1200,"id":"img15"},{"image":"http://tonypweb.com/pbc/photos/img-16.jpg","width":1600,"height":1200,"id":"img16"},{"image":"http://tonypweb.com/pbc/photos/img-17.jpg","width":1600,"height":1200,"id":"img17"},{"image":"http://tonypweb.com/pbc/photos/img-18.jpg","width":1600,"height":1200,"id":"img18"},{"image":"http://tonypweb.com/pbc/photos/img-19.jpg","width":1600,"height":1200,"id":"img19"},{"image":"http://tonypweb.com/pbc/photos/img-20.jpg","width":1600,"height":1200,"id":"img20"},{"image":"http://tonypweb.com/pbc/photos/img-21.jpg","width":1600,"height":1200,"id":"img21"},{"image":"http://tonypweb.com/pbc/photos/img-22.jpg","width":1600,"height":1200,"id":"img22"},{"image":"http://tonypweb.com/pbc/photos/img-23.jpg","width":640,"height":480,"id":"img23"},{"image":"http://tonypweb.com/pbc/photos/img-24.jpg","width":1600,"height":1200,"id":"img24"},{"image":"http://tonypweb.com/pbc/photos/img-25.jpg","width":1600,"height":1200,"id":"img25"},{"image":"http://tonypweb.com/pbc/photos/img-26.jpg","width":1600,"height":1200,"id":"img26"},{"image":"http://tonypweb.com/pbc/photos/img-27.jpg","width":1600,"height":1200,"id":"img27"},{"image":"http://tonypweb.com/pbc/photos/img-28.jpg","width":1600,"height":1200,"id":"img28"},{"image":"http://tonypweb.com/pbc/photos/img-29.jpg","width":1600,"height":1200,"id":"img29"},{"image":"http://tonypweb.com/pbc/photos/img-30.jpg","width":1600,"height":1200,"id":"img30"},{"image":"http://tonypweb.com/pbc/photos/img-31.jpg","width":1600,"height":1200,"id":"img31"},{"image":"http://tonypweb.com/pbc/photos/img-32.jpg","width":1600,"height":1200,"id":"img32"},{"image":"http://tonypweb.com/pbc/photos/img-33.jpg","width":1600,"height":1200,"id":"img33"},{"image":"http://tonypweb.com/pbc/photos/img-34.jpg","width":640,"height":480,"id":"img34"},{"image":"http://tonypweb.com/pbc/photos/img-35.jpg","width":640,"height":480,"id":"img35"},{"image":"http://tonypweb.com/pbc/photos/img-36.jpg","width":640,"height":480,"id":"img36"},{"image":"http://tonypweb.com/pbc/photos/img-37.jpg","width":640,"height":480,"id":"img37"},{"image":"http://tonypweb.com/pbc/photos/img-38.jpg","width":640,"height":480,"id":"img38"},{"image":"http://tonypweb.com/pbc/photos/img-39.jpg","width":640,"height":531,"id":"img39"},{"image":"http://tonypweb.com/pbc/photos/img-40.jpg","width":1600,"height":1200,"id":"img40"},{"image":"http://tonypweb.com/pbc/photos/img-41.jpg","width":1600,"height":1200,"id":"img41"},{"image":"http://tonypweb.com/pbc/photos/img-42.jpg","width":1600,"height":1200,"id":"img42"},{"image":"http://tonypweb.com/pbc/photos/img-43.jpg","width":1600,"height":1200,"id":"img43"},{"image":"http://tonypweb.com/pbc/photos/img-44.jpg","width":1600,"height":1200,"id":"img44"},{"image":"http://tonypweb.com/pbc/photos/img-45.jpg","width":1600,"height":1200,"id":"img45"},{"image":"http://tonypweb.com/pbc/photos/img-46.jpg","width":1600,"height":1200,"id":"img46"},{"image":"http://tonypweb.com/pbc/photos/img-47.jpg","width":1600,"height":1200,"id":"img47"},{"image":"http://tonypweb.com/pbc/photos/img-48.jpg","width":1600,"height":1200,"id":"img48"},{"image":"http://tonypweb.com/pbc/photos/img-49.jpg","width":1600,"height":1200,"id":"img49"},{"image":"http://tonypweb.com/pbc/photos/img-50.jpg","width":1600,"height":1200,"id":"img50"},{"image":"http://tonypweb.com/pbc/photos/img-51.jpg","width":1600,"height":1200,"id":"img51"},{"image":"http://tonypweb.com/pbc/photos/img-52.jpg","width":640,"height":480,"id":"img52"},{"image":"http://tonypweb.com/pbc/photos/img-53.jpg","width":1600,"height":1429,"id":"img53"},{"image":"http://tonypweb.com/pbc/photos/img-54.jpg","width":1600,"height":1200,"id":"img54"},{"image":"http://tonypweb.com/pbc/photos/img-55.jpg","width":1600,"height":1200,"id":"img55"},{"image":"http://tonypweb.com/pbc/photos/img-56.jpg","width":1600,"height":1200,"id":"img56"},{"image":"http://tonypweb.com/pbc/photos/img-57.jpg","width":640,"height":480,"id":"img57"},{"image":"http://tonypweb.com/pbc/photos/img-58.jpg","width":640,"height":480,"id":"img58"},{"image":"http://tonypweb.com/pbc/photos/img-59.jpg","width":1600,"height":1200,"id":"img59"},{"image":"http://tonypweb.com/pbc/photos/img-60.jpg","width":1600,"height":1200,"id":"img60"},{"image":"http://tonypweb.com/pbc/photos/img-61.jpg","width":1600,"height":1200,"id":"img61"},{"image":"http://tonypweb.com/pbc/photos/img-62.jpg","width":1600,"height":1200,"id":"img62"},{"image":"http://tonypweb.com/pbc/photos/img-63.jpg","width":1600,"height":1200,"id":"img63"},{"image":"http://tonypweb.com/pbc/photos/img-64.jpg","width":1600,"height":1200,"id":"img64"},{"image":"http://tonypweb.com/pbc/photos/img-65.jpg","width":640,"height":480,"id":"img65"},{"image":"http://tonypweb.com/pbc/photos/img-66.jpg","width":640,"height":480,"id":"img66"},{"image":"http://tonypweb.com/pbc/photos/img-67.jpg","width":640,"height":480,"id":"img67"},{"image":"http://tonypweb.com/pbc/photos/img-68.jpg","width":640,"height":480,"id":"img68"},{"image":"http://tonypweb.com/pbc/photos/img-69.jpg","width":789,"height":587,"id":"img69"},{"image":"http://tonypweb.com/pbc/photos/img-70.jpg","width":1600,"height":1200,"id":"img70"},{"image":"http://tonypweb.com/pbc/photos/img-71.jpg","width":640,"height":480,"id":"img71"},{"image":"http://tonypweb.com/pbc/photos/img-72.jpg","width":1600,"height":1200,"id":"img72"},{"image":"http://tonypweb.com/pbc/photos/img-73.jpg","width":640,"height":480,"id":"img73"},{"image":"http://tonypweb.com/pbc/photos/img-74.jpg","width":640,"height":480,"id":"img74"},{"image":"http://tonypweb.com/pbc/photos/img-75.jpg","width":1600,"height":1200,"id":"img75"}]`
      // const response = await axios.get("http://tonypweb.com/pbc/photos/images.php");
      // console.log(JSON.stringify(response.data.images));
      // let imgs = response.data.images;
      let imgs = JSON.parse(imgJson)
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
