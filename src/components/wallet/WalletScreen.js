import React, { Component } from 'react';

import Toolbar from '../generic/Toolbar';
import CenteredCard from '../generic/CenteredCard';
import CardContent from '../generic/CardContent';
import ToolbarSpacer from '../generic/ToolbarSpacer';

export default class WalletScreen extends Component {
  render() {
    return (
      <div>
        <Toolbar showTabs={true} />
        <ToolbarSpacer/>
        <CenteredCard >
          <CardContent>
            <h1>Alain Vandam</h1>
            <p>Hallo ik ben zomaar wat tekst. Hallo ik ben zomaar wat tekst. Hallo ik ben zomaar wat tekst. Hallo ik ben zomaar wat tekst. Hallo ik ben zomaar wat tekst. Hallo ik ben zomaar wat tekst. </p>
          </CardContent>
        </CenteredCard>
      </div>
    );
  }
}
