import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { Grid, Cell, List, ListItem } from 'react-md';
import styled from 'styled-components';

import Toolbar from '../generic/Toolbar';
import Filter from './Filter'
import DiscoverMap from './DiscoverMap'

export default class DiscoverScreen extends Component {
  render() {
    const StyledSidebar = styled(Cell)`
      position:absolute;
      height:100%;
      background-color:white;
      padding-top:60px;
      overflow-y:auto;
    `;

    const StyledContent = styled(Cell)`
      position:absolute;
      right:0;
      height:100%
    `;

    const mapElementsStyle = {
      height: `100%`,
      width:"100%",
      position:"absolute",
      top:"0",
      left: "0"
    };

    return (
      <div>
        <Toolbar showTabs={true} />
        <Grid noSpacing>
          <StyledSidebar size={2}>
            <Filter />
            <List>
              <ListItem primaryText="Temp Sensor Falconplein" />
              <ListItem primaryText="CO2 sensor Volkswagen" />
              <ListItem primaryText="Windsensor Kathedraal" />
              <ListItem primaryText="Temp Sensor Falconplein" />
              <ListItem primaryText="CO2 sensor Volkswagen" />
              <ListItem primaryText="Windsensor Kathedraal" />
            </List>
          </StyledSidebar>
          <StyledContent size={10}>
            <DiscoverMap
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp"
              loadingElement={<div style={mapElementsStyle} />}
              containerElement={<div style={{mapElementsStyle}} />}
              mapElement={<div style={mapElementsStyle} />}
              />
          </StyledContent>
        </Grid>
      </div>
    );
  }
}
