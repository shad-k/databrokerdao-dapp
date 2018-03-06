import React, { Component } from 'react';

import Toolbar from '../generic/Toolbar';
import LandingContent from './LandingContent';
import LandingBackground from './LandingBackground';

export default class LandingScreen extends Component {
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
