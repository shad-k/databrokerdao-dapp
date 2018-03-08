import React, { Component } from 'react';
import { OverlayView } from "react-google-maps"
import styled, { keyframes } from 'styled-components';

export default class MapMarker extends Component {
  render() {
    const StyledContent = styled.div`
      /*background:rgba(0,0,0,0.85);*/
      background-color:#ee274c;
      border-radius:10px;
      z-index:3;
    `;

    const StyledPin = styled.div`
      width: 0;
      height: 0;
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-top: 7px solid #ee274c;
      position: relative;
      left: 50%;
      transform: translate(-50%,0);
      z-index:3;
    `;

    const StyledShadow = styled.div`
      width: 32px;
      height: 12px;
      background: radial-gradient(closest-side, rgba(0,0,0,0.22),rgba(0,0,0,0));
      position: relative;
      left: 50%;
      transform: translate(-50%,-6px);
      z-index:-1;
    `;

    /*
    const PulseAnimation = keyframes`
      0% {
        transform: scale(0);
        opacity: 0.0;
      }
      25% {
        transform: scale(0);
        opacity: 0.1;
      }
      50% {
        transform: scale(0.1);
        opacity: 0.3;
      }
      75% {
        transform: scale(0.5);
        opacity: 0.5;
      }
      100% {
        transform: scale(1);
        opacity: 0.0;
      }
    `;

    const StyledPulse = styled.div`
      left: 50%;
      z-index:-1;
      animation: ${PulseAnimation} 3s ease-out infinite;
      width: 40px;
      height: 20px;
      border-radius:25px;
      background: radial-gradient(closest-side, red, rgba(0,0,0,0));
      position: relative;
      transform-origin: 25px 10px;
    `;
    */

    return(
      <OverlayView
        position={{ lat: this.props.position.lat, lng: this.props.position.lng }}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
        <div style={{transform: "translate(-50%, -100%)"}}>
          <StyledContent>
            {this.props.children}
          </StyledContent>
          <StyledPin>
          </StyledPin>
          <StyledShadow>
          </StyledShadow>
        </div>
      </OverlayView>
    );
  }
}
