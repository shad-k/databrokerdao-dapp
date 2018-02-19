import React, { Component } from 'react';
import { push } from 'react-router-redux';

import Toolbar from '../generic/Toolbar.js';

export default class PurchasesScreen extends Component {
  render() {
    return (
      <div>
        <Toolbar showTabs={true} />
        <h2>Welcome to purchases e seg</h2>
      </div>
    );
  }
}
