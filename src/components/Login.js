import React from 'react'
import { history } from '../configureStore'
import LoginMount from './LoginMount'
// const store = configureStore()

function loginClick() {
  let pw = document.getElementById('password').value
  var passhash = CryptoJS.MD5(pw).toString()
  // console.log(pw, passhash);
  let url = `http://peterpaulproductions.com/ajax/login.php?pw=${passhash}`
  fetch(url)
    .then(response => response.json())
    .then(ret => {
      if (ret['calEdit']) {
        ADMIN = true
        CALEDIT = true
        $('#mainMenu').removeClass('hidden')
        history.push('calendar')
      } else if (ret && ret['access'] === 'member') {
        $('#mainMenu').removeClass('hidden')
        history.push('home')
      } else if (ret && ret['access'] === 'admin') {
        $('#mainMenu').removeClass('hidden')
        CALEDIT = true
        ADMIN = true
        history.push('admin')
      } else if (ret && ret['access'] === 'cal') {
        CALONLY = true
        history.push('calendar')
      } else if (ret && ret['access'] === 'uploader') {
        UPLOADER = true
        history.push('uploader')
      }

    })
}

function keyUp() {
  if (event.key === 'Enter') {
    loginClick();
  }
}
function eyeClick() {
  if ($('#password').attr('type') === 'password') {
    $('#password').attr('type', 'text')
  } else {
    $('#password').attr('type', 'password')
  }
}
const Login = () => (

  <div className="container">
    <div className="row">
      <div className="col home-left">

        <p><br /><br /></p>
        <p align="center" className="">Password:</p>
        <p align="center" className=""><input onKeyUp={keyUp} name="password" type="password" id="password"
          size="15" /><span onClick={eyeClick} className="eyeIcon"><svg xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 1024 1024">
            <path fill="currentColor"
              d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 0 0 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3c7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176s176-78.8 176-176s-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112s112 50.1 112 112s-50.1 112-112 112z">
            </path>
          </svg></span></p>
        <p align="center" className=""> <button value="Submit" onClick={loginClick}>SUBMIT</button></p>
        <p>&nbsp;</p>
        <p align="center" className="headlinesub">267 Pacific Coast Hwy</p>
        <p align="center" className="headlinesub">Santa Monica, CA</p>
        <p align="center" className="headlinesub">90402 </p>
        <p align="center" className="headlinesub">310-394-9266</p>
        <p align="center" className="headlinesub"><a target="_blank"
          href="https://maps.google.com/maps?f=q&amp;hl=en&amp;q=267+Pacific+Coast+Hwy,+Santa+Monica,+CA,+90402&amp;zoom=4"
          className="main">Get Driving Directions (Google) </a></p>
        <p align="center" className="headlinesub"><a href="ppbc_directions.doc" target="_blank" className="main">Download
          Directions (doc)</a></p>
        <p align="center" className="main"><a target="_blank" href="images/pcbmap.pdf">View Map</a> </p>
      </div>
      <div className="col home-right">
        <p><br /><br /></p>
        <img id="homeHouseBottom" name="" src="http://tonypweb.com/ppbc/images/homePic.jpg" alt="" />
      </div>
    </div>
    <LoginMount />
  </div>
)

export default Login
