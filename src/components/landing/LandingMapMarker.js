import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { FontIcon } from 'react-md';
import styled from 'styled-components';

import MapMarker from '../generic/MapMarker';

export default class LandingMapMarker extends Component {
  render() {
    const StyledIcon = styled(FontIcon)`
      color:white;
      float:left;
      fontSize:25px;
    `;

    const StyledLabel = styled.span`
      color:white;
      font-weight:700;
      font-size:16px;
      display:table-cell;
      vertical-align:middle;
      padding-left:8px;
    `;

    return (
      <MapMarker position={this.props.position} style={{display:"table"}}>
          <div style={{display:"table", padding:"10px"}}>
            <StyledIcon>wb_sunny</StyledIcon>
            <StyledLabel>20&#8451;</StyledLabel>
          </div>
      </MapMarker>
    );
  }
}
