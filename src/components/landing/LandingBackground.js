import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import LandingMap from './LandingMap';

export default class LandingBackground extends Component {
  render() {
    const mapElementsStyle = {
      height: `100%`,
      width:"100%",
      position:"absolute",
      top:"0",
      left: "0"
    };

    return (
      <div>
        <LandingMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={mapElementsStyle} />}
          containerElement={<div style={{zIndex:"-1", ...mapElementsStyle}} />}
          mapElement={<div style={mapElementsStyle} />}
          />
      </div>
    );
  }
}
