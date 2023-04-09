import React, { useState, useEffect, useContext } from "react";

import Image from "next/image";
import Parse from "../../src/parse";
// import styles from "../styles/Home.module.css";
import { Box, Button, Container, Grid, Typography, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import md5 from "md5";
import { Pages_data } from "../../src/context/context";

import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { loginCheck } from "../../src/components/verify";

const pgName = "landing";

const Landing = () => {
  useEffect(() => {
    setPages(false);
    // console.log(pages);
  }, []);

  const [loginType, setLoginType] = React.useState("member");

  const handleChange = (event) => {
    setLoginType(event.target.value);
  };

  const { pages, setPages } = useContext(Pages_data);
  const [pw, setPw] = useState("");
  const router = useRouter();
  const onKeyUp = (e) => {
    // console.log(e.target.value);
    setPw(e.target.value);
    // router.push("/home");
  };

  const loginEnter = (props) => {
    if (props.key === "Enter") {
      handleLogin();
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = (e) => {
    let ltype = false;
    const str = md5(pw.toLowerCase());
    if (
      str === process.env.NEXT_PUBLIC_MEMBER_LOGIN_1 ||
      str === process.env.NEXT_PUBLIC_MEMBER_LOGIN_2
    )
      ltype = "member";
    if (
      str === process.env.NEXT_PUBLIC_CALENDAR_LOGIN_1 ||
      str === process.env.NEXT_PUBLIC_CALENDAR_LOGIN_2
    )
      ltype = "calendar";
    if (
      str === process.env.NEXT_PUBLIC_ADMIN_LOGIN_1 ||
      str === process.env.NEXT_PUBLIC_ADMIN_LOGIN_2
    )
      ltype = "administrator";

    // ltype = "administrator";
    switch (ltype) {
      case "member":
        sessionStorage.setItem("lt", "member");
        sessionStorage.setItem("init", "true");
        setLoginType("member");
        retrieve();
        break;
      case "calendar":
        sessionStorage.setItem("lt", "member");
        setLoginType("calendar");
        router.push("/calendarpg");
        break;
      case "administrator":
        sessionStorage.setItem("lt", "administrator");
        setLoginType("administrator");
        retrieve();
        break;
    }
    return;

    function retrieve() {
      const getPgs = async () => {
        let parseQuery = new Parse.Query("Page");
        const res = await parseQuery.findAll();
        const pages = res.map((page) => ({ name: page.get("name") }));
        const content = res.map((page) => ({ name: page.get("content") }));
        let str,
          pgsData = {};
        for (let i in pages) {
          str = pages[i]["name"];
          if (loginType && str === "calendar" && loginType === "calendar") {
            pgsData[str] = content[i]["name"];
          } else if (loginType && loginType !== "calendar") {
            pgsData[str] = content[i]["name"];
          }
        }
        pgsData["type"] = loginType;
        sessionStorage.setItem("pgsData", JSON.stringify(pgsData));
        pgsData["currentPage"] = "landing";
        setPages(pgsData);
        let admin = false
        if(sessionStorage.getItem('lt') === 'administrator') admin = true
        if(admin) {
          router.push("/calendar_admin");
        } else {
          router.push("/home");
        }
      };
      getPgs();
    }
  };
  return (
    <div
      id={`container-${pgName}`}
      className="flex items-center justify-center h-screen bg-fixed bg-center bg-cover custom-img-landing"
    >
      <div className="absolute top-0 left-0 right-0 bottom-0  bg-black/40 z-[2] bgUnderlay" />

      <div className="p-5  z-[2] landing-box">
        <Box display="flex" justifyContent="center" sx={{ p: 0, margin: `0px 0px 0px 0px` }}>
          <Image className="m-auto" src="/images/houseS.png" width={"200"} height="130" alt="" />
        </Box>
        <Box display="flex" justifyContent="center" sx={{ p: 0, margin: `0px 0px 0px 0px` }}>
          <p className="heading py-5 text-xl m-auto">Palisades Beach Club</p>
        </Box>
        <Box display="flex" justifyContent="center" sx={{ p: 1, margin: `0px 0px 5px 0px` }}>
          <FormControl sx={{ m: 0, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              onKeyUp={onKeyUp}
              onKeyUpCapture={loginEnter}
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </Box>
        <Box display="flex" justifyContent="center" sx={{ p: 1, margin: `0px 0px 20px 0px` }}>
          <Button
            variant="outlined"
            onClick={handleLogin}
            sx={{ border: "1px solid #bbb", color: "#555" }}
          >
            Submit
          </Button>
        </Box>

        <Box display="flex" justifyContent="center" sx={{ p: 0, margin: `0px 0px 0px 0px` }}>
          <p className="text-xl m-auto text-center">267 Pacific Coast Hwy</p>
        </Box>
        <Box display="flex" justifyContent="center" sx={{ p: 0, margin: `0px 0px 0px 0px` }}>
          <p className="text-xl m-auto text-center">Santa Monica, CA</p>
        </Box>
        <Box display="flex" justifyContent="center" sx={{ p: 0, margin: `0px 0px 0px 0px` }}>
          <p className="text-xl m-auto text-center">90402</p>
        </Box>
        <Box display="flex" justifyContent="center" sx={{ p: 0, margin: `0px 0px 0px 0px` }}>
          <p className="text-xl m-auto text-center">310-394-9266</p>
        </Box>
        <Box display="flex" justifyContent="center" sx={{ p: 0, margin: `0px 0px 0px 0px` }}>
          <p className="text-xl m-auto text-center">
            <a
              target="_blank"
              href="https://maps.google.com/maps?f=q&hl=en&q=267+Pacific+Coast+Hwy,+Santa+Monica,+CA,+90402&zoom=4"
              className="main formatted-link"
            >
              Get Driving Directions (Google)
            </a>
          </p>
        </Box>       
        <Box display="flex" justifyContent="center" sx={{ p: 0, margin: `0px 0px 0px 0px` }}>
          <p className="text-xl m-auto text-center">
            <a
              target="_blank"
              href="http://www.palisadesbeachclub.com/images/pcbmap.pdf"
              className="main formatted-link"
            >
              View Map
            </a>
          </p>
        </Box>
      </div>
    </div>
  );
};

export default Landing;
// / ml-[-10rem] mt-[-10rem]
// <h2 className="text-5xl font-bold">Heading</h2>
