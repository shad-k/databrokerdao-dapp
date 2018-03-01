import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { FontIcon, Button } from 'react-md';
import styled from 'styled-components';

import Icon from '../generic/icon';

export default withRouter(class ClosedDiscoverMapMarker extends Component {
  onPurchaseButtonClicked() {
    this.props.history.push(`/stream-details/${this.props.stream.id}`);
  }

  render() {

    const StyledContentContainer = styled.div`
      padding:10px;
      width:200px;
      display: flex;
      align-items: center;
    `;

    const StyledIcon = styled(FontIcon)`
      color:white;
      font-size:25px;
    `;

    const StyledSensorName = styled.div`
      color:white;
      font-weight:700;
      font-size:16px;
      width: 100%;
      margin-left: 9px;
      margin-bottom: 3px;
    `;

    const StyledSensorDetails = styled.div`
      color:white;
      font-size:14px;
      width: 100%;
      margin-left: 9px;
    `;

    const StyledButton = styled(Button)`
      margin: 0 10px 10px 10px;
      width: calc(100% - 20px);
    `;

      return (
          <div>
            <StyledContentContainer>
              <Icon icon={this.props.stream.type} style={{color:"white"}}/>
              <div>
                <StyledSensorName>{this.props.stream.name}</StyledSensorName>
                <StyledSensorDetails>Updated every hour</StyledSensorDetails>
              </div>
            </StyledContentContainer>
            <StyledButton raised primary onClick={event => this.onPurchaseButtonClicked()}>Purchase</StyledButton>
          </div>
      );
  }
})
