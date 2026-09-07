import React, { useState, useEffect, useContext } from "react";
import Nav from "./nav";
import { useRouter } from "next/router";
import Parse from "../parse";
import { Pages_data } from "../context/context";
import { getData } from "./data";

const pgName = "roster";

const Roster = () => {
  const [data, setData] = useState("");
  const [rosterUrl, setRosterUrl] = useState("");
  const { pages } = useContext(Pages_data);
  const router = useRouter();

  useEffect(() => {
    try {
      const dataObj = getData(pages, pgName);
      setData(dataObj["content"]);
    } catch (error) {
      router.push("/");
      return;
    }

    const fetchRoster = async () => {
      try {
        const query = new Parse.Query("RosterDocument");

        query.equalTo("active", true);

        const results = await query.find();

        console.log("RosterDocument results:", results);

        if (!results.length) {
          console.error("No active RosterDocument found.");
          return;
        }

        const roster = results[0];

        const url = roster.get("url");

        console.log("Roster URL:", url);

        if (!url) {
          console.error("RosterDocument has no URL.");
          return;
        }

        setRosterUrl(url);
      } catch (error) {
        console.error("Roster query error:", error);
      }
    };
    fetchRoster();
  }, [pages, router]);

  return (
    <>
      <Nav />

      <div
        id={`container-${pgName}`}
        className="basic-pg flex items-center justify-center h-screen mb-12 bg-fixed bg-center bg-cover custom-img"
      >
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-[2] bgUnderlay" />

        <div className="sm:flex z-[2] main-box p-5 m-auto">
          <div className="flex flex-col text-center p-5 basic-page">
            <div className="hd-text-bold formatted-link page-header">Roster</div>

            <hr />

            {rosterUrl ? (
              <iframe
                id="rosterIframe"
                src={rosterUrl}
                width="1200px"
                height="800px"
                title="Palisades Beach Club Roster"
              />
            ) : (
              <div className="p-5">Roster is currently unavailable.</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Roster;
