import React from 'react';
import $ from 'jquery';

export default class CalendarData extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!CALONLY) $('#mainMenu').removeClass('hidden')
    let url = `http://tonypweb.com/pbc/ajax/events.php?getAll=1`
    fetch(url)
      .then(response => response.json())
      .then(data => {
        window.doCal(data)
        // if (data && data['rows'] && data['rows'][0] && data['rows'][0]['content']) {
        //   $('#newsData').html(atob(data['rows'][0]['content']))
        // }
      })
      .catch(console.error);
  }

  render() {
    return (
      <div id="calendarElem"></div>
    );
  }
}