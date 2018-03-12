import React, { Component } from 'react';
import Mixpanel from 'mixpanel-browser';

import Toolbar from '../generic/Toolbar';
import LandingContent from './LandingContent';
import LandingBackground from './LandingBackground';

export default class LandingScreen extends Component {
  componentDidMount() {
    Mixpanel.track("View landing screen");
  }

  render() {
    return (
      <div>
        <Toolbar showTabs={false} />
        <LandingContent />
        <LandingBackground/>
      </div>
    );
  }
}
