import React from "react";
import Link from "next/link";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import ExitToAppTwoToneIcon from "@mui/icons-material/ExitToAppTwoTone";
const Navbar = () => {
  const [nav, setNav] = React.useState(false);

  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <div className="fixed left-0 top-0 w-full z-10 ease-in duration-300 nav-outer">
      <div className="max-w-[1240px] m-auto flex justify-between items-center pp-4">
        <div className="m-2">
          <Link href={"/home"}>
            <Image className="m-auto" src="/images/houseXS.png" width={"90"} height="60" alt="" />
          </Link>
        </div>
        <ul className="hidden sm:flex">
          <li className="p-4" title="Log Out">
            <Link href={"/"}>
              <IconButton sx={{ ml: 5 }} aria-label="save">
                <ExitToAppTwoToneIcon sx={{ color: "white" }} />
              </IconButton>
            </Link>
          </li>
        </ul>

        {/* Mobile Button */}
        <div onClick={handleNav} className="p-2 block sm:hidden z-10">
          {nav ? <MenuOpenIcon /> : <MenuIcon />}
        </div>
        <div
          className={
            nav
              ? "sm:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen text-center ease-in duration-300 nav-sm bg-lime-900/90"
              : "sm:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen text-center ease-in duration-300 nav-lg bg-lime-900/90"
          }
        >
          <ul>
            <li onClick={handleNav} title="Log Out" className="p-4 text-4xl hover:text-gray-500">
              <Link href={"/"}>
                <IconButton sx={{ ml: 5 }} aria-label="save">
                  <ExitToAppTwoToneIcon sx={{ color: "white" }} />
                </IconButton>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
