import React from "react";
const Admin = () => (
  <div className="container">
    <div className="row">
      <div className="col admin-left">
        <p align="left">
          <a href="#" onClick={() => adminClick("upload_roster")}>
            Upload Roster
          </a>
        </p>
        <p align="left">
          <a href="#" onClick={() => adminClick("upload_newsletter")}>
            Upload Newsletter
          </a>
        </p>
        <p align="left">
          <a href="#" onClick={() => adminClick("home")}>
            Home
          </a>
        </p>
        <p align="left">
          <a href="#" onClick={() => adminClick("news")}>
            News
          </a>
        </p>
        <p align="left">
          <a href="#" onClick={() => adminClick("reservations")}>
            Reservations
          </a>
        </p>
        <p align="left">
          <a href="#" onClick={() => adminClick("rules")}>
            Rules
          </a>
        </p>
      </div>
      <div className="col admin-right">{/* <AdminData /> */} *AdminData</div>
    </div>
  </div>
);

export default Admin;

function adminClick(pg) {
  $("#msg").remove();
  $(".admin-pg-wrapper").addClass("hidden");
  var url;
  // switch (pg) {
  //   case "calendar":
  //     window.location = "http://peterpaulproductions.com/Calendar";
  //     break;
  //   case "logout":
  //     break;
  //   case "home":
  //     url = `http://peterpaulproductions.com/ajax/home.php`;
  //     fetch(url)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         let content = atob(data["rows"][0]["content"]);
  //         let html = `<textarea id="editHome" name="formtext">${content}</textarea>`;
  //         $("#admin-home").removeClass("hidden");
  //         $("#admin-home-text").html(html);
  //         tiny("editHome");
  //       })
  //       .catch(console.error);
  //     break;
  //   case "news":
  //     url = `http://peterpaulproductions.com/ajax/news.php`;
  //     fetch(url)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         let content = atob(data["rows"][0]["content"]);
  //         let html = `<textarea id="editNews" name="formtext">${content}</textarea>`;
  //         $("#admin-news").removeClass("hidden");
  //         $("#admin-news-text").html(html);
  //         tiny("editNews");
  //       })
  //       .catch(console.error);
  //     break;
  //   case "rules":
  //     url = `http://peterpaulproductions.com/ajax/rules.php`;
  //     fetch(url)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         let content = atob(data["rows"][0]["content"]);
  //         let html = `<textarea id="editRules" name="formtext">${content}</textarea>`;
  //         $("#admin-rules").removeClass("hidden");
  //         $("#admin-rules-text").html(html);
  //         tiny("editRules");
  //       })
  //       .catch(console.error);
  //     break;
  //   case "reservations":
  //     url = `http://peterpaulproductions.com/ajax/reservations.php`;
  //     fetch(url)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         let content = atob(data["rows"][0]["content"]);
  //         let html = `<textarea id="editReservations" name="formtext">${content}</textarea>`;
  //         $("#admin-reservations").removeClass("hidden");
  //         $("#admin-reservations-text").html(html);
  //         tiny("editReservations");
  //       })
  //       .catch(console.error);
  //     break;
  //   default:
  //     $("#admin-" + pg).removeClass("hidden");
  //     break;
  // }
  // $('#admin-' + pg).fadeIn()
}
