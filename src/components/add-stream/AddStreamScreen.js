import React, { Component } from 'react';

import Toolbar from '../generic/Toolbar.js';
import CenteredCard from '../generic/CenteredCard';
import CardContent from '../generic/CardContent';
import ToolbarSpacer from '../generic/ToolbarSpacer';

export default class AddStreamScreen extends Component {
  render() {
    return (
      <div>
        <Toolbar showTabs={true} />
        <ToolbarSpacer/>
        <CenteredCard>
          <CardContent>
            <h1>Sell your stream data</h1>
            <p>Soon you will be able to sell your stream data on DataBroker DAO.</p>
          </CardContent>
        </CenteredCard>
      </div>
    );
  }
}
