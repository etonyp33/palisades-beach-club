import Parse from "./parse";
import { useState, useEffect, useContext } from "react";
import { Pages_data } from "../src/context/context";

export function retrieve() {
  const { pages, setPages } = useContext(Pages_data);
  const getPgs = async () => {
    let parseQuery = new Parse.Query("Page");
    let queryResult = await parseQuery.find();
    const res = await parseQuery.findAll();
    const pages = res.map((page) => ({ name: page.get("page") }));
    const content = res.map((page) => ({ name: page.get("content") }));
    let str,
      pgsData = {};
    for (let i in pages) {
      str = pages[i]["name"];
      pgsData[str] = content[i]["name"];
    }
    setPages({
      home: pgsData["home"],
      news: pgsData["news"],
      gallery: pgsData["gallery"],
      reservations: pgsData["reservations"],
      rules: pgsData["rules"],
    });
    return true;
  };
  return getPgs();
}
