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
        <LandingBackground
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%`, width:"100%", position:"absolute", top:"0", left: "0", backgroundColor:"yellow"}} />}
          containerElement={<div style={{ zIndex:"-1", height: `100%`, width:"100%", position:"absolute", top:"0", left: "0" }} />}
          mapElement={<div style={{ height: `100%`, width:"100%", position:"absolute", top:"0", left: "0", backgroundColor:"green" }} />}
          />
      </div>
    );
  }
}
