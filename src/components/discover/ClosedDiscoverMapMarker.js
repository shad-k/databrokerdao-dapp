import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { FontIcon, Button } from 'react-md';
import styled from 'styled-components';

import MapMarker from '../generic/MapMarker';

export default class ClosedDiscoverMapMarker extends Component {
  render() {
    const StyledIcon = styled(FontIcon)`
      color:white;
      float:left;
      font-size:25px;
    `;

      return (
          <div style={{display:"table",padding:"10px"}}>
            <StyledIcon>wb_sunny</StyledIcon>
          </div>
      );
  }
}
