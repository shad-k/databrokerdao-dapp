import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux'
import Mixpanel from 'mixpanel-browser';

import Toolbar from '../generic/Toolbar';
import Filter from './Filter';
import DiscoverMap from './DiscoverMap';
import DiscoverStreamsList from './DiscoverStreamsList';
import { STREAMS_ACTIONS } from '../../redux/streams/actions';
import Sidebar from './Sidebar';

class DiscoverScreen extends Component {
  componentDidMount() {
    Mixpanel.track("View discover screen");
  }

  constructor(props){
    super(props);

    this.state = {
      sidebarWidth: window.innerWidth > 480? 320 : 0
    };
  }

  setSidebarWidth(width){
    this.setState({sidebarWidth:width});
  }

  render() {
    const StyledSidebar = styled.div`
      flex: initial;
      width: 320px;
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
      width: `calc(100% - ${this.state.sidebarWidth}px)`,
      position:"absolute",
      top:"0",
      left: "320"
    };

    const APIKey = "AIzaSyBv4e2Uj5ZFp82G8QXKfYv7Ea3YutD4eTg";

    return (
      <div style={{height:"100%", display:"flex", alignItems:"stretch"}}>
        <Toolbar showTabs={true} />
        <Sidebar setWidthHandler={(width) => this.setSidebarWidth(width)}/>
        <StyledContent>
          <DiscoverMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places&key=${APIKey}`}
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
