import { useState, useEffect, useContext } from "react";
import { Box, Container, Grid } from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import { getData, getBoard } from "./data";
import Image from "next/image";
import { Pages_data } from "../context/context";
import { getNavBar } from "./NavBarComponent";
let iw = "510";
let ih = "383";

const pgName = "home";

export default function HomePage() {
  const [data, setData] = useState("");
  const { pages } = useContext(Pages_data);
  const router = useRouter();
  const dataObj = getData(pages, pgName);
  const [navMenu, setNavMenu] = useState("");
  const [bName, setBName] = useState("");
  const [bEmail, setBEmail] = useState("");

  useEffect(() => {
    try {
      const navBar = getNavBar(pages);
      setNavMenu(navBar);
      setData(dataObj["content"]);
      const bObj = getBoard(pages);
      setBName(bObj.name);
      setBEmail(bObj.email);
    } catch (error) {
      router.push("/");
    }
  }, []);

  //   <IconButton aria-label="delete" size="small">
  //   <DeleteIcon fontSize="inherit" />
  // </IconButton>
  return (
    <Container>
      <Box display="flex" justifyContent="center" sx={{ p: 0 }}>
        {navMenu}
      </Box>
      <Grid
        container
        // spacing={{ xs: 2, md: 3 }}
        justifyContent="center"
        sx={{ margin: `20px 4px 0px 0px` }}
        columns={{ xs: 2, sm: 8, md: 12 }}
      >
        <Grid item xs={2} sm={2} md={2} display="flex" flexDirection={"column"} alignItems="center">
          <Box sx={{ margin: `0px 150px 0px 0px`, width: 500 }}>
            <Box align="center" sx={{ margin: `10px 20px 30px 0px`, width: 500 }}>
              <h3>
                <Link href={"/reservations"}>Make a Reservation</Link>
              </h3>
            </Box>
            <Box align="center" sx={{ margin: `10px 20px 0px 0px`, width: 500 }}>
              Send a Message to the Board
              {/* <div className="text-container text-container-home" dangerouslySetInnerHTML={{ __html: data }} /> */}
            </Box>
            <Box align="center" sx={{ margin: `10px 20px 30px 0px`, width: 500 }}>
              <a href={`mailto:{${bEmail}}`}>{bName}</a>
              {/* <div className="text-container text-container-home" dangerouslySetInnerHTML={{ __html: data }} /> */}
            </Box>
            <Box align="center">
              <div
                className="text-container text-container-home"
                dangerouslySetInnerHTML={{ __html: data }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={2} sm={4} md={4} display="flex" flexDirection={"column"} alignItems="center">
          <Box sx={{ margin: `0px 0px 0px 75px` }}>
            <Image name="" src={`/images/homePic.jpg`} width={iw} height={ih} alt="" />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
