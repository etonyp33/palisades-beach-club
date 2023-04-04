import React, { useState, useEffect, useContext } from "react";
import Nav from "./nav";
import { Box, Container, Grid } from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import { getData, getBoard } from "./data";
import Image from "next/image";
import { Pages_data } from "../context/context";
const pgName = "home";

const Home = () => {
  const [data, setData] = useState("");
  const { pages } = useContext(Pages_data);
  const router = useRouter();
  const dataObj = getData(pages, pgName);
  const [navMenu, setNavMenu] = useState("");
  const [bName, setBName] = useState("");
  const [bEmail, setBEmail] = useState("");
  const [imgWidth, setImgWidth] = useState("510");
  const [imgHeight, setImgHeight] = useState("383");

  useEffect(() => {
    try {
      setData(dataObj["content"]);
      const bObj = getBoard(pages);
      setBName(bObj.name);
      setBEmail(bObj.email);
      // console.log(window.innerWidth);
    } catch (error) {
      router.push("/");
    }
  }, []);

  return (
    <>
      <Nav  />
      <div id={`container-${pgName}`} className="basic-pg flex h-screen bg-fixed bg-center bg-cover custom-img">
        <div className="absolute top-0 left-0 right-0 bottom-0  bg-black/40 z-[2] bgUnderlay" />
        <div className="sm:flex z-[2] main-box p-5 m-auto w-100 home-left">
          <div className="flex flex-col text-center p-5 w-50">
            Send a Message to the Board
            {/* <div className="text-container text-container-home" dangerouslySetInnerHTML={{ __html: data }} /> */}
            <div className="hd-text-bold formatted-link">
              <a href={`mailto:{${bEmail}}`}>{bName}</a>
            </div>
            {/* <div className="text-container text-container-home" dangerouslySetInnerHTML={{ __html: data }} /> */}
            <h4 className="formatted-link py-5">
              <Link href={"/reservations"}>Make a Reservation</Link>
            </h4>
            <hr className="pb-5"></hr>
            <div
              className="text-container text-container-home p-0"
              dangerouslySetInnerHTML={{ __html: data }}
            />
          </div>
          <div className="flex flex-col text-center w-50 home-right p-5">
            <Image src={`/images/homePic.jpg`} width={imgWidth} height={imgHeight} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
// / ml-[-10rem] mt-[-10rem]
// <h2 className="text-5xl font-bold">Heading</h2>
