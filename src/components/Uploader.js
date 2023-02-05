import React, { useEffect } from "react";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";

function Uploader(props) {
  var curGallery;
  var defGallery;
  useEffect(() => {
    let url = `http://tonypweb.com/pbc/ajax/gallery_data.php?rq=init`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        let enc,
          gallery,
          options = '<option value="">Select Gallery</option>',
          def;
        for (let i in data) {
          if (i === "gallery") {
            defGallery = data[i][0]["content"];
          } else {
            enc = encodeURIComponent(data[i]);
            // gallery = data[i].replace(/_/g, " ")
            gallery = data[i].replace(/_EQ_/g, "=");
            gallery = atob(gallery);
            gallery = decodeURIComponent(gallery);
            options += `<option value="${data[i]}">${gallery}</option>`;
          }
        }
        $("#galleriesDropdown").html(options);
      });
  });
  const galSelect = (props) => {
    const gallery = $(props.currentTarget).val();
    curGallery = gallery;
    if (defGallery === gallery) {
      $("#defaultGalleryCb").prop("checked", true);
    } else {
      $("#defaultGalleryCb").prop("checked", false);
    }
    let url = `http://tonypweb.com/pbc/ajax/gallery_data.php?rq=gallery&gallery=${gallery}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        let enc = encodeURIComponent(gallery),
          imgs = "",
          imgEnc;
        for (let i in data) {
          imgEnc = encodeURIComponent(btoa(data[i]));
          imgs += galImage(data[i], enc, imgEnc);
        }
        $("#galleryWrapper").html(imgs);
        $("#dropZone").removeClass("hidden");
      });
  };
  const galImage = (img, enc, imgEnc) => {
    const ran = randomStr(5);
    return `<span id="galImage${imgEnc}${ran}" "class="galImageWrapper"><img width="75" src="http://peterpaulproductions.com/gallery/${enc}/${img}" /><span class="delicon" ran="${ran}" img="${imgEnc}"><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M14.12 10.47L12 12.59l-2.13-2.12l-1.41 1.41L10.59 14l-2.12 2.12l1.41 1.41L12 15.41l2.12 2.12l1.41-1.41L13.41 14l2.12-2.12l-1.41-1.41M15.5 4l-1-1h-5l-1 1H5v2h14V4h-3.5M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12M8 9h8v10H8V9Z"/></svg></span></span>`;
  };
  //new_gallery

  const newGallery = () => {
    let gallery = $("#galName").val();
    gallery = encodeURIComponent(gallery);
    gallery = btoa(gallery);
    gallery = gallery.replace(/=/g, "_EQ_");
    let url =
      `http://tonypweb.com/pbc/ajax/gallery_data.php?rq=new_gallery&gallery=` +
      gallery;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data && data["success"] && data["success"] === "true") {
          location.reload();
        } else {
          alert("Error");
        }
      });
  };

  const imgClick = (props) => {
    let targ = false;
    if ($(props.target).hasClass("delicon")) {
      targ = $(props.target);
    } else if ($(props.target).parents(".delicon").length) {
      targ = $(props.target).parents(".delicon");
    }
    const ran = $(targ).attr("ran");
    if (targ && confirm("Delete Image?")) {
      const img = targ.attr("img");
      let url = `http://tonypweb.com/pbc/ajax/gallery_data.php?rq=delete_image&gallery=${curGallery}&img=${img}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data && data["success"] && data["success"] === "true") {
            try {
              $("#galImage" + img + ran).remove();
            } catch (error) {
              console.log(error);
            }
          }
        });
    }
  };

  const galDelete = (props) => {
    if (confirm("Delete Gallery?")) {
      let url = `http://tonypweb.com/pbc/ajax/gallery_data.php?rq=delete_gallery&gallery=${curGallery}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          location.reload();
        });
    }
  };

  const defaultGalleryClick = (props) => {
    const chk = $(props.currentTarget).prop("checked");
    if (!chk) {
      $(props.currentTarget).prop("checked", true);
      return false;
    }

    var data = {
      pg: "gallery",
      content: curGallery,
    };
    //    console.log(pg)
    //    return
    //    tinyMCE.triggerSave()
    //    var data = $('#admin-form-'+pg).serialize()
    $.ajax({
      url: "processAdmin.php",
      data: data,
      method: "post",
    }).done(function (res) {
      res = res.trim();
      defGallery = curGallery;
      // console.log(res)
    });
  };

  // specify upload params and url for your files
  const getUploadParams = ({ meta }) => {
    return {
      url: "ajax/upload.php?gallery=" + curGallery,
    };
  };

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => {
    // console.log(status, meta, file)
  };

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    // console.log(files.map(f => f.meta))
    let imgEnc,
      imgs = "";
    // gallery = curGallery.replace(/_EQ_/g, "=")
    // gallery = atob(gallery)
    for (let i in files) {
      imgEnc = encodeURIComponent(btoa(files[i].file.name));
      imgs += galImage(files[i].file.name, curGallery, imgEnc);
    }
    $("#galleryWrapper").append(imgs);
    allFiles.forEach((f) => f.remove());
  };

  function randomStr(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  return (
    <div>
      <div id="galleryWrapper-outer">
        <h3>Galleries</h3>
        <select
          className="form-control form-select"
          onChange={galSelect}
          id="galleriesDropdown"
        ></select>
        <div id="galleryWrapper" onClick={imgClick}></div>
      </div>

      <div id="dropZone" className="hidden">
        <Dropzone
          getUploadParams={getUploadParams}
          onChangeStatus={handleChangeStatus}
          onSubmit={handleSubmit}
          accept="image/*"
          // accept="image/*,audio/*,video/*"
        />
        <div className="defaultCheckboxWrapper">
          <span>Default Gallery </span>
          <span>
            <input
              onChange={defaultGalleryClick}
              id="defaultGalleryCb"
              type={"checkbox"}
            />
          </span>
        </div>
        <div className="galDelete text-danger cursor-pointer">
          <span onClick={galDelete}>DELETE GALLERY</span>
        </div>
      </div>
      <hr></hr>
      <div className="newGalWrapper">
        <span>New Gallery: </span>
        <span>
          <input id="galName" />
        </span>
        <span>
          <button className="btn" onClick={newGallery} id="newGalGo">
            Go
          </button>
        </span>
      </div>
    </div>
  );
}

export default Uploader;
