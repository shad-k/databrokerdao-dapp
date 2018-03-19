import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { connect } from 'react-redux'
import _ from 'lodash';
import supercluster from 'supercluster';

import DiscoverMapMarker from './DiscoverMapMarker';
import Cluster from './Cluster';
import { STREAMS_ACTIONS } from '../../redux/streams/actions';

const zoomToDistance = {
  1:"300000",
  2:"300000",
  3:"300000",
  4:"300000",
  5:"300000",
  6:"300000",
  7:"300000",
  8:"300000",
  9:"300000",
  10:"300000",
  11:"120000",
  12:"40000",
  13:"20000",
  14:"15000",
  15:"10000"
}

class DiscoverMap extends Component {
  constructor(props){
    super(props);

    this.state = {
      clusteredMarkers:null,
      openedMapMarker:null,
      mapRef:null
    };
  }

  openMapMarker(streamKey){
    if(streamKey === this.state.openedMapMarker)
      this.setState({openedMapMarker:null});
    else
      this.setState({openedMapMarker:streamKey});
  }

  onMapMounted(ref){
    if(!this.state.mapRef && ref){
      this.setState({mapRef:ref});
    }
  }

  zoomChanged(){
    const zoom = this.state.mapRef.getZoom();
    const lat = this.state.mapRef.getCenter().lat();
    const lng = this.state.mapRef.getCenter().lng();
    this.props.fetchStreams(lat,lng,zoomToDistance[zoom]);
  }

  dragEnded(){
    const zoom = this.state.mapRef.getZoom();
    const lat = this.state.mapRef.getCenter().lat();
    const lng = this.state.mapRef.getCenter().lng();
    this.props.fetchStreams(lat,lng,zoomToDistance[zoom]);
  }

  clusterMarkers(streams){
    if(this.props.fetchingStreams || !this.state.mapRef)
      return;

    const clusterIndex = supercluster({
        radius: 150, //Cluster radius in pixels
        maxZoom: 16 //Maximum zoom level at which clusters are generated
    });
    clusterIndex.load(_.values(streams));
    const clusters = clusterIndex.getClusters([-180, -85, 180, 85], this.state.mapRef.getZoom()); //[westLng, southLat, eastLng, northLat], zoom

    const clusteredMarkers = _.map(clusters, cluster => {
      //console.log(cluster);

      if(cluster.properties && cluster.properties.cluster === true){
        return <Cluster
                  key={cluster.properties.cluster_id}
                  position={{ lng: cluster.geometry.coordinates[0], lat: cluster.geometry.coordinates[1] }}
                  label={cluster.properties.point_count}
                />
      }
      else{
        return <DiscoverMapMarker
            key={cluster.key}
            stream={cluster}
            position={{ lng: cluster.geometry.coordinates[0], lat: cluster.geometry.coordinates[1] }}
            openedMapMarker={this.state.openedMapMarker}
            onClick={(streamKey) => this.openMapMarker(streamKey)}
          />;
      }
    });

    return clusteredMarkers;
  }

  render() {
    const clusteredMarkers = this.clusterMarkers(this.props.streams);

    const MapOptions = {
      clickableIcons: false,
      minZoom: 6,
      styles:[ { "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] }, { "elementType": "labels.text.fill", "stylers": [ { "color": "#333333" }, { "saturation": 35 }, { "lightness": 40 } ] }, { "elementType": "labels.text.stroke", "stylers": [ { "color": "#ffffff" }, { "lightness": 15 }, { "visibility": "on" } ] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [ { "color": "#fefefe" }, { "lightness": 20 } ] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [ { "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 } ] }, { "featureType": "administrative.land_parcel", "elementType": "labels", "stylers": [ { "visibility": "off" } ] }, { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [ { "color": "#b3b3b3" } ] }, { "featureType": "administrative.neighborhood", "elementType": "labels.text.fill", "stylers": [ { "color": "#b3b3b3" } ] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [ { "color": "#f5f5f5" }, { "lightness": 20 } ] }, { "featureType": "landscape", "elementType": "labels", "stylers": [ { "color": "#cccccc" }, { "visibility": "on" } ] }, { "featureType": "landscape", "elementType": "labels.text.fill", "stylers": [ { "color": "#b3b3b3" } ] }, { "featureType": "landscape", "elementType": "labels.text.stroke", "stylers": [ { "color": "#ffffff" } ] }, { "featureType": "poi", "elementType": "geometry", "stylers": [ { "color": "#f5f5f5" }, { "lightness": 20 } ] }, { "featureType": "poi", "elementType": "labels", "stylers": [ { "color": "#4c4c4c" }, { "visibility": "off" } ] }, { "featureType": "poi", "elementType": "labels.text", "stylers": [ { "color": "#4c4c4c" }, { "visibility": "on" } ] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [ { "color": "#b3b3b3" } ] }, { "featureType": "poi", "elementType": "labels.text.stroke", "stylers": [ { "color": "#ffffff" } ] }, { "featureType": "poi.business", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [ { "color": "#cfffce" }, { "lightness": 20 } ] }, { "featureType": "road", "elementType": "labels", "stylers": [ { "color": "#999999" }, { "visibility": "on" } ] }, { "featureType": "road", "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] }, { "featureType": "road", "elementType": "labels.text.stroke", "stylers": [ { "color": "#ffffff" } ] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [ { "color": "#ffffff" }, { "lightness": 20 } ] }, { "featureType": "road.arterial", "elementType": "labels", "stylers": [ { "visibility": "on" } ] }, { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [ { "color": "#ffffff" }, { "visibility": "on" } ] }, { "featureType": "road.highway", "elementType": "labels", "stylers": [ { "visibility": "off" } ] }, { "featureType": "road.highway", "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] }, { "featureType": "road.highway", "elementType": "labels.text", "stylers": [ { "visibility": "on" } ] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [ { "color": "#ffffff" } ] }, { "featureType": "road.local", "elementType": "labels", "stylers": [ { "visibility": "off" } ] }, { "featureType": "transit", "elementType": "geometry", "stylers": [ { "color": "#f2f2f2" }, { "lightness": 20 } ] }, { "featureType": "water", "elementType": "geometry", "stylers": [ { "color": "#b6ddff" }, { "lightness": 15 } ] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [ { "color": "#808080" } ] } ]
    };

    return (
      <GoogleMap
       defaultZoom={15}
       defaultCenter={{ lat: 50.879844, lng: 4.700518 }}
       options={MapOptions}
       onZoomChanged={() => this.zoomChanged()}
       onDragEnd={() => this.dragEnded()}
       ref={(ref) => this.onMapMounted(ref)}
      >
        {clusteredMarkers}
      </GoogleMap>
    );
  }
}

const mapStateToProps = state => ({
  streams: state.streams.streams,
  fetchingStreams: state.streams.fetchingStreams
})

function mapDispatchToProps(dispatch) {
  return {
    fetchStreams: (lng,lat,distance) => dispatch(STREAMS_ACTIONS.fetchStreams(null,lng,lat,distance))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withScriptjs(withGoogleMap(DiscoverMap)))
