import React from 'react';
import $ from 'jquery';

export default class RulesData extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $('#mainMenu').removeClass('hidden')
    let url = `http://tonypweb.com/pbc/ajax/rules.php`
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data && data['rows'] && data['rows'][0] && data['rows'][0]['content']) {
          $('#rulesData').html(atob(data['rows'][0]['content']))
        }
      })
      .catch(console.error);
  }
  render() {
    return (
      <div id="rulesData"></div>
    );
  }
}