import React, { useState, useCallback, useMemo, useEffect, useContext  } from "react";
import Parse from "../parse";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { Box, Button, Container, Grid, Typography } from "@mui/material";
import NavBar from "./NavBarAdmin";

import { Calendar, Views, DateLocalizer, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Pages_data } from "../context/context";
import { getLogin } from "./data";
import moment from "moment";

const pgName = "calendar";

const localizer = momentLocalizer(moment);

export default function CalendarComponent() {
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
    <Container>
      <Box display="flex" justifyContent="center" sx={{ p: 0 }}>
        <NavBar loginType={loginType} />
      </Box>
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
          onSelectSlot={handleSelectSlot}
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
