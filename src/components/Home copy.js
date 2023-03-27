import { useState, useEffect, useContext } from "react";
import { Box, Container, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { getData } from "./data";
import Image from "next/image";
import { Pages_data } from "../context/context";
import {getNavBar} from './NavBarComponent'

const pgName = "home";

export default function HomePage() {
  const [data, setData] = useState("");
  const { pages } = useContext(Pages_data);
  const router = useRouter();
  const dataObj = getData(pages, pgName);
  const [navMenu , setNavMenu] = useState('')

  useEffect(() => {
    try {
      const navBar = getNavBar(pages)
      setNavMenu(navBar)
      setData(dataObj["content"]);
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
      <Box display="flex" justifyContent="center" sx={{ p: 0 }}>
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
            <Box display="flex" justifyContent="center" sx={{ p: 1, margin: `0px 0px 0px 0px` }}>
              <div className="text-container" dangerouslySetInnerHTML={{ __html: data }} />
            </Box>
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
            <Image name="" src={`/images/homePic.jpg`} alt="" width="510" height="383" />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
