import React, { Component } from 'react';
import { Button } from 'react-md';
import styled from 'styled-components';

import Toolbar from '../generic/Toolbar';
import CenteredCard from '../generic/CenteredCard';
import CardContent from '../generic/CardContent';
import ToolbarSpacer from '../generic/ToolbarSpacer';

export default class SensorDetailsScreen extends Component {
  render() {
    const StyledContentContainer = styled.div`
      display:flex;
      padding:15px;
    `;

    const StyledContentCell = styled.div`
      margin:15px;
      flex:1;
    `;

    const StyledSensorAttribute = styled.p`
      font-weight: 700;
      font-size: 18px;
      line-height: 2;
    `;

    return (
      <div>
        <Toolbar showTabs={true} />
        <ToolbarSpacer/>
        <CenteredCard>
          <CardContent noMarginBottom>
            <h1>BarVista Temperature Sensor</h1>
          </CardContent>
          <StyledContentContainer>
            <StyledContentCell>
              <StyledSensorAttribute>Updated every two months</StyledSensorAttribute>
              <StyledSensorAttribute>20 DTX per hour</StyledSensorAttribute>
              <StyledSensorAttribute>200 DTX stakes by owner (?)</StyledSensorAttribute>
              <Button raised primary>Purchase access</Button>
            </StyledContentCell>
            <StyledContentCell style={{backgroundColor:"#5DBCD7"}}>

            </StyledContentCell>
          </StyledContentContainer>
        </CenteredCard>
        <CenteredCard>
          <CardContent>
            <h1>Example readings</h1>
            <div style={{backgroundColor:"rgba(0,0,0,0.1)", borderRadius:"12px", padding:"15px"}}>
              <code>&#123;
                temperature:800, women:26, men:187
              &#125;</code>
            </div>
          </CardContent>
        </CenteredCard>
      </div>
    );
  }
}
