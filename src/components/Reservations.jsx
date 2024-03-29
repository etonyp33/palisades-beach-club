import React, { useState, useEffect, useContext } from "react";
import Nav from "./nav";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import { getData, getBoard } from "./data";
import Image from "next/image";
import { Pages_data } from "../context/context";
const pgName = "reservations";

const Reservations = () => {
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
    <>
      <Nav />
      <div
        id={`container-${pgName}`}
        className="basic-pg pg-reservations flex items-center justify-center h-screen bg-fixed bg-center bg-cover custom-img"
      >
        <div className="absolute top-0 left-0 right-0 bottom-0  bg-black/40 z-[2] bgUnderlay" />
        <div className="sm:flex z-[2] main-box p-5 m-auto">
          <div className="flex flex-col text-center p-5 basic-page">
            <div className="hd-text-bold formatted-link page-header">Reservations</div>
            <hr></hr>

            <div className="formatted-link py-0">
              <Button variant="outlined" sx={{color:"#587429", borderColor:"#587429"}}>
                <a
                  target="_blank"
                  href={`https://docs.google.com/forms/d/e/1FAIpQLSfM4IdYuYQGG3IObW0uHE6GpZptz5PhIqp1DEK0K0tSq-BoVA/viewform`}
                >
                  Make a Reservation
                </a>
              </Button>
            </div>
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

export default Reservations;
// / ml-[-10rem] mt-[-10rem]
// <h2 className="text-5xl font-bold">Heading</h2>
