import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

export default withScriptjs(withGoogleMap(class LandingGoogleMap extends Component {
  render() {
    return (
      <div>
        <GoogleMap
         defaultZoom={8}
         defaultCenter={{ lat: -34.397, lng: 150.644 }}
        >
         {this.props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
        </GoogleMap>
      </div>
    );
  }
}))
