import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { List, ListItem } from 'react-md';
import styled from 'styled-components';
import { connect } from 'react-redux'
import _ from 'lodash';

import Toolbar from '../generic/Toolbar';
import Filter from './Filter'
import DiscoverMap from './DiscoverMap'
import { STREAMS_ACTIONS } from '../../redux/streams/actions';

class DiscoverScreen extends Component {
  componentDidMount() {
    //Get streams from API
    this.props.fetchStreams();
  }

  onStreamListItemClick(stream) {
    console.log("Click on stream");
    console.log(stream);
    this.props.history.push(`/sensor-details/${stream.id}`);
  }

  renderStreamsListItems(streams){
    let listItems = _.map(streams, stream => {
      return <ListItem key={stream.id} primaryText={stream.name} onClick={(event) => this.onStreamListItemClick(stream)}/>;
    });

    if(listItems.length > 0)
      return listItems;
    else if(listItems.length === 0 && this.props.fetchingStreams)
      return <ListItem primaryText={'loading streams'} disabled/>;
    else
      return <ListItem primaryText={'no streams'} disabled/>;
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

    console.log("Discover ff renderen ofwa");
    console.log(this.props.streams);

    return (
      <div style={{height:"100%", display:"flex", alignItems:"stretch"}}>
        <Toolbar showTabs={true} />
        <StyledSidebar>
          <Filter />
          <List>
            {this.renderStreamsListItems(this.props.streams)}
          </List>
        </StyledSidebar>
        <StyledContent>
          <DiscoverMap
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp"
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

const mapStateToProps = state => ({
  streams: state.streams.streams,
  fetchingStreams: state.streams.fetchingStreams,
  filter: state.streams.filter
})

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverScreen)
