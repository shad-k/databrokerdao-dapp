import React, { Component } from 'react';
import { OverlayView } from "react-google-maps"
import styled, { keyframes } from 'styled-components';

export default class MapMarker extends Component {
  render() {
    const StyledContent = styled.div`
      /*background:rgba(0,0,0,0.85);*/
      background-color:#ee274c;
      border-radius:17px;
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
      81%{
        background-color:#34E855;
      }
      100%{
        background-color:#34E855;
      }
    `;

    const AnimationDelay = Math.floor(Math.random() * 10);
    const StyledStatusIndicator = styled.div`
      width:11px;
      height:11px;
      border-radius:6px;
      position:absolute;
      right:0px;
      top:0px;
      background-color:#ee274c;
      animation: ${PulseAnimation} 10s infinite;
      border: 2px solid #18B81D;
      animation-delay: ${-AnimationDelay}s
    `;


    const zIndex = 90000 - this.props.position.lat*1000 + 10;
    const StyledContainer = styled.div`
      transform:translate(-50%, -100%);
      z-index: ${zIndex};
    `;

    return(
      <OverlayView
        position={{ lat: this.props.position.lat, lng: this.props.position.lng }}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
        <StyledContainer>
          <StyledContent>
            {this.props.children}
          </StyledContent>
          <StyledPin>
          </StyledPin>
          <StyledShadow>
          </StyledShadow>
          <StyledStatusIndicator>
          </StyledStatusIndicator>
        </StyledContainer>
      </OverlayView>
    );
  }
}
