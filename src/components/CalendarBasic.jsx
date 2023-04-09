import React, { useState, useCallback, useMemo, useEffect } from "react";
import Nav from "./nav";
import { getData, getBoard } from "./data";
import Image from "next/image";
import { Pages_data } from "../context/context";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
const pgName = "calendar";


import { useRouter } from "next/router";
import Parse from "../parse";

import { Calendar, Views, DateLocalizer, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import moment from "moment";


const localizer = momentLocalizer(moment);


const CalendarBasic = () => {
  const [data, setData] = useState("");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [myEvents, setEvents] = useState([]);

  useEffect(() => {
    retrieve();
  }, []);

 
  function SimpleDialog(props) {
    const { onClose, open } = props;

    const handleClose = () => {
      onClose();
    };

    return (
      <Dialog maxWidth={"md"} open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{title}</DialogContentText>
        </DialogContent>
        <DialogContent>
          <DialogContentText>{start}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }

  const eventClick = (event) => {
    console.log(event);
    let dt = new Date(event.start);
    setTitle(event.title);
    let d = dt.getDay();
    let m = dt.getMonth();
    let y = dt.getFullYear();
    setStart(d);
    setOpen(true);
    window.alert(JSON.stringify(event));
  };

  const handleSelectEvent = useCallback(
    (event) => eventClick(event),
    // (event) => window.alert(event.title),
    []
  );

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 12),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  );
  function retrieve() {
    const getEvents = async () => {
      let parseQuery = new Parse.Query("Event");
      const res = await parseQuery.findAll();

      const ids = res.map((event) => ({ objectId: event.get("objectId") }));
      const names = res.map((event) => ({ name: event.get("title") }));
      const starts = res.map((event) => ({ name: event.get("start") }));
      const ends = res.map((event) => ({ name: event.get("end") }));

      let str,
        eventsData = {},
        eventsArr = [];
      for (let i in names) {
        eventsData = {
          objectId: ids[i]["name"],
          title: names[i]["name"],
          start: starts[i]["name"],
          end: ends[i]["name"],
        };
        eventsArr[i] = eventsData;
      }
      setEvents(eventsArr);
    };
    getEvents();
  }

  function SimpleDialog(props) {
    const { onClose, open } = props;

    const handleClose = () => {
      onClose();
    };

    return (
      <Dialog maxWidth={"md"} open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{title}</DialogContentText>
        </DialogContent>
        <DialogContent>
          <DialogContentText>{start}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }

  // useEffect(() => {
  //   try {
  //     setData(dataObj["content"]);
  //   } catch (error) {
  //     router.push("/");
  //   }
  // }, []);

  return (
    <>
      <Nav />
      <div  id={`container-${pgName}`} className="flex items-center justify-center h-screen bg-fixed bg-center bg-cover custom-img">
        <div className="absolute top-0 left-0 right-0 bottom-0  bg-black/40 z-[2] bgUnderlay" />

        <div className="sm:flex z-[2] main-box p-5 m-auto">
          <div className="flex flex-col text-center p-5 basic-page">
            <div className="hd-text-bold formatted-link page-header">Calendar</div>
            <hr></hr>
            <div className="w-100">
              <Calendar
                localizer={localizer}
                events={myEvents}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500, width: 720 }}
                onSelectEvent={handleSelectEvent}
                // onSelectSlot={handleSelectSlot}
                selectable
                scrollToTime={scrollToTime}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalendarBasic;
// / ml-[-10rem] mt-[-10rem]
// <h2 className="text-5xl font-bold">Heading</h2>
