import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"

import DiscoverMapMarker from './DiscoverMapMarker';

export default withScriptjs(withGoogleMap(class DiscoverMap extends Component {
  render() {
    return (
      <GoogleMap
       defaultZoom={13}
       defaultCenter={{ lat: 50.889844, lng: 4.700518 }}
      >
        <DiscoverMapMarker position={{ lat: 50.878451, lng: 4.699932 }}/>
        <DiscoverMapMarker position={{ lat: 50.832421, lng: 4.699032 }}/>
      </GoogleMap>
    );
  }
}))
