import React, { useState, useEffect, useContext } from "react";
import Nav from "./nav";
import { Box, Container, Grid } from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import { getData, getBoard } from "./data";
import Image from "next/image";
import { Pages_data } from "../context/context";
const pgName = "info";

const News = () => {
  const [data, setData] = useState("");
  const [data2, setData2] = useState("");
  const { pages } = useContext(Pages_data);
  const router = useRouter();
  const dataObj = getData(pages, pgName);

  useEffect(() => {
    try {
      setData(dataObj["content"]);
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
            <div className="hd-text-bold formatted-link page-header">Officers and Staff</div>
            <hr></hr>
            <div
              className="text-container basic-container text-container-home"
              dangerouslySetInnerHTML={{ __html: data }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default News;
