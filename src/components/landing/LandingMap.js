import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, OverlayView } from "react-google-maps"

import LandingMapMarker from './LandingMapMarker';

export default withScriptjs(withGoogleMap(class LandingMap extends Component {
  render() {
    return (
      <GoogleMap
       defaultZoom={13}
       defaultCenter={{ lat: 50.889844, lng: 4.700518 }}
      >
        <LandingMapMarker position={{ lat: 50.878421, lng: 4.699932 }}/>
      </GoogleMap>
    );
  }
}))
