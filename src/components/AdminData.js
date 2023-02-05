import React from 'react';
import $ from 'jquery';

export default class AdminData extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $('#mainMenu').removeClass('hidden')
    // let url = `http://tonypweb.com/pbc/ajax/home.php`
    // fetch(url)
    //   .then(response => response.json())
    //   .then(data => {
    //     if (data && data['rows'] && data['rows'][0] && data['rows'][0]['content']) {
    //       $('#homeData').html(atob(data['rows'][0]['content']))
    //     }
    //   })
    //   .catch(console.error);
  }
  render() {
    return (
      <div id="adminData">
        <div id="admin-upload_roster" className="admin-pg-wrapper hidden">
          <h2>Upload Roster</h2>
          <form action="processAdmin.php" method="post" enctype="multipart/form-data">
            <input type="file" name="file" size="50" accept=".pdf" />
            <br />
            <input type="submit" value="Upload" />
            <br />
            <input type="hidden" name="uptype" value="roster" />
          </form>
        </div>
        <div id="admin-upload_newsletter" className="admin-pg-wrapper hidden">
          <h2>Upload Newsletter</h2>
          <form action="processAdmin.php" method="post" enctype="multipart/form-data">
            <input type="file" name="file" size="50" accept=".pdf" />
            <br />
            <input type="submit" value="Upload" />
            <br />
            <input type="hidden" name="uptype" value="newsletter" />
          </form>
        </div>
        <div id="admin-home" className="admin-pg-wrapper hidden">
          <h2>Home <button onClick={() => adminSave('home')}>SAVE</button></h2>
          <form id="admin-form-home">
            <input type="hidden" name="formpg" value="home" />
            <div id="admin-home-text">
              <div id="admin-home-text"></div>
            </div>
          </form>
        </div>
        <div id="admin-news" className="admin-pg-wrapper hidden">
          <h2>News <button onClick={() => adminSave('news')}>SAVE</button></h2>
          <form id="admin-form-news">
            <input type="hidden" name="formpg" value="news" />
            <div id="admin-news-text"></div>
          </form>
        </div>
        <div id="admin-reservations" className="admin-pg-wrapper hidden">
          <h2>Reservations <button onClick={() => adminSave('reservations')}>SAVE</button>
          </h2>
          <form id="admin-form-reservations">
            <input type="hidden" name="formpg" value="reservations" />
            <div id="admin-reservations-text"></div>
          </form>
        </div>
        <div id="admin-rules" className="admin-pg-wrapper hidden">
          <h2>Rules <button onClick={() => adminSave('rules')}>SAVE</button></h2>
          <form id="admin-form-rules">
            <input type="hidden" name="formpg" value="rules" />
            <div id="admin-rules-text"></div>
          </form>
        </div>


      </div>
    );
  }
}


function tiny(id) {
  tinymce.init({
    selector: '#' + id,
    width: 1200,
    height: 700,
    // plugins: [
    //     'advlist autolink lists link image charmap print preview anchor',
    //     'searchreplace visualblocks code fullscreen',
    //     'insertdatetime media table contextmenu paste code'
    // ],
    toolbar: 'insertfile undo redo | styleselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
    content_css: [
      // '//fast.fonts.net/cssapi/e6dc9b99-64fe-4292-ad98-6974f93cd2a2.css',
      // '//www.tinymce.com/css/codepen.min.css'
    ]
  })
}

adminSave = (pg) => {
  var tinycontent = tinyMCE.activeEditor.getContent()
  console.log(tinycontent)
  var content = encodeURIComponent(tinycontent)
  var data = {
    pg: pg,
    content: content
  }
  //    console.log(pg)
  //    return
  //    tinyMCE.triggerSave()
  //    var data = $('#admin-form-'+pg).serialize()
  $.ajax({
    url: "processAdmin.php",
    data: data,
    method: 'post'
  }).done(function (res) {
    res = res.trim()
    if (res === 1 || res === '1') {
      location.reload()
    } else {
      alert('Error!')
    }
    //        console.log(data)
    //        $(this).addClass("done")
  })
}
