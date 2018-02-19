import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { CardTitle, CardText } from 'react-md/lib/Cards';

import Toolbar from '../generic/Toolbar';
import ContentCard from '../generic/ContentCard';

export default class PurchasesScreen extends Component {
  render() {
    return (
      <div>
        <Toolbar showTabs={true} />
        <ContentCard >
          <CardTitle title='Purchased sensor data' />
          <CardText>
            <p>Hallo ik ben zomaar wat tekst. Hallo ik ben zomaar wat tekst. Hallo ik ben zomaar wat tekst. Hallo ik ben zomaar wat tekst. Hallo ik ben zomaar wat tekst. Hallo ik ben zomaar wat tekst. </p>
          </CardText>
        </ContentCard>
      </div>
    );
  }
}
