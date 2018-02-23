import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { FontIcon } from 'react-md';
import styled from 'styled-components';

import MapMarker from '../generic/MapMarker';

export default class LandingMapMarker extends Component {
  render() {
    const StyledContentContainer = styled.div`
      padding:10px;
      display: flex;
      align-items:center;
    `;

    const StyledIcon = styled(FontIcon)`
      color:white;
      fontSize:25px;
    `;

    const StyledLabel = styled.span`
      color:white;
      font-weight:700;
      font-size:16px;
      padding-left:8px;
      width:50px;
    `;

    return (
      <MapMarker position={this.props.position}>
        <StyledContentContainer>
          <StyledIcon>wb_sunny</StyledIcon>
          <StyledLabel>20&#8451;</StyledLabel>
        </StyledContentContainer>
      </MapMarker>
    );
  }
}
