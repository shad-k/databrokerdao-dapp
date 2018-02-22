import React, { Component } from 'react';
import { push, withRouter } from 'react-router-dom';
import { FontIcon, Button } from 'react-md';
import styled from 'styled-components';

import MapMarker from '../generic/MapMarker';

export default withRouter(class ClosedDiscoverMapMarker extends Component {
  onPurchaseButtonClicked() {
    console.log("Purchasing");
    this.props.history.push('/sensor-details');
  }

  render() {
    const StyledContentContainer = styled.div`
      display:table;
      padding:10px;
      width:200px;
    `;

    const StyledIcon = styled(FontIcon)`
      color:white;
      font-size:25px;
      display:table-cell;
      vertical-align:middle;
    `;

    const StyledSensorName = styled.div`
      color:white;
      font-weight:800;
      font-size:16px;
      width: 100%;
      margin-left: 8px;
    `;

    const StyledSensorDetails = styled.div`
      color:white;
      font-size:14px;
      width: 100%;
      margin-left: 8px;
    `;

    const StyledButton = styled(Button)`
      margin: 0 10px 10px 10px;
      width: calc(100% - 20px);
    `;

      return (
          <div>
            <StyledContentContainer>
              <StyledIcon>wb_sunny</StyledIcon>
              <StyledSensorName>Temperature sensor</StyledSensorName>
              <StyledSensorDetails>Updated every hour</StyledSensorDetails>
            </StyledContentContainer>
            <StyledButton raised primary onClick={event => this.onPurchaseButtonClicked()}>Purchase</StyledButton>
          </div>
      );
  }
})
