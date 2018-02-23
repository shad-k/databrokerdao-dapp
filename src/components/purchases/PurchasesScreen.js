import React, { Component } from 'react';

import Toolbar from '../generic/Toolbar';
import CenteredCard from '../generic/CenteredCard';
import CardContent from '../generic/CardContent';
import ToolbarSpacer from '../generic/ToolbarSpacer';

export default class PurchasesScreen extends Component {
  render() {
    return (
      <div>
        <Toolbar showTabs={true} />
        <ToolbarSpacer/>
        <CenteredCard >
          <CardContent>
            <h1>Purchased sensor data</h1>
            Hallo ik ben zomaar wat tekst. Hallo ik ben zomaar wat tekst. Hallo ik ben zomaar wat tekst. Hallo ik ben zomaar wat tekst. Hallo ik ben zomaar wat tekst. Hallo ik ben zomaar wat tekst.
          </CardContent>
        </CenteredCard>
      </div>
    );
  }
}
