import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { CardTitle, CardText } from 'react-md/lib/Cards';

import Toolbar from '../generic/Toolbar.js';
import ContentCard from '../generic/ContentCard';

export default class AddSensorScreen extends Component {
  render() {
    return (
      <div>
        <Toolbar showTabs={true} />
        <ContentCard >
          <CardTitle title='Add your sensor' />

        </ContentCard>
      </div>
    );
  }
}
