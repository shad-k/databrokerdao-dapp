import React, { Component } from 'react';
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

    return (
      <MapMarker position={this.props.position}>
        <StyledContentContainer>
          <Icon icon={this.props.stream.type} style={{width:"20px", height:"20px", fill:"white"}}/>
        </StyledContentContainer>
      </MapMarker>
    );
  }
}
