import React, { useState, useEffect, useContext } from "react";
import Parse from "../../src/parse";
import Nav from "./nav";
import { Box, Container, Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/router";
import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { getData, getBoard } from "./data";
import { Pages_data } from "../context/context";
import GalleryManagement from "./GalleryManagement";
import "react-quill/dist/quill.snow.css";
// import Link from "next/link";
import EditorToolbar, { modules, formats } from "./EditorToolbar";

const ReactQuill = typeof window === "object" ? require("react-quill") : () => false;

const encodeBase64 = (data) => {
  return Buffer.from(data).toString("base64");
};
const pgName = "admin";

const Admin = () => {
  const { pages } = useContext(Pages_data);
  const router = useRouter();
  const [navMenu, setNavMenu] = useState("");
  const [bName, setBName] = useState("");
  const [bEmail, setBEmail] = useState("");

  const [saveType, setSaveType] = useState("home");
  const [label, setLabel] = useState("Home");
  const [value, setValue] = useState("");
  const [quillClass, setQuillClass] = useState("q-home");
  const [boardEdit, setBoardEdit] = useState("");

  const [editor, setEditor] = useState(false);

  const [galleries, setGalleries] = useState([]);
  const [galleryName, setGalleryName] = useState("");
  const [gallerySlug, setGallerySlug] = useState("");
  const [galleryDescription, setGalleryDescription] = useState("");
  const [galleryLoading, setGalleryLoading] = useState(false);

  const handleClick = (e) => {
    try {
      const type = e.currentTarget.getAttribute("name").toLowerCase();

      setLabel(e.currentTarget.getAttribute("name"));
      setSaveType(type);

      if (type === "gallery") {
        setValue("");
        setQuillClass("q-gallery");
        setBoardEdit("hidden");
        setEditor(false);
        return;
      }

      setEditor(true);

      const obj = getData(pages, type);
      setValue(obj["content"]);

      if (type === "home") {
        setQuillClass("q-home");
        setBoardEdit("");
      } else {
        setQuillClass("q-" + type);
        setBoardEdit("hidden");
      }
    } catch (error) {
      console.error("Admin menu error:", error);
    }
  };

  useEffect(() => {
    try {
      setLabel("Home");
      const obj = getData(pages, "home");
      setValue(obj["content"]);
      const bObj = getBoard(pages);
      setBName(bObj.name);
      setBEmail(bObj.email);
      // setData(dataObj["content"]);
      const ReactQuill = typeof window === "object" ? require("react-quill") : () => false;
      // console.log(value);
      setEditor(true);
      loadGalleries();
    } catch (error) {
      router.push("/");
    }
  }, []);

  function pageId(name) {
    let id;

    switch (name) {
      case "home":
        id = process.env.NEXT_PUBLIC_HOME_ID;
        break;

      case "news":
        id = process.env.NEXT_PUBLIC_NEWS_ID;
        break;

      case "info":
        id = process.env.NEXT_PUBLIC_INFO_ID;
        break;

      case "rules":
        id = process.env.NEXT_PUBLIC_RULES_ID;
        break;

      case "reservations":
        id = process.env.NEXT_PUBLIC_RESERVATIONS_ID;
        break;
    }

    return id;
  }

  async function loadGalleries() {
    try {
      const query = new Parse.Query("Gallery");

      query.equalTo("active", true);
      query.ascending("sortOrder");

      const results = await query.find();

      const galleryData = results.map((gallery) => ({
        id: gallery.id,
        name: gallery.get("name"),
        slug: gallery.get("slug"),
        description: gallery.get("description") || "",
        isDefault: gallery.get("isDefault") || false,
        sortOrder: gallery.get("sortOrder") || 0,
      }));

      setGalleries(galleryData);
    } catch (error) {
      console.error("Gallery load error:", error);
    }
  }

  function runSave() {
    const save = async () => {
      let result;
      const page = new Parse.Object("Page");
      // const pgId = getPageId(pages, saveType);
      const pgId = pageId(saveType);

      if (!pgId) {
        alert(`No Page ID configured for "${saveType}".`);
        return;
      }
      //set the object //1TYHBbJiDg
      page.set("objectId", pgId);
      //define the new values

      page.set("content", encodeBase64(value));
      try {
        //Save the Object
        result = await page.save();
        alert("Save Successful");
      } catch (error) {
        alert("Failed to update object, with error code: " + error.message);
      }
      // console.log(saveType);
      if (saveType === "home") {
        try {
          page.set("objectId", process.env.NEXT_PUBLIC_HOME_NAME_ID);
          page.set("content", encodeBase64(bName));
          result = await page.save();
        } catch (error) {}
        try {
          page.set("objectId", process.env.NEXT_PUBLIC_HOME_EMAIL_ID);
          page.set("content", encodeBase64(bEmail));
          result = await page.save();
        } catch (error) {}
      }
    };
    save();
  }
  const QuillToolbar = () => (
    <div id="toolbar">
      <span className="ql-formats">
        <select className="ql-font" defaultValue="arial">
          <option value="arial">Arial</option>
          <option value="comic-sans">Comic Sans</option>
          <option value="courier-new">Courier New</option>
          <option value="georgia">Georgia</option>
          <option value="helvetica">Helvetica</option>
          <option value="lucida">Lucida</option>
        </select>
        <select className="ql-size" defaultValue="medium">
          <option value="extra-small">Size 1</option>
          <option value="small">Size 2</option>
          <option value="medium">Size 3</option>
          <option value="large">Size 4</option>
        </select>
        <select className="ql-header" defaultValue="3">
          <option value="1">Heading</option>
          <option value="2">Subheading</option>
          <option value="3">Normal</option>
        </select>
      </span>
      <span className="ql-formats">
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
        <button className="ql-strike" />
      </span>
      <span className="ql-formats">
        <button className="ql-list" value="ordered" />
        <button className="ql-list" value="bullet" />
        <button className="ql-indent" value="-1" />
        <button className="ql-indent" value="+1" />
      </span>
      <span className="ql-formats">
        <button className="ql-script" value="super" />
        <button className="ql-script" value="sub" />
        <button className="ql-blockquote" />
        <button className="ql-direction" />
      </span>
      <span className="ql-formats">
        <select className="ql-align" />
        <select className="ql-color" />
        <select className="ql-background" />
      </span>
      <span className="ql-formats">
        <button className="ql-link" />
        <button className="ql-image" />
        <button className="ql-video" />
      </span>
      <span className="ql-formats">
        <button className="ql-formula" />
        <button className="ql-code-block" />
        <button className="ql-clean" />
      </span>
      <span className="ql-formats">
        <button className="ql-undo">
          <CustomUndo />
        </button>
        <button className="ql-redo">
          <CustomRedo />
        </button>
      </span>
    </div>
  );

  return (
    <>
      <Nav />
      <div
        id={`container-${pgName}`}
        className="basic-pg flex items-center justify-center h-screen bg-fixed bg-center bg-cover custom-img"
      >
        <div className="absolute top-0 left-0 right-0 bottom-0  bg-black/40 z-[2] bgUnderlay" />
        <div className="sm:flex z-[2] main-box main-box-admin p-5 m-auto">
          <div className="flex flex-col text-center p-5 basic-page">
            <div className="hd-text-bold formatted-link page-header">Page Edit</div>
            <hr></hr>

            <Box display="flex" justifyContent="center" height={"100%"} width="100%" sx={{ p: 0 }}>
              <div id="mainMenuWrapper">
                <Box display="flex" justifyContent="center" sx={{ p: 2 }}>
                  <div
                    className="admin-link  formatted-link pl-1  pr-1"
                    onClick={handleClick}
                    name="Home"
                    id="Home"
                  >
                    <Typography variant="h6" gutterBottom>
                      Home
                    </Typography>
                  </div>
                  <span className="menu-divider">|</span>
                  <div
                    className="admin-link  formatted-link pl-1  pr-1"
                    onClick={handleClick}
                    name="News"
                    id="News"
                  >
                    <Typography variant="h6" gutterBottom>
                      News
                    </Typography>
                  </div>
                  <span className="menu-divider">|</span>
                  <div
                    className="admin-link  formatted-link pl-1  pr-1"
                    onClick={handleClick}
                    name="Info"
                    id="Info"
                  >
                    <Typography variant="h6" gutterBottom>
                      Info
                    </Typography>
                  </div>
                  <span className="menu-divider">|</span>
                  <div
                    className="admin-link  formatted-link pl-1  pr-1"
                    onClick={handleClick}
                    name="Gallery"
                    id="Gallery"
                  >
                    <Typography variant="h6" gutterBottom>
                      Gallery
                    </Typography>
                  </div>
                  <span className="menu-divider">|</span>
                  <div
                    className="admin-link  formatted-link pl-1  pr-1"
                    onClick={handleClick}
                    name="Reservations"
                    id="Reservations"
                  >
                    <Typography variant="h6" gutterBottom>
                      Reservations
                    </Typography>
                  </div>
                  <span className="menu-divider">|</span>
                  <div
                    className="admin-link  formatted-link pl-1  pr-1"
                    onClick={handleClick}
                    name="Rules"
                    id="Rules"
                  >
                    <Typography variant="h6" gutterBottom>
                      Rules
                    </Typography>
                  </div>
                  {saveType !== "gallery" && (
                    <IconButton sx={{ ml: 5 }} aria-label="save" onClick={runSave}>
                      <SaveIcon />
                    </IconButton>
                  )}
                </Box>
                <div className={boardEdit}>
                  <Box display="flex" justifyContent="center" width="1100px" sx={{ p: 0 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Board
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="center" width="1100px" sx={{ p: 1 }}>
                    <TextField
                      size="small"
                      onChange={(event) => {
                        setBName(event.target.value);
                      }}
                      // onChange={onChangeBname}
                      value={bName}
                      label="Name"
                      variant="outlined"
                    />
                  </Box>
                  <Box display="flex" justifyContent="center" width="1100px" sx={{ p: 1, pb: 3 }}>
                    <TextField
                      size="small"
                      onChange={(event) => {
                        setBEmail(event.target.value);
                      }}
                      // onChange={onChangeBemail}
                      value={bEmail}
                      label="Email"
                      variant="outlined"
                    />
                  </Box>
                </div>
                {label !== "Gallery" && (
                  <Box
                    display="flex"
                    justifyContent="center"
                    height={"40px"}
                    width="1100px"
                    sx={{ p: 0 }}
                  >
                    <Typography variant="h6" gutterBottom>
                      {label}
                    </Typography>
                  </Box>
                )}

                {saveType === "gallery" ? (
                  <GalleryManagement
                    galleries={galleries}
                    galleryName={galleryName}
                    setGalleryName={setGalleryName}
                    gallerySlug={gallerySlug}
                    setGallerySlug={setGallerySlug}
                    galleryDescription={galleryDescription}
                    setGalleryDescription={setGalleryDescription}
                    galleryLoading={galleryLoading}
                    setGalleryLoading={setGalleryLoading}
                    loadGalleries={loadGalleries}
                  />
                ) : (
                  editor && (
                    <Box
                      display="flex"
                      justifyContent="center"
                      height={"100%"}
                      width="1100px"
                      sx={{ p: 0 }}
                    >
                      <div className="text-editor">
                        <EditorToolbar />

                        <ReactQuill
                          theme="snow"
                          value={value}
                          onChange={setValue}
                          modules={modules}
                          formats={formats}
                        />
                      </div>
                    </Box>
                  )
                )}
              </div>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};
export default Admin;
