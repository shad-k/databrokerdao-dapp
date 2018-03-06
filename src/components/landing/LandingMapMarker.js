import React, { Component } from 'react';
import { FontIcon } from 'react-md';
import styled from 'styled-components';

import MapMarker from '../generic/MapMarker';
import Icon from '../generic/Icon';

export default class LandingMapMarker extends Component {
  render() {
    const StyledContentContainer = styled.div`
      padding:10px;
      display: flex;
      align-items:center;
    `;

    const StyledLabel = styled.span`
      color:white;
      font-weight:700;
      font-size:16px;
      padding-left:9px;
      width:50px;
    `;

    return (
      <MapMarker position={this.props.position}>
        <StyledContentContainer>
          <Icon icon="temperature" style={{width:"20px", height:"20px", fill:"white"}}/>
          <StyledLabel>20&#8451;</StyledLabel>
        </StyledContentContainer>
      </MapMarker>
    );
  }
}
