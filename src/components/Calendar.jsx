import React, { useState, useCallback, useMemo, useEffect, useContext } from "react";
import Nav from "./nav";
import { getData, getBoard } from "./data";
import Image from "next/image";
import { Pages_data } from "../context/context";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import { red } from "@mui/material/colors";

const color = red[500];
import { Box, Button, Container, Grid, Typography } from "@mui/material";
const pgName = "calendar";

import { useRouter } from "next/router";
import Parse from "../parse";

import { Calendar, Views, DateLocalizer, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import moment from "moment";
import { getLogin } from "./data";
import { Iron } from "@mui/icons-material";

const localizer = momentLocalizer(moment);

const CalendarAdmin = () => {
  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const { pages, setPages } = useContext(Pages_data);
  const [title, setTitle] = React.useState("");
  const [objId, setObjId] = React.useState("[MEMBER]");
  const [start, setStart] = React.useState("");
  const [end, setEnd] = React.useState("");
  const [eventId, setEventId] = React.useState("");
  const [selectedValue, setSelectedValue] = React.useState("");
  const [selectedEditValue, setSelectedEditValue] = React.useState("");
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

  function retrieve() {
    const getEvents = async () => {
      try {
        let parseQuery = new Parse.Query("Event");
        const res = await parseQuery.findAll();
        const ids = res.map((event) => ({ name: event.id }));
        const names = res.map((event) => ({ name: event.get("title") }));
        const starts = res.map((event) => ({ name: event.get("start") }));
        const ends = res.map((event) => ({ name: event.get("end") }));

        let eventsData = {},
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
      } catch (error) {}
    };
    getEvents();
  }
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  const handleClose = (value) => {
    if (value) {
      deleteEvent();
      // console.log("delete");
    } else {
      // console.log("no delete");
    }
    setOpen(false);
  };

  const handleEditClose = (title) => {
    // console.log( start, end, title )
    if (!title || title === "cancel") {
      setEditOpen(false);
      return;
    }
    setEvents((prev) => [...prev, { start, end, title }]);
    saveEvent(title);
    setEditOpen(false);
  };

  const deleteEvent = async () => {
    if (confirm("Are you sure?")) {
      var query = new Parse.Query("Event");
      query.equalTo("objectId", objId);
      query
        .find()
        .then(function (results) {
          return Parse.Object.destroyAll(results);
        })
        .then(
          function () {
            location.reload();
          },
          function (error) {
            // Error
          }
        );
    }
  };
  const saveEvent = async (title) => {
    try {
      const event = new Parse.Object("Event");
      event.set("title", title);
      event.set("start", start);
      event.set("end", end);
      // return
      //Save the Object
      let result = await event.save();
      location.reload();
      // alert("New object created with objectId: " + result.id);
    } catch (error) {
      location.reload();
      // setEditOpen(false);
      alert("Error");
      // location.reload()
      // alert("Failed to create new object, with error code: " + error.message);
    }
  };
  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      setStart(start);
      setEnd(end);
      setEditOpen(true);
    },
    [setEvents]
  );

  const eventClick = (event) => {
    console.log(event);
    let dt = new Date(event.start);
    setTitle(event.title);
    setObjId(event.objectId);
    // const sDate = event.start.toString().split(" ");
    //    console.log(sDate);
    // setStart(sDate[0] + " " + sDate[1] + " " + sDate[2] + " " + sDate[3] + " " + sDate[4]);
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

  ///////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////********************************************************************** */
  ///////////////////////////////////////////////////////////////////////////
  function EditDialog(props) {
    const [opcl, setOpcl] = React.useState("closed");
    const [memName, setMemName] = React.useState("[MEMBER]");
    const [numGuests, setNumGuests] = React.useState("#");
    const [msg, setMsg] = React.useState("");
    const [memberClass, setMemberClass] = React.useState("");
    const [messageClass, setMessageClass] = React.useState("hidden");
    const [mStringClass, setMstringClass] = React.useState("hidden");
    const [timeString, setTimeString] = React.useState("");
    const [mainStr, setMainStr] = React.useState(false);
    const [openCloseString, setOpenCloseString] = React.useState("");

    const { onClose, selectedValue, open } = props;
    const updateMstring = () => {
      let mStr = "";
      if (messageClass === "hidden") {
        mStr = `${openCloseString} [${timeString}] ${memName} - ${numGuests} Guests `;
      } else if (memberClass === "hidden") {
        mStr = `${msg}`;
      }
      setMainStr(mStr);
      return mStr;
    };
    useEffect(() => {
      try {
        // console.log(start);
        let toString = "";
        let dt = new Date(start);
        let dtEnd = new Date(end);
        let hrs = dt.getHours();
        let mins = dt.getMinutes();
        let hrsEnd = dtEnd.getHours();
        let minsEnd = dtEnd.getMinutes();
        evnt = JSON.stringify(start);
        if (hrs === 0) {
          tString = "ALL DAY";
        } else {
          let ampm = "AM",
            ampmEnd = "AM";

          hString = hrs.toString();
          if (hrs > 12) {
            ampm = "PM";
            let tmpNum = hrs - 12;
            hString = tmpNum.toString();
          }
          mString = mins.toString();
          if (mins < 10) mString = "0" + mString;

          if (hrsEnd - hrs > 1) {
            hEndString = hrsEnd.toString();
            if (hrsEnd > 12) {
              ampmEnd = "PM";
              let tmpNumEnd = hrsEnd - 12;
              hEndString = tmpNumEnd.toString();
            }
            mEndString = minsEnd.toString();
            if (minsEnd < 10) mEndString = "0" + mEndString;
            toString = " to " + hEndString + ":" + mEndString;
          }

          tString = hString + ":" + mString + toString + ampm;
          setTimeString(tString);
        }
        setTimeString(tString);
      } catch (error) {
        // console.log(start, error);
      }
    }, [open]);
    useEffect(() => {
      if (opcl === "message") {
        setOpenCloseString("");
      } else {
        setOpenCloseString(opcl.toUpperCase());
      }
    }, [opcl]);
    useEffect(() => {
      updateMstring();
    }, [openCloseString]);
    useEffect(() => {
      updateMstring();
    }, [memName]);
    useEffect(() => {
      updateMstring();
    }, [numGuests]);
    useEffect(() => {
      updateMstring();
    }, [msg]);
    let evnt = "",
      tString = "",
      hString = "",
      mString = "",
      hEndString = "",
      mEndString = "",
      toString;

    const handleSave = () => {
      onClose(mainStr);
    };

    const handleClose = () => {
      onClose("cancel");
    };
    const handleOpenCloseChange = (e) => {
      setMstringClass("");
      if (e.target.value === "message") {
        setMemberClass("hidden");
        setMessageClass("");
      } else {
        setMemberClass("");
        setMessageClass("hidden");
      }
      setOpcl(e.target.value);
    };

    const keyPressMemName = (e) => {
      setMstringClass("");
      setMemName(e.target.value);
    };

    const keyPressNumGuests = (e) => {
      setMstringClass("");
      setNumGuests(e.target.value);
    };

    const keyPressMessg = (e) => {
      setMstringClass("");
      setMsg(e.target.value);
    };

    return (
      <Dialog maxWidth={"md"} open={open} onClose={handleEditClose}>
        <DialogTitle>New Event</DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <DialogContentText>
            <Box
              component="form"
              flexDirection={"column"}
              sx={{
                "& > :not(style)": { m: 1,  textAlign: "center" },
              }}
              noValidate
              autoComplete="off"
            >
              <FormControl className="" sx={{ margin: "auto" }}>
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="closed"
                  name="radio-buttons-group"
                  onChange={handleOpenCloseChange}
                  // value={selected}
                >
                  <FormControlLabel value="closed" control={<Radio />} label="Closed" />
                  {/* <FormControlLabel value="open" control={<Radio />} label="Open" /> */}
                  <FormControlLabel value="message" control={<Radio />} label="Message" />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "300px" },
              }}
              noValidate
              autoComplete="off"
              className={memberClass}
            >
              <TextField id="member" label="Member" variant="outlined" onKeyUp={keyPressMemName} />
            </Box>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "100px" },
              }}
              noValidate
              autoComplete="off"
              className={memberClass}
            >
              <TextField
                id="guests"
                label="# of Guests"
                variant="outlined"
                onKeyUp={keyPressNumGuests}
              />
            </Box>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "300px" },
              }}
              noValidate
              autoComplete="off"
              className={messageClass}
            >
              <TextField id="message" label="Message" variant="outlined" onKeyUp={keyPressMessg} />
            </Box>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "500px" },
              }}
              noValidate
              autoComplete="off"
            >
              <div className={mStringClass} style={{ marginTop: "20px" }}>
                {mainStr}
              </div>
            </Box>
          </DialogContentText>
        </DialogContent>
        {/* {end} */}
        <DialogActions>
          <Button variant="oulined" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    );
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////********************************************************************** */
  ///////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;
    const [objId, setObjId] = React.useState("[MEMBER]");

    const handleClose = () => {
      onClose(false);
    };
    const handleDelete = () => {
      onClose(true);
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

        <Box className="" sx={{ w: "300px", textAlign: "right" }}>
          <IconButton sx={{ m: 0, color: "#d11e1e" }} aria-label="save" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Box>
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
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

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
      <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
      <EditDialog selectedValue={selectedEditValue} open={editOpen} onClose={handleEditClose} />
    </>
  );
};

export default CalendarAdmin;
// / ml-[-10rem] mt-[-10rem]
// <h2 className="text-5xl font-bold">Heading</h2>
