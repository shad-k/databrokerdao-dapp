import React, { Component } from 'react';

import Toolbar from '../generic/Toolbar.js';
import CenteredCard from '../generic/CenteredCard';
import CardContent from '../generic/CardContent';
import ToolbarSpacer from '../generic/ToolbarSpacer';
import AddStreamForm from './AddStreamForm';

export default class AddStreamScreen extends Component {
  render() {
    return (
      <div>
        <Toolbar showTabs={true} />
        <ToolbarSpacer/>
        <CenteredCard>
          <CardContent>
            <h1>Sell your stream data</h1>
            <p>Some great random text about how selling the data from your stream works. Very cool.</p>
            <AddStreamForm/>
          </CardContent>
        </CenteredCard>
      </div>
    );
  }
}
