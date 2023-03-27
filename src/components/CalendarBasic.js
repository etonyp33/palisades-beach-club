import React, { useState, useCallback, useMemo, useEffect } from "react";
import Parse from "../parse";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { Box, Button, Container, Grid, Typography } from "@mui/material";
import NavBar from "./NavBar";

import { useRouter } from "next/router";
import { Calendar, Views, DateLocalizer, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import moment from "moment";
import {getLogin } from './data'
import Link from "next/link";
const pgName = "calendar";

const localizer = momentLocalizer(moment);

export default function CalendarComponent() {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [start, setStart] = React.useState("");
  const loginType = getLogin();
  // console.log('CalBasic ltype', loginType)
  const router = useRouter();
  useEffect(() => {
    // try {
    //   if (!loginType) {
    //     router.push("/");
    //   }
    // } catch (error) {
    //   router.push("/");
    // }
  }, []);

  let navBar = "";
  try {
    if (loginType  === 'member' || loginType  === 'administrator') {
      navBar = (
        <Box display="flex" justifyContent="center" sx={{ p: 0 }}>
          <NavBar loginType={loginType} />
        </Box>
      );
    }
  } catch (error) {
    navBar = (
      <Box display="flex" justifyContent="center" sx={{ p: 0 }}>
        <div className="main-pic" style={{ position: "relative" }}>
          <div className="logout" style={{ position: "relative", top: "10px", right: "10px" }}>
            <div className="link" id="logout-link">
              <Link href={"/logout"}>Log Out</Link>
            </div>
          </div>
          <div className="main-pic">
            <img id="homeHouseTop" src="images/houseS.jpg" />
          </div>
        </div>
      </Box>
    );
  }
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
    <Container>
      {navBar}
      <Box
        display="flex"
        justifyContent="center"
        // width={"100%"}
        sx={{ p: 1, margin: `0px 0px 0px 0px` }}
      >
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
      </Box>
      <SimpleDialog open={open} onClose={handleClose} />
    </Container>
  );
}

CalendarComponent.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
};
