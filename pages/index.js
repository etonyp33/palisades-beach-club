import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
const loginEnter = (props) => {
  if (props.key === "Enter") {
    // loginClick();
  }
};

let innerSx = { p: 1 };
import App from "./App";
const handleAuth = () => (isRegistering ? handleRegister() : handleLogin());

export default function Home() {
  const router = useRouter();
  const handleLogin = () => {
    router.push("/home");
  };

  const [crud, setCrud] = useState("");
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

  useEffect(() => {
    // setCrud(<Crud />);
  }, []);
  return (
    <>
      <div
        style={{
          zIndex: -1,
          position: "fixed",
          width: "100vw",
          height: "100vw",
          backgroundImage: `url("bg.gif")`,
        }}
      >
        {/* <Image src="/Sand.jpg" alt="Sand" layout="fill" objectFit="cover" /> */}
      </div>

      <Container>
        <Box display="flex" justifyContent="center" sx={{ p: 4 }}>
          <Image src="/images/logoMainSm.png" width={"400"} height="89" />
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
            <Box
              display="flex"
              justifyContent="center"
              sx={{ p: 1, margin: `0px 0px 0px 0px` }}
            >
              <input
                name="password"
                type="password"
                id="password"
                size="15"
                onKeyUpCapture={loginEnter}
              />

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
            <Box
              display="flex"
              justifyContent="center"
              sx={{ p: 1, margin: `0px 0px 0px 0px` }}
            >
              <button onClick={handleLogin} value="Submit">
                SUBMIT
              </button>
            </Box>
            <Grid
              item
              // spacing={{ xs: 2, md: 3 }}
              justifyContent="center"
              sx={{ margin: `20px 0px 0px 0px`, width: "100%" }}
              columns={{ xs: 2, sm: 8, md: 12 }}
            >
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
              <Box align="center" sx={innerSx}>
                <a href="ppbc_directions.doc" target="_blank" className="main">
                  Download Directions (doc)
                </a>
              </Box>
              <Box align="center" className="main" sx={innerSx}>
                <a target="_blank" href="images/pcbmap.pdf">
                  View Map
                </a>
              </Box>
            </Grid>
          </Grid>
          <Grid
            item
            xs={2}
            sm={4}
            md={4}
            display="flex"
            // flexDirection={"column"}
            alignItems="center"
          >
            <Image
              name=""
              src={`/images/${indexPic}.png`}
              width={iw}
              height={ih}
              alt=""
            />
          </Grid>
        </Grid>
      </Container>
      {/* <main className={styles.main}>
        <div className={styles.description}>
          <App />
        </div>
        <div className={styles.center}>
          <input
            className={styles.input}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="user name"
          />
          <input
            className={styles.input}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            type="password"
          />

          <button onClick={handleLogin}>Log In</button>
        </div>
        <div className={styles.grid}></div>
      </main> */}
    </>
  );
}

{
  /* <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>{crud}</div>

        <div className={styles.center}>
          <input
            className={styles.input}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="user name"
          />
          <input
            className={styles.input}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            type="password"
          />

          <button onClick={handleLogin}>Log In</button>
        </div>

        <div className={styles.grid}></div>
      </main> */
}
