import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux'

import Toolbar from '../generic/Toolbar';
import Filter from './Filter';
import DiscoverMap from './DiscoverMap';
import DiscoverStreamsList from './DiscoverStreamsList';
import { STREAMS_ACTIONS } from '../../redux/streams/actions';

class DiscoverScreen extends Component {
  componentDidMount() {
    //Get streams from API
    this.props.fetchStreams();
  }

  render() {
    const StyledSidebar = styled.div`
      flex: initial;
      width: 300px;
      background-color:white;
      padding-top:60px;
      overflow-y: auto;
    `;

    const StyledContent = styled.div`
      flex: 1;
    `;

    const mapElementsStyle = {
      height: `100%`,
      width: "calc(100% - 300px)",
      position:"absolute",
      top:"0",
      left: "300"
    };

    return (
      <div style={{height:"100%", display:"flex", alignItems:"stretch"}}>
        <Toolbar showTabs={true} />
        <StyledSidebar>
          <Filter />
          <DiscoverStreamsList />
        </StyledSidebar>
        <StyledContent>
          <DiscoverMap
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBv4e2Uj5ZFp82G8QXKfYv7Ea3YutD4eTg"
            loadingElement={<div style={mapElementsStyle} />}
            containerElement={<div style={{mapElementsStyle}} />}
            mapElement={<div style={mapElementsStyle} />}
            />
        </StyledContent>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchStreams: () => STREAMS_ACTIONS.fetchStreams(dispatch)
  }
}

export default connect(null, mapDispatchToProps)(DiscoverScreen)
