import React, { Component } from 'react';
import { OverlayView } from "react-google-maps"
import styled from 'styled-components';

export default class Cluster extends Component {
  render() {
    const zIndex = Math.floor(90000 - this.props.position.lat*1000 + 10);
    const StyledContainer = styled.div`
      transform:translate(-50%, -100%);
      z-index: ${zIndex};
      background-color: #2e3192;
      width:40px;
      height:40px;
      border-radius:20px;
      display:flex;
      justify-content: center;
      align-items: center;
    `;

    const StyledLabel = styled.span`
      color:white;
      font-weight:500;
      font-size: 15px;
    `;

    return(
      <OverlayView
        position={{ lat: this.props.position.lat, lng: this.props.position.lng }}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
        <StyledContainer>
          <StyledLabel>
            {this.props.label}
          </StyledLabel>
        </StyledContainer>
      </OverlayView>
    );
  }
}
