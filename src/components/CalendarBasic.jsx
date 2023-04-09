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

  const handleClose = () => {
    onClose();
  };
 
  function SimpleDialog(props) {
    const { onClose, open } = props;

    const handleClose = () => {
      setOpen(false);
    };

    let arr1,
      arr2,
      arr3,
      time = "",
      msg1 = "",
      msg2 = "",
      msg3 = "";
    try {
      arr1 = title.split("[");
      arr2 = arr1[1].split("]");
      arr3 = arr2[1].split("-");
      time = arr1[0];
      msg1 = arr2[0];
      msg2 = arr3[0];
      msg3 = arr3[1];
    } catch (error) {
      try {
        msg1 = arr1[0];
      } catch (error) {}
    }
    return (
      <Dialog maxWidth={"md"} open={open} onClose={handleClose}>
        <DialogTitle>Event</DialogTitle>
        <Box
          component="form"
          flexDirection={"column"}
          sx={{
            "& > :not(style)": { m: 1, width: "350px", textAlign: "center" },
          }}
          noValidate
          autoComplete="off"
        >
          <DialogContent>
            <DialogContentText>{time}</DialogContentText>
            <DialogContentText>{msg1}</DialogContentText>
            <DialogContentText>{msg2}</DialogContentText>
            <DialogContentText>{msg3}</DialogContentText>
          </DialogContent>
        </Box>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  const eventClick = (event) => {
    setTitle(event.title);
    setOpen(true);
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
       <SimpleDialog  open={open} onClose={handleClose} />

    </>
  );
};

export default CalendarBasic;
// / ml-[-10rem] mt-[-10rem]
// <h2 className="text-5xl font-bold">Heading</h2>
