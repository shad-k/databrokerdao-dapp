import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import LandingGoogleMap from './LandingGoogleMap';

export default class LandingBackground extends Component {
  render() {
    const StyledBackgroundDiv = styled.div`
      // width: 100%;
      // height: 100%;
      // position: absolute;
      // top: 0;
      // left: 0;
      // z-index: -10;
      // background-color: rgb(100,180,190);
    `;

    return (
      <StyledBackgroundDiv>
        <LandingGoogleMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%`, width:"100%", position:"absolute", top:"0", left: "0", backgroundColor:"yellow"}} />}
          containerElement={<div style={{ zIndex:"-1", height: `100%`, width:"100%", position:"absolute", top:"0", left: "0" }} />}
          mapElement={<div style={{ height: `100%`, width:"100%", position:"absolute", top:"0", left: "0", backgroundColor:"green" }} />}
          />
      </StyledBackgroundDiv>
    );
  }
}
