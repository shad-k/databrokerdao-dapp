import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"
import { connect } from 'react-redux'
import _ from 'lodash';

import DiscoverMapMarker from './DiscoverMapMarker';

class DiscoverMap extends Component {
  renderMapMarkers(streams){
    if(this.props.fetchingStreams)
      return;

    return _.map(streams, stream => {
      return <DiscoverMapMarker key={stream.id} stream={stream} position={{ lat: stream.geo.lat, lng: stream.geo.lng }}/>;
    });
  }

  render() {
    return (
      <GoogleMap
       defaultZoom={13}
       defaultCenter={{ lat: 50.889844, lng: 4.700518 }}
      >
        {this.renderMapMarkers(this.props.streams)}
      </GoogleMap>
    );
  }
}

const mapStateToProps = state => ({
  streams: state.streams.streams,
  fetchingStreams: state.streams.fetchingStreams
})

export default connect(mapStateToProps, null)(withScriptjs(withGoogleMap(DiscoverMap)))
