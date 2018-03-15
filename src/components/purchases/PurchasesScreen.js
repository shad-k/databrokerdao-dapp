import React, { Component } from 'react';

import Toolbar from '../generic/Toolbar';
import CenteredCard from '../generic/CenteredCard';
import CardContent from '../generic/CardContent';
import ToolbarSpacer from '../generic/ToolbarSpacer';
import PurchasesTable from './PurchasesTable';

export default class PurchasesScreen extends Component {
  render() {
    return (
      <div>
        <Toolbar showTabs={true} />
        <ToolbarSpacer/>
        <CenteredCard >
          <CardContent>
            <h1>Purchased streams</h1>
            <PurchasesTable />
          </CardContent>
        </CenteredCard>
      </div>
    );
  }
}
