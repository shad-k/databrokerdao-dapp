import React, { Component } from 'react';

import Toolbar from '../generic/Toolbar.js';
import CenteredCard from '../generic/CenteredCard';
import CardContent from '../generic/CardContent';
import ToolbarSpacer from '../generic/ToolbarSpacer';
import EnlistForm from './EnlistForm';

export default class AddStreamScreen extends Component {
  render() {
    return (
      <div>
        <Toolbar showTabs={true} />
        <ToolbarSpacer/>
        <CenteredCard>
          <CardContent>
            <h1>Enlist your stream</h1>
            <p>Earn money by selling access to the data of your stream via DataBroker DAO.</p>
            <EnlistForm/>
          </CardContent>
        </CenteredCard>
      </div>
    );
  }
}
