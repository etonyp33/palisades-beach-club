import React from 'react';
import $ from 'jquery';

export default class RosterMount extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $('#mainMenu').removeClass('hidden')

  }
  render() {
    return (
      <div></div>
    );
  }
}