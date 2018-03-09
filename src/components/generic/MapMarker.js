import React, { Component } from 'react';
import { OverlayView } from "react-google-maps"
import styled, { keyframes } from 'styled-components';

export default class MapMarker extends Component {
  render() {
    const StyledContent = styled.div`
      /*background:rgba(0,0,0,0.85);*/
      background-color:#ee274c;
      border-radius:17px;
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

    const PulseAnimation = keyframes`
      0% {
        background-color:#34E855;
      }
      75% {
        background-color:#34E855;
      }
      80% {
        background-color:white;
      }
      84%{
        background-color:#34E855;
      }
      100%{
        background-color:#34E855;
      }
    `;

    const StyledStatusIndicator = styled.div`
      width:9px;
      height:9px;
      border-radius:6px;
      position:absolute;
      right:1px;
      top:1px;
      background-color:#ee274c;
      animation: ${PulseAnimation} 2s infinite;
      border: 1px solid #00CE06;
    `;

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
          <StyledStatusIndicator>
          </StyledStatusIndicator>
        </div>
      </OverlayView>
    );
  }
}
