import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Parse from "./services/parse";

export default function Crud() {
  const [pageName, setPageName] = useState("");
  const [pageContent, setPageContent] = useState("");

  const [pages, setPages] = useState([]);
  useEffect(() => {}, []);
  const createPage = () => {
    const page = new Parse.Object("Page");
    page
      .save({
        page: pageName,
        content: pageContent,
      })
      .then(function (response) {
        setPageName("");
        setPageContent("");
        alert(
          "New object create with success! ObjectId: " +
            response.id +
            ", " +
            page.get("page")
        );
      })
      .catch(function (error) {
        alert("Error: " + error.message);
      });
  };

  const getPgs = async () => {
    let parseQuery = new Parse.Query("Page");
    // The query will resolve only after calling this method
    let queryResult = await parseQuery.find();
    alert(JSON.stringify(queryResult));
  };

  const getPages = async () => {
    const query = new Parse.Query("Page");
    const res = await query.findAll();
    const pages = res.map((page) => ({ name: page.get("page") }));
    alert(JSON.stringify(pages));
  };
  return (
    <div className={styles.container}>
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1>Create a page </h1>
        <div>
          <input
            placeholder="name"
            onChange={(e) => setPageName(e.target.value)}
            value={pageName}
          />
          <input
            placeholder="content"
            onChange={(e) => setPageContent(e.target.value)}
            value={pageContent}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <button onClick={createPage}>create page</button>
          <button onClick={getPgs}> list created pages</button>
        </div>
      </section>
      <section>
        <h2>pages</h2>
        <ul>
          {pages.map(({ name }) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
