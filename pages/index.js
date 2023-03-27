import React, { useState, useEffect, useContext } from "react";

import Image from "next/image";
import Parse from "../src/parse";
import styles from "../styles/Home.module.css";
import { Box, Button, Container, Grid, Typography, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import md5 from "md5";
import { Pages_data } from "../src/context/context";

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
import { loginCheck } from "../src/components/verify";

let innerSx = { p: 1 };
import App from "./App";
const handleAuth = () => (isRegistering ? handleRegister() : handleLogin());
const encodeBase64 = (data) => {
  return Buffer.from(data).toString("base64");
};
const decodeBase64 = (data) => {
  return Buffer.from(data, "base64").toString("ascii");
};

export default function Home() {
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
    const str = md5(pw);
    switch (loginType) {
      case "member":
        if (
          pw === '' ||
          str === process.env.NEXT_PUBLIC_MEMBER_LOGIN_1 ||
          str === process.env.NEXT_PUBLIC_MEMBER_LOGIN_2
        ) {
          setLoginType("member");
          retrieve();
        }
        break;
      case "calendar":
        if (
          pw === '' ||
          str === process.env.NEXT_PUBLIC_CALENDAR_LOGIN_1 ||
          str === process.env.NEXT_PUBLIC_CALENDAR_LOGIN_2
        ) {
          setLoginType("calendar");
          router.push("/calendarpg");
          return
        }
        break;
      case "administrator":
        if (
          pw === '' ||
          str === process.env.NEXT_PUBLIC_ADMIN_LOGIN_1 ||
          str === process.env.NEXT_PUBLIC_ADMIN_LOGIN_2
        ) {
          setLoginType("administrator");
          retrieve();
        }
        break;
    }
  };

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  let indexPic = "indexPic";
  let iw = "510";
  let ih = "383";
  let innerSx = { p: 1 };
  if (matches) {
    indexPic = "indexPicSm";
    iw = "300";
    ih = "225";
  }

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
      pgsData['type'] = loginType
      sessionStorage.setItem('pgsData', JSON.stringify(pgsData))
      setPages(pgsData);
      console.log(loginType)
      if(loginType === 'administrator') {
        router.push("/admin");
      } else {
        router.push("/home");
      }
    };
    getPgs();
  }
  return (
    <>
      <Container>
        <Box display="flex" justifyContent="center" sx={{ p: 4 }}>
          <Image src="/images/logoMainSm.png" width={"400"} height="89" alt="" />
        </Box>
        <Grid
          container
          // spacing={{ xs: 2, md: 3 }}
          justifyContent="center"
          sx={{ margin: `20px 4px 0px 0px` }}
          columns={{ xs: 2, sm: 8, md: 12 }}
        >
          <Grid
            item
            xs={2}
            sm={2}
            md={2}
            display="flex"
            flexDirection={"column"}
            alignItems="center"
          >
            <Box sx={{ margin: `0px 150px 0px 0px` }}>
              <Box
                display="flex"
                justifyContent="center"
                sx={{ p: 1, width: 220, margin: `0px 0px 0px 0px` }}
              >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">User Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={loginType}
                    label="User Type"
                    onChange={handleChange}
                  >
                    <MenuItem value={"member"}>Member</MenuItem>
                    <MenuItem value={"calendar"}>Calendar</MenuItem>
                    <MenuItem value={"administrator"}>Administrator</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box display="flex" justifyContent="center" sx={{ p: 1, margin: `0px 0px 0px 0px` }}>
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
                {/* <span className="eyeIcon" onClick={pwToggle}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="img"
                  width="1em"
                  height="1em"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 1024 1024"
                >
                  <path
                    fill="currentColor"
                    d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 0 0 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3c7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176s176-78.8 176-176s-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112s112 50.1 112 112s-50.1 112-112 112z"
                  />
                </svg>
              </span> */}
              </Box>

              <Box display="flex" justifyContent="center" sx={{ p: 1, margin: `0px 0px 0px 0px` }}>
                <Button
                  variant="outlined"
                  onClick={handleLogin}
                  sx={{ border: "1px solid #bbb", color: "#555" }}
                >
                  Submit
                </Button>
              </Box>
              <Box alignItems="center" align="center" sx={innerSx}>
                267 Pacific Coast Hwy
              </Box>
              <Box alignItems="center" align="center" sx={innerSx}>
                Santa Monica, CA
              </Box>
              <Box align="center" sx={innerSx}>
                90402{" "}
              </Box>
              <Box align="center" sx={innerSx}>
                310-394-9266
              </Box>
              <Box align="center" sx={innerSx}>
                <a
                  target="_blank"
                  href="https://maps.google.com/maps?f=q&hl=en&q=267+Pacific+Coast+Hwy,+Santa+Monica,+CA,+90402&zoom=4"
                  className="main"
                >
                  Get Driving Directions (Google){" "}
                </a>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            sm={4}
            md={4}
            display="flex"
            flexDirection={"column"}
            alignItems="center"
          >
            <Box sx={{ margin: `0px 0px 0px 75px` }}>
              <Image name="" src={`/images/${indexPic}.png`} width={iw} height={ih} alt="" />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
