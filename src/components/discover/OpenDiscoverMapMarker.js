import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-md';
import styled from 'styled-components';

import Icon from '../generic/Icon';

export default withRouter(class ClosedDiscoverMapMarker extends Component {
  onPurchaseButtonClicked() {
    this.props.history.push(`/stream-details/${this.props.stream.key}`);
  }

  render() {

    const StyledContentContainer = styled.div`
      padding:10px;
      width:240px;
      display: flex;
      align-items: center;
    `;

    const StyledSensorName = styled.div`
      color:white;
      font-weight:700;
      font-size:16px;
      width: 100%;
      margin-left: 9px;
      margin-bottom: 3px;
      cursor: pointer;
      &:hover{
        text-decoration:underline;
      }
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
              <Icon icon={this.props.stream.type} style={{color:"white", width:"24px", height:"24px"}}/>
              <div style={{width:"196px"}}>
                <StyledSensorName onClick={event => this.onPurchaseButtonClicked()}>{this.props.stream.name}</StyledSensorName>
                <StyledSensorDetails>Frequency: daily</StyledSensorDetails>
              </div>
            </StyledContentContainer>
            <StyledButton raised secondary onClick={event => this.onPurchaseButtonClicked()}>Purchase</StyledButton>
          </div>
      );
  }
})
