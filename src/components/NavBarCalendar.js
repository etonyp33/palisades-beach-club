import React from "react";
import Link from "next/link";
import { Box } from "@mui/material";
const mouseEnter = (props) => {
  props.currentTarget.classList.add("nav-over");
};
const mouseOut = (props) => {
  props.currentTarget.classList.remove("nav-over");
};
const NavBarCalendar = ({loginType}) => {
  // console.log('Navbar loginType', loginType)
  let calpage = 'calendar'
  return (
    <div id="menu-wrapper" style={{ position: "relative" }}>
      <div className="logout" style={{ position: "absolute", top: "10px", right: "10px" }}>
        <div className="link" id="logout-link">
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
      </div>
    </div>
  );
};

export default NavBarCalendar;
