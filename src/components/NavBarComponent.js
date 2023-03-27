import NavBar from "./NavBar";
import NavBarCalendar from "./NavBarCalendar";
import NavBarAdmin from "./NavBarAdmin";

export function getNavBar(pages) {
  let ret = [];
  let pgsData = pages;
  if (typeof pages === "undefined") {
    try {
      pgsData = JSON.parse(sessionStorage.getItem("pgsData"));
      return navBar(pgsData["type"]);
    } catch (error) {
      return "";
    }
  } else {
    ret["loginType"] = pages["type"];
    return navBar(pages["type"]);
  }
}
function navBar(loginType) {
  let navBar;
  switch (loginType) {
    case "member":
      navBar = <NavBar />;
      break;
    case "administrator":
      navBar = <NavBarAdmin />;
      break;
    case "calendar":
      navBar = <NavBarCalendar />;
      break;
  }
  return navBar;
}
