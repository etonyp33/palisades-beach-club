import React from "react";
import Link from "next/link";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
const Navbar = () => {
  const [nav, setNav] = React.useState(false);

  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <div  className="fixed left-0 top-0 w-full z-10 ease-in duration-300 nav-outer">
      <div className="max-w-[1240px] m-auto flex justify-between items-center pp-4">
        <Link href={"/"}>
          {" "}
          <Image className="m-auto" src="/images/houseXS.png" width={"130"} height="85" alt="" />
        </Link>

        <ul className="hidden sm:flex">
          <li className="p-4 top-nav-link">
            <Link href={"/reservations"}>Reservations</Link>
          </li>
          <li className="p-4 top-nav-link">
            <Link href={"/rules"}></Link>Rules
          </li>
          <li className="p-4 top-nav-link">
            <Link href={"/calendar"}>Calendar</Link>
          </li>
          <li className="p-4 top-nav-link">
            <Link href={"/gallery"}>Gallery</Link>
          </li>
          <li className="p-4 top-nav-link">
            <Link href={"/roster"}>Roster</Link>
          </li>
          <li className="p-4 top-nav-link">
            <Link href={"/logout"}>Log Out</Link>
          </li>
        </ul>

        {/* Mobile Button */}
        <div onClick={handleNav} className="p-2 block sm:hidden z-10">
          {nav ? <MenuOpenIcon /> : <MenuIcon />}
        </div>
        <div
          className={
            nav
              ? "sm:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen text-center ease-in duration-300"
              : "sm:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen text-center ease-in duration-300"
          }
        >
          <ul>
            <li className="p-4 text-4xl hover:text-gray-500">
              <Link href={"/reservations"}>Reservations</Link>
            </li>
            <li className="p-4 text-4xl hover:text-gray-500">
              <Link href={"/rules"}></Link>Rules
            </li>
            <li className="p-4 text-4xl hover:text-gray-500">
              <Link href={"/calendar"}>Calendar</Link>
            </li>
            <li className="p-4 text-4xl hover:text-gray-500">
              <Link href={"/gallery"}>Gallery</Link>
            </li>
            <li className="p-4 text-4xl hover:text-gray-500">
              <Link href={"/roster"}>Roster</Link>
            </li>
            <li className="p-4 text-4xl hover:text-gray-500">
              <Link href={"/logout"}>Log Out</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
