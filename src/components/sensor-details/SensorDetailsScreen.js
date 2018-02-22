import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { CardTitle, CardText } from 'react-md/lib/Cards';

import Toolbar from '../generic/Toolbar';
import ContentCard from '../generic/ContentCard';

export default class SensorDetailsScreen extends Component {
  render() {
    return (
      <div>
        <Toolbar showTabs={true} />
        <ContentCard >
          <CardTitle title='Details of this sensor' />
          <CardText>
            <p>Hallo ik ben zomaar een beetje gewone tekst. Hallo ik ben zomaar wat tekst. Hallo ik ben zomaar wat tekst. Hallo ik ben zomaar wat tekst. Hallo ik ben zomaar wat tekst. Hallo ik ben zomaar wat tekst. </p>
          </CardText>
        </ContentCard>
      </div>
    );
  }
}
