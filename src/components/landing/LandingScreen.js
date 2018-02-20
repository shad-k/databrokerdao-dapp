import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import Toolbar from '../generic/Toolbar';
import LandingContent from './LandingContent';
import LandingBackground from './LandingBackground';

export default class LandingScreen extends Component {
  render() {
    const LandingContentWithRouter = withRouter(LandingContent);

    return (
      <div>
        <Toolbar showTabs={false} />
        <LandingContentWithRouter />
        <LandingBackground/>
      </div>
    );
  }
}
