import React, { useState, useEffect, useContext } from "react";
import { Pages_data } from "../../context/context";
import { getLogin, getCurrentPage } from "../../components/data";
import Navbar from "./Navbar";
import NavbarCalendar from "./NavbarCalendar";
import NavbarAdmin from "./NavbarAdmin";


const Nav = ({typex="member"}) => {
  const { pages } = useContext(Pages_data);
  const [nav, setNav] = React.useState(<div></div>);
  useEffect(() => {
    let type = sessionStorage.getItem("lt");
    if (location.pathname === "/") {
      setNav("");
    } else if (type && type === "member") {
      sessionStorage.setItem("navType", type);
      setNav(<Navbar admin={false} />);
    } else if (type && type === "administrator") {
      sessionStorage.setItem("navType", type);
      setNav(<NavbarAdmin admin={true} />);
    } else if (type && type === "calendar") {
      sessionStorage.setItem("navType", type);
      setNav(<NavbarCalendar />);
    }
  }, [pages]);
  return <>{nav}</>;
  //   return <div>index</div>;
};

export default Nav;
