import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { List, ListItem } from 'react-md';
import styled from 'styled-components';

import Toolbar from '../generic/Toolbar';
import Filter from './Filter'
import DiscoverMap from './DiscoverMap'

export default withRouter(class DiscoverScreen extends Component {
  onListItemClick() {
    this.props.history.push('/sensor-details');
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
          <List>
            <ListItem primaryText="Temp Sensor Falconplein link" onClick={(event) => this.onListItemClick()}/>
            <ListItem primaryText="CO2 sensor Volkswagen" onClick={(event) => this.onListItemClick()}/>
            <ListItem primaryText="Windsensor Kathedraal" onClick={(event) => this.onListItemClick()}/>
            <ListItem primaryText="Temp Sensor Falconplein" onClick={(event) => this.onListItemClick()}/>
            <ListItem primaryText="CO2 sensor Volkswagen" onClick={(event) => this.onListItemClick()}/>
            <ListItem primaryText="Windsensor Kathedraal" onClick={(event) => this.onListItemClick()}/>
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
})
