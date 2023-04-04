import React, { useState, useCallback, useMemo, useEffect, useContext  } from "react";
import Nav from "./nav";
import { Box, Container, Grid } from "@mui/material";
import { getData, getBoard } from "./data";
import Image from "next/image";
import { Pages_data } from "../context/context";
const pgName = "calendar";

import { useRouter } from "next/router";
import Parse from "../parse";

import { Calendar, Views, DateLocalizer, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import moment from "moment";
import { getLogin } from "./data";

const localizer = momentLocalizer(moment);

const CalendarAdmin = () => {
  const [open, setOpen] = React.useState(false);
  const { pages, setPages } = useContext(Pages_data);
  const [title, setTitle] = React.useState("");
  const [start, setStart] = React.useState("");
  const loginType = getLogin();
  useEffect(() => {
    try {
      if (loginType !== "member" && loginType !== "administrator") {
        router.push("/");
      }
    } catch (error) {
      router.push("/");
    }
  }, []);
  const [myEvents, setEvents] = useState([]);

  useEffect(() => {
    retrieve();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

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

  const saveEvent = async (start, end, title) => {
    const event = new Parse.Object("Event");
    event.set("title", title);
    event.set("start", start);
    event.set("end", end);
    const sdt = new Date(start)
    const edt = new Date(end)
    const sDate = start.toString().split(' ')
    const eDate = end.toString().split(' ')
    console.log(sDate)
    console.log(eDate)
    // console.log(title, start, end)
    return
    try {
      //Save the Object
      let result = await event.save();
      alert("New object created with objectId: " + result.id);
    } catch (error) {
      alert("Failed to create new object, with error code: " + error.message);
    }
  };
  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      const title = window.prompt("New Event name");
      console.log(start, end);
      if (title) {
        setEvents((prev) => [...prev, { start, end, title }]);
        saveEvent(start, end, title);
      }
    },
    [setEvents]
  );

  const eventClick = (event) => {
    console.log(event);
    let dt = new Date(event.start);
    setTitle(event.title);
    let d = dt.getDay();
    let m = dt.getMonth();
    let y = dt.getFullYear();
    setStart(d);
    setOpen(true);
    // window.alert(JSON.stringify(event));
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
  return (
    <>
      <Nav />
      <div
        id={`container-${pgName}`}
        className="flex items-center justify-center h-screen bg-fixed bg-center bg-cover custom-img"
      >
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
                onSelectSlot={handleSelectSlot}
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

export default CalendarAdmin;
// / ml-[-10rem] mt-[-10rem]
// <h2 className="text-5xl font-bold">Heading</h2>
