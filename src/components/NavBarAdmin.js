import React from "react";
import Link from "next/link";
import { Box } from "@mui/material";
const mouseEnter = (props) => {
  props.currentTarget.classList.add("nav-over");
};
const mouseOut = (props) => {
  props.currentTarget.classList.remove("nav-over");
};
const NavBarAdmin = () => {
  return (
    <div id="menu-wrapper" style={{ position: "relative" }}>
      <div className="logout" style={{ position: "absolute", top: "10px", right: "10px" }}>
        <div className="link" id="logout-link">
          <Link href={"/admin"}>Admin</Link>
          |
          <Link href={"/logout"}>Log Out</Link>
        </div>
      </div>
      <Box display="flex" justifyContent="center" sx={{ p: 2 }}>
        <div className="main-pic">
          <img id="homeHouseTop" src="images/houseS.jpg" />
        </div>
        <div className="main-text">
          <img id="main-text-img" src="images/logo.jpg" width="390" />
          <br />
        </div>
      </Box>
      <div id="mainMenuWrapper">
        <Box display="flex" justifyContent="center" sx={{ p: 2 }}>
          <Link href={"/home"}>
            <div className="link" id="home-link" onMouseEnter={mouseEnter} onMouseLeave={mouseOut}>
              Home
            </div>
          </Link>
          <Link href={"/news"}>
            <div className="link" id="news-link" onMouseEnter={mouseEnter} onMouseLeave={mouseOut}>
              News
            </div>
          </Link>
          <Link href={"/reservations"}>
            <div
              className="link"
              id="reservations-link"
              onMouseEnter={mouseEnter}
              onMouseLeave={mouseOut}
            >
              Reservations
            </div>
          </Link>
          <Link href={"/rules"}>
            <div className="link" id="rules-link" onMouseEnter={mouseEnter} onMouseLeave={mouseOut}>
              Rules
            </div>
          </Link>
          <Link href={`/calendar_admin`}>
            <div
              className="link"
              id="calendar-link"
              onMouseEnter={mouseEnter}
              onMouseLeave={mouseOut}
            >
              Calendar
            </div>
          </Link>
          <Link href={"/gallery"}>
            <div
              className="link"
              id="gallery-link"
              onMouseEnter={mouseEnter}
              onMouseLeave={mouseOut}
            >
              Gallery
            </div>
          </Link>
          <Link href={"/roster"}>
            <div
              className="link"
              id="roster-link"
              onMouseEnter={mouseEnter}
              onMouseLeave={mouseOut}
            >
              Roster
            </div>
          </Link>
        </Box>
      </div>
      <div className="hRule"></div>
    </div>
  );
};

export default NavBarAdmin;
