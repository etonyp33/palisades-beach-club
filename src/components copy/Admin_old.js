import React, { useState, useEffect, useContext } from "react";
import Parse from "../../src/parse";
import { Box, Container, Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/router";
import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { getData, getBoard } from "./data";
import { Pages_data } from "../context/context";
import { getNavBar } from "./NavBarComponent";
import "react-quill/dist/quill.snow.css";
// import Link from "next/link";
import EditorToolbar, { modules, formats } from "./EditorToolbar";

const ReactQuill = typeof window === "object" ? require("react-quill") : () => false;
const pgName = "home";

const encodeBase64 = (data) => {
  return Buffer.from(data).toString("base64");
};
export default function Admin(reload) {
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

  const handleClick = (e) => {
    try {
      let type = e.target.textContent;
      if (type === label) return;
      setLabel(e.target.textContent);
      type = type.toLowerCase();
      setSaveType(type);
      const obj = getData(pages, type);
      // console.log(obj["content"]);
      setValue(obj["content"]);
      if (type === "home") {
        setQuillClass("q-home");
        setBoardEdit("");
      } else {
        setQuillClass("q-" + type);
        setBoardEdit("board-hidden");
      }
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    // if(typeof(pages) === 'undefined') router.push('./')
    try {
      // setEditor(<ReactQuill theme="snow" value={value} onChange={setValue} />);
      // setBoardEdit(board);
      // console.log(pages);
      const navBar = getNavBar(pages);
      setNavMenu(navBar);
      setLabel("Home");
      const obj = getData(pages, "home");
      setValue(obj["content"]);
      const bObj = getBoard(pages);
      setBName(bObj.name);
      setBEmail(bObj.email);
      // setData(dataObj["content"]);
      const ReactQuill = typeof window === "object" ? require("react-quill") : () => false;
      console.log(value);
      setEditor(true);
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
      case "rules":
        id = process.env.NEXT_PUBLIC_RULES_ID;
        break;
      case "reservations":
        id = process.env.NEXT_PUBLIC_RESERVATIONS_ID;
        break;
    }
    return id;
  }
  function runSave() {
    const save = async () => {
      let result;
      const page = new Parse.Object("Page");
      // const pgId = getPageId(pages, saveType);
      const pgId = pageId(saveType);
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
          page.set("content", encodeBase64(b.Email));
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
    <Container>
      <Box display="flex" justifyContent="center" sx={{ p: 0 }}>
        {navMenu}
      </Box>
      <Box display="flex" justifyContent="center" height={"100%"} width="100%" sx={{ p: 0 }}>
        <div id="mainMenuWrapper" className="hidden">
          <Box display="flex" justifyContent="center" sx={{ p: 2 }}>
            <div className="admin-link" onClick={handleClick} name="Home" id="Home">
              <Typography variant="h6" gutterBottom>
                Home
              </Typography>
            </div>

            <div className="admin-link" onClick={handleClick} name="News" id="News">
              <Typography variant="h6" gutterBottom>
                News
              </Typography>
            </div>

            <div className="admin-link" onClick={handleClick} name="Reservations" id="Reservations">
              <Typography variant="h6" gutterBottom>
                Reservations
              </Typography>
            </div>

            <div className="admin-link" onClick={handleClick} name="Rules" id="Rules">
              <Typography variant="h6" gutterBottom>
                Rules
              </Typography>
            </div>


            <IconButton sx={{ ml: 5 }} aria-label="save" onClick={runSave}>
              <SaveIcon />
            </IconButton>
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
                  setBName(event.target.value);
                }}
                // onChange={onChangeBemail}
                value={bEmail}
                label="Email"
                variant="outlined"
              />
            </Box>
          </div>
          <Box display="flex" justifyContent="center" height={"40px"} width="1100px" sx={{ p: 0 }}>
            <Typography variant="h6" gutterBottom>
              {label}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center" height={"100%"} width="1100px" sx={{ p: 0 }}>
            {/* <ReactQuill
              modules={modules}
              theme="snow"
              value={value}
              onChange={setValue}
              className={quillClass}
            /> */}

            <div className="text-editor">
              {typeof( <ReactQuill />) === 'undefined' ? (
                ""
              ) : (
                <>
                  <EditorToolbar />
                  <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={setValue}
                    modules={modules}
                    formats={formats}
                  />
                </>
              )}
              {/* <EditorToolbar />
              <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
                modules={modules}
                formats={formats}
              /> */}
            </div>
          </Box>
        </div>
      </Box>
    </Container>
  );
}
