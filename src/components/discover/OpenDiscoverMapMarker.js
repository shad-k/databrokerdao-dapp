import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-md';
import styled from 'styled-components';
import { BigNumber } from 'bignumber.js';

import Icon from '../generic/Icon';

export default withRouter(class ClosedDiscoverMapMarker extends Component {
  onPurchaseButtonClicked() {
    this.props.history.push(`/stream-details/${this.props.stream.key}`);
  }

  convertWeiToDtx(dtxValue){
    return BigNumber(dtxValue).div(BigNumber(10).pow(18)).toString();
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
      margin-left: 11px;
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
      margin-left: 11px;
      margin-bottom: 4px;
      &:last-child{
        margin-bottom:0;
      }
    `;

    const StyledButton = styled(Button)`
      margin: 0 10px 10px 10px;
      width: calc(100% - 20px);
    `;

    const stream = this.props.stream;

    return (
        <div>
          <StyledContentContainer>
            <Icon icon={stream.type} style={{color:"white", width:"24px", height:"24px"}}/>
            <div style={{width:"196px"}}>
              <StyledSensorName onClick={event => this.onPurchaseButtonClicked()}>{stream.name}</StyledSensorName>
              <StyledSensorDetails>Frequency: {stream.updateinterval === 86400000?"daily":`${stream.updateinterval/1000}''`}</StyledSensorDetails>
              <StyledSensorDetails>Stake: {this.convertWeiToDtx(stream.stake)} DTX</StyledSensorDetails>
              <StyledSensorDetails>Challenges: {stream.numberofchallenges} ({this.convertWeiToDtx(stream.challengesstake)} DTX)</StyledSensorDetails>
            </div>
          </StyledContentContainer>
          <StyledButton raised primary onClick={event => this.onPurchaseButtonClicked()}>Purchase</StyledButton>
        </div>
    );
  }
})
