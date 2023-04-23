import React, { useState, useEffect, useContext } from "react";
import Nav from "./nav";
import { Box, Container, Grid } from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import { getData, getBoard } from "./data";
import Image from "next/image";
import { Pages_data } from "../context/context";
const pgName = "news";
const pgName2 = "info";

const News = () => {
  const [data, setData] = useState("");
  const [data2, setData2] = useState("");
  const { pages } = useContext(Pages_data);
  const router = useRouter();
  const dataObj = getData(pages, pgName);
  const dataObj2 = getData(pages, pgName2);

  useEffect(() => {
    try {
      setData(dataObj["content"]);
      setData2(dataObj2["content"]);
    } catch (error) {
      router.push("/");
    }
  }, []);

  return (
    <>
      <Nav />
      <div className="basic-pg flex items-center justify-center h-screen mb-12 bg-fixed bg-center bg-cover custom-img">
        <div className="absolute top-0 left-0 right-0 bottom-0  bg-black/40 z-[2] bgUnderlay" />
        <div className="sm:flex z-[2] main-box p-5 m-auto">
          <div className="flex flex-col text-center p-5 basic-page" style={{ width: "100%" }}>
            <div className="hd-text-bold formatted-link page-header">News & Information</div>
            <hr></hr>
            <div className="flex" style={{ maxWidth: "100%" }}>
              <div className="flex flex-col text-center p-5" style={{ maxWidth: "60%" }}>
                <div
                  className="text-container text-container-news p-0"
                  dangerouslySetInnerHTML={{ __html: data }}
                />
              </div>
              <div className="flex flex-col text-center news- p-5" style={{ maxWidth: "60%" }}>
                <div
                  className="text-container text-container-news p-0"
                  dangerouslySetInnerHTML={{ __html: data2 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  returnx(
    <>
      <Nav />
      <div
        id={`container-${pgName}`}
        className="basic-pg flex h-screen bg-fixed bg-center bg-cover custom-img"
      >
        <div className="absolute top-0 left-0 right-0 bottom-0  bg-black/40 z-[2] bgUnderlay" />
        <div className="sm:flex z-[2] main-box p-5 m-auto w-100  basic-page">
          <div className="flex flex-col text-center">
            {/* <div className="hd-text-bold formatted-link page-header-news"> */}
            News & Information
          </div>
          <hr></hr>
          <div className="flex flex-col text-center p-5" style={{ width: "60%" }}>
            <div
              className="text-container text-container-news p-0"
              dangerouslySetInnerHTML={{ __html: data }}
            />
          </div>
          <div className="flex flex-col text-center news- p-5" style={{ width: "60%" }}>
            <div
              className="text-container text-container-news p-0"
              dangerouslySetInnerHTML={{ __html: data2 }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default News;
// / ml-[-10rem] mt-[-10rem]
// <h2 className="text-5xl font-bold">Heading</h2>
