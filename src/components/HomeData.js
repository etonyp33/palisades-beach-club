import React, { useState } from "react";
import { uploadFile } from "react-s3";

const S3_BUCKET = "aws-main";
const REGION = "YOUR_REGION_NAME";
const ACCESS_KEY = "YOUR_ACCESS_KEY";
const SECRET_ACCESS_KEY = "YOUR_SECRET_ACCESS_KEY";

const config = {
  bucketName: S3_BUCKET,
  region: REGION,
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
};

const UploadFile = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (file) => {
    uploadFile(file, config)
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div>React S3 File Upload</div>
      <input type="file" onChange={handleFileInput} />
      <button onClick={() => handleUpload(selectedFile)}> Upload to S3</button>
    </div>
  );
};

export default UploadFile;

/*
import React from 'react';
import $ from 'jquery';

export default class HomeData extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $('#mainMenu').removeClass('hidden')
    let url = `http://tonypweb.com/pbc/ajax/home.php`
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data && data['rows'] && data['rows'][0] && data['rows'][0]['content']) {
          $('#homeData').html(atob(data['rows'][0]['content']))
        }
      })
      .catch(console.error);
  }
  render() {
    return (
      <div id="homeData"></div>
    );
  }
}
*/
