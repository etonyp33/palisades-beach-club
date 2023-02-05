import React from "react";
import Link from "next/link";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
const mouseEnter = (props) => {
  props.currentTarget.classList.add("nav-over");
};
const mouseOut = (props) => {
  props.currentTarget.classList.remove("nav-over");
};
const NavBar = () => (
  <div id="menu-wrapper">
    <Box display="flex" justifyContent="center" sx={{ p: 4 }}>
      <div className="main-pic">
        <img id="homeHouseTop" src="images/houseS.jpg" />
      </div>
      <div className="main-text">
        <img id="main-text-img" src="images/logo.jpg" width="390" />
        <br />
      </div>
    </Box>
    <div id="mainMenuWrapper" className="hidden">
      <Box display="flex" justifyContent="center" sx={{ p: 4 }}>
        <Link href={"/home"}>
          <div
            className="link"
            id="home-link"
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseOut}
          >
            <img
              src="images/b_home.jpg"
              alt="Home"
              name="home"
              width="58"
              height="30"
              border="0"
            />
          </div>
        </Link>
        <Link href={"/news"}>
          <div
            className="link"
            id="news-link"
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseOut}
          >
            <img
              src="images/b_news.jpg"
              alt="News"
              name="News"
              width="46"
              height="30"
              border="0"
            />
          </div>
        </Link>
        <Link href={"/reservations"}>
          <div
            className="link"
            id="reservations-link"
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseOut}
          >
            <img
              src="images/b_reservations.jpg"
              alt="Reservations"
              name="Reservations"
              width="114"
              height="30"
              border="0"
            />
          </div>
        </Link>
        <Link href={"/rules"}>
          <div
            className="link"
            id="rules-link"
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseOut}
          >
            <img
              src="images/b_rules.jpg"
              alt="Rules And Policy"
              name="Rules"
              width="149"
              height="30"
              border="0"
            />
          </div>
        </Link>
        <Link href={"/calendar"}>
          <div
            className="link"
            id="calendar-link"
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseOut}
          >
            <img
              src="images/b_calendar.jpg"
              alt="Calendar"
              name="Calendar"
              width="93"
              height="30"
              border="0"
            />
          </div>
        </Link>
        <Link href={"/gallery"}>
          <div
            className="link"
            id="gallery-link"
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseOut}
          >
            <img
              src="images/b_gallery.jpg"
              alt="Gallery"
              name="Gallery"
              width="72"
              height="30"
              border="0"
            />
          </div>
        </Link>
        <Link href={"/roster"}>
          <div
            className="link"
            id="roster-link"
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseOut}
          >
            <img
              src="images/b_roster.jpg"
              alt="Roster"
              name="Roster"
              width="58"
              height="30"
              border="0"
            />
          </div>
        </Link>
      </Box>
      {/* <li>
          <Link to="/will-not-match">Will Not Match</Link>
        </li> */}
    </div>
  </div>
);

export default NavBar;
