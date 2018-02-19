import React, { Component } from 'react';
import { push } from 'react-router-redux';

import Toolbar from '../generic/Toolbar.js';

export default class AddSensorScreen extends Component {
  render() {
    return (
      <div>
        <Toolbar showTabs={true} />
        <h2>Welcome to add sensor e seg wees welgekomen</h2>
      </div>
    );
  }
}
