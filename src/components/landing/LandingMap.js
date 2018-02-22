import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, OverlayView } from "react-google-maps"

import LandingMapMarker from './LandingMapMarker';

export default withScriptjs(withGoogleMap(class LandingMap extends Component {
  render() {
    return (
      <div>
        <GoogleMap
         defaultZoom={12}
         defaultCenter={{ lat: 50.879844, lng: 4.700518 }}
        >
          <LandingMapMarker position={{ lat: 50.861844, lng: 4.701518 }}/>
        </GoogleMap>
      </div>
    );
  }
}))
