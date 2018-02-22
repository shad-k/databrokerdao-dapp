import React, { Component } from 'react';
import { OverlayView } from "react-google-maps"
import styled from 'styled-components';

export default class MapMarker extends Component {
  render() {
    const StyledContent = styled.div`
      background:rgba(0,0,0,0.7);
      border-radius:12px;
    `;

    const StyledPin = styled.div`
      width: 0;
      height: 0;
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-top: 10px solid rgba(0,0,0,0.7);
      position: relative;
      left: 50%;
      transform: translate(-50%,0);
    `;

    return(
      <OverlayView
        position={{ lat: this.props.position.lat, lng: this.props.position.lng }}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
        <div style={{transform: "translate(-50%, -100%)"}}>
          <StyledContent className="clearfix">
            {this.props.children}
          </StyledContent>
          <StyledPin>
          </StyledPin>
        </div>
      </OverlayView>
    );
  }
}
