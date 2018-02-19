import React, { Component } from 'react';
import { push } from 'react-router-redux';

import Toolbar from '../generic/Toolbar.js';

export default class LandingScreen extends Component {
  render() {
    return (
      <div>
        <Toolbar showTabs={true} />
        <h2>Buy and sell data!</h2>
        <div>Map</div>
        <div>Paper</div>
      </div>
    );
  }
}
