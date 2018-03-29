import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux'
import Mixpanel from 'mixpanel-browser';

import Toolbar from '../generic/Toolbar';
import Filter from './Filter';
import DiscoverMap from './DiscoverMap';
import DiscoverStreamsList from './DiscoverStreamsList';
import { STREAMS_ACTIONS } from '../../redux/streams/actions';

class DiscoverScreen extends Component {
  componentDidMount() {
    Mixpanel.track("View discover screen");
  }

  render() {
    const StyledSidebar = styled.div`
      flex: initial;
      width: 340px;
      background-color:white;
      padding-top:65px;
      overflow-y: auto;
      box-shadow: 1px 0 8px rgba(0,0,0,0.15);
      z-index:1;
    `;

    const StyledContent = styled.div`
      flex: 1;
    `;

    const mapElementsStyle = {
      height: `100%`,
      width: "calc(100% - 340px)",
      position:"absolute",
      top:"0",
      left: "340"
    };

    const APIKey = "AIzaSyBv4e2Uj5ZFp82G8QXKfYv7Ea3YutD4eTg";

    return (
      <div style={{height:"100%", display:"flex", alignItems:"stretch"}}>
        <Toolbar showTabs={true} />
        <StyledSidebar>
          <Filter />
          <DiscoverStreamsList />
        </StyledSidebar>
        <StyledContent>
          <DiscoverMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=${APIKey}`}
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
    fetchStreams: (filter) => STREAMS_ACTIONS.fetchStreams(dispatch, filter)
  }
}

export default connect(null, mapDispatchToProps)(DiscoverScreen);
