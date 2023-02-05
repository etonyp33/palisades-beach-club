import React from 'react';
import $ from 'jquery';

export default class LoginMount extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $('#mainMenu').addClass('hidden')

  }
  render() {
    return (
      <div></div>
    );
  }
}