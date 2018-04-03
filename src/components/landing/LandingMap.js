import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import _ from 'lodash';
import { connect } from 'react-redux';
import supercluster from 'supercluster';

import LandingMapMarker from './LandingMapMarker';
import { STREAMS_ACTIONS } from '../../redux/streams/actions';
import Cluster from '../generic/Cluster';

class LandingMap extends Component {
  componentDidMount() {
    this.props.fetchLandingStreams();
  }

  constructor(props){
    super(props);

    this.state = {
      mapRef:null
    };
  }

  onMapMounted(ref){
    if(!this.state.mapRef && ref){
      this.setState({mapRef:ref});
    }
  }

  clusterMarkers(streams){
    if(this.props.fetchingStreams || !this.state.mapRef)
      return;

    const clusterIndex = supercluster({
        radius: 160, //Cluster radius in pixels
        maxZoom: 16 //Maximum zoom level at which clusters are generated
    });
    clusterIndex.load(_.values(streams));
    const clusters = clusterIndex.getClusters([-180, -85, 180, 85], this.state.mapRef.getZoom()); //[westLng, southLat, eastLng, northLat], zoom

    //Sort on lat to prevent (some) z-index issues
    const sortedClusters = _.sortBy(clusters, cluster => { return (cluster.properties && cluster.properties.cluster === true)? -cluster.geometry.coordinates[0]*2:-cluster.geometry.coordinates[0]; });

    const clusteredMarkers = _.map(sortedClusters, cluster => {
      if(cluster.properties && cluster.properties.cluster === true){
        return <Cluster
                  key={cluster.properties.cluster_id}
                  position={{ lng: cluster.geometry.coordinates[1], lat: cluster.geometry.coordinates[0] }}
                  label={cluster.properties.point_count}
                />
      }
      else{
        return <LandingMapMarker
            key={cluster.key}
            stream={cluster}
            position={{ lng: cluster.geometry.coordinates[1], lat: cluster.geometry.coordinates[0] }}
          />;
      }
    });

    return clusteredMarkers;
  }

  render() {
    const clusteredMarkers = this.clusterMarkers(this.props.streams);

    const MapOptions = {
      clickableIcons: false,
      styles:[ { "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] }, { "elementType": "labels.text.fill", "stylers": [ { "color": "#333333" }, { "saturation": 35 }, { "lightness": 40 } ] }, { "elementType": "labels.text.stroke", "stylers": [ { "color": "#ffffff" }, { "lightness": 15 }, { "visibility": "on" } ] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [ { "color": "#fefefe" }, { "lightness": 20 } ] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [ { "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 } ] }, { "featureType": "administrative.land_parcel", "elementType": "labels", "stylers": [ { "visibility": "off" } ] }, { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [ { "color": "#b3b3b3" } ] }, { "featureType": "administrative.neighborhood", "elementType": "labels.text.fill", "stylers": [ { "color": "#b3b3b3" } ] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [ { "color": "#f5f5f5" }, { "lightness": 20 } ] }, { "featureType": "landscape", "elementType": "labels", "stylers": [ { "color": "#cccccc" }, { "visibility": "on" } ] }, { "featureType": "landscape", "elementType": "labels.text.fill", "stylers": [ { "color": "#b3b3b3" } ] }, { "featureType": "landscape", "elementType": "labels.text.stroke", "stylers": [ { "color": "#ffffff" } ] }, { "featureType": "poi", "elementType": "geometry", "stylers": [ { "color": "#f5f5f5" }, { "lightness": 20 } ] }, { "featureType": "poi", "elementType": "labels", "stylers": [ { "color": "#4c4c4c" }, { "visibility": "off" } ] }, { "featureType": "poi", "elementType": "labels.text", "stylers": [ { "color": "#4c4c4c" }, { "visibility": "on" } ] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [ { "color": "#b3b3b3" } ] }, { "featureType": "poi", "elementType": "labels.text.stroke", "stylers": [ { "color": "#ffffff" } ] }, { "featureType": "poi.business", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [ { "color": "#cfffce" }, { "lightness": 20 } ] }, { "featureType": "road", "elementType": "labels", "stylers": [ { "color": "#999999" }, { "visibility": "on" } ] }, { "featureType": "road", "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] }, { "featureType": "road", "elementType": "labels.text.stroke", "stylers": [ { "color": "#ffffff" } ] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [ { "color": "#ffffff" }, { "lightness": 20 } ] }, { "featureType": "road.arterial", "elementType": "labels", "stylers": [ { "visibility": "on" } ] }, { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [ { "color": "#ffffff" }, { "visibility": "on" } ] }, { "featureType": "road.highway", "elementType": "labels", "stylers": [ { "visibility": "off" } ] }, { "featureType": "road.highway", "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] }, { "featureType": "road.highway", "elementType": "labels.text", "stylers": [ { "visibility": "on" } ] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [ { "color": "#ffffff" } ] }, { "featureType": "road.local", "elementType": "labels", "stylers": [ { "visibility": "off" } ] }, { "featureType": "transit", "elementType": "geometry", "stylers": [ { "color": "#f2f2f2" }, { "lightness": 20 } ] }, { "featureType": "water", "elementType": "geometry", "stylers": [ { "color": "#b6ddff" }, { "lightness": 15 } ] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [ { "color": "#808080" } ] } ]
    };

    return (
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: 50.889244, lng: 4.700518 }}
        options={MapOptions}
        ref={(ref) => this.onMapMounted(ref)}
      >
        {clusteredMarkers}
      </GoogleMap>
    );
  }
}

const mapStateToProps = state => ({
  streams: state.streams.landingStreams
})

function mapDispatchToProps(dispatch) {
  return {
    fetchLandingStreams: () => dispatch(STREAMS_ACTIONS.fetchLandingStreams())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withScriptjs(withGoogleMap(LandingMap)))
