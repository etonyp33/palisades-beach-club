import React, { useState, useEffect, useContext } from "react";
import { Box, Container, Grid } from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import { getData, getBoard } from "./data";
import Image from "next/image";
import { Pages_data } from "../context/context";
const pgName = "home";
const News = () => {
  const [data, setData] = useState("");
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
    <div className="flex items-center justify-center h-screen mb-12 bg-fixed bg-center bg-cover custom-img">
      <div className="absolute top-0 left-0 right-0 bottom-0  bg-black/40 z-[2] bgUnderlay" />
      <div className="sm:flex z-[2] main-box p-5 m-auto">
        <div className="flex flex-col text-center p-5">
          NEWS
        </div>
      </div>
    </div>
  );
};

export default News;
// / ml-[-10rem] mt-[-10rem]
// <h2 className="text-5xl font-bold">Heading</h2>
