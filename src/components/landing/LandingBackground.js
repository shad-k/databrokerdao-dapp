import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

export default withScriptjs(withGoogleMap(class LandingBackground extends Component {
  render() {
    const StyledBackgroundDiv = styled.div`
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -10;
      background-color: rgb(100,180,190);
    `;

    return (
      <StyledBackgroundDiv>
        <GoogleMap
         defaultZoom={8}
         defaultCenter={{ lat: -34.397, lng: 150.644 }}
        >
         {this.props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
        </GoogleMap>
      </StyledBackgroundDiv>
    );
  }
}))
