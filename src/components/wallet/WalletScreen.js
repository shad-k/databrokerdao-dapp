import React, { Component } from 'react';
import { push } from 'react-router-redux';

import Toolbar from '../generic/Toolbar.js';

export default class WalletScreen extends Component {
  render() {
    return (
      <div>
        <Toolbar showTabs={true} />
        <h2>Welcome to your wallet e kerel allee jom</h2>
      </div>
    );
  }
}
