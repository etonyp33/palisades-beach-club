import React, { useState, useEffect, useContext } from "react";
import { Pages_data } from "../../context/context";
import {getLogin, getCurrentPage} from '../../components/data'
import Navbar from "./Navbar";

const Nav = () => {
  const { pages } = useContext(Pages_data);
  const [nav, setNav] = React.useState(<div></div>);
  useEffect(() => {
    const type = getLogin()
    let showNav = false
    if(pages && (type === 'member' || type==='administrator')) {
        setNav(<Navbar />)
    }
  }, [pages]);
  return <>{nav}</>;
  //   return <div>index</div>;
};

export default Nav;
