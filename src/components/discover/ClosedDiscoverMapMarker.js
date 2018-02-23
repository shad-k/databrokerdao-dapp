import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { FontIcon, Button } from 'react-md';
import styled from 'styled-components';

import MapMarker from '../generic/MapMarker';

export default class ClosedDiscoverMapMarker extends Component {
  render() {
    const StyledIconContainer = styled.div`
      padding:10px;
      display:flex;
      align-items:center;
    `;

    const StyledIcon = styled(FontIcon)`
      color:white;
      font-size:25px;
    `;

      return (
          <StyledIconContainer>
            <StyledIcon>wb_sunny</StyledIcon>
          </StyledIconContainer>
      );
  }
}
