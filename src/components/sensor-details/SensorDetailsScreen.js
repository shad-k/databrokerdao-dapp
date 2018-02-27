import React, { Component } from 'react';
import { Button, FontIcon } from 'react-md';
import styled from 'styled-components';
import { connect } from 'react-redux'

import Toolbar from '../generic/Toolbar';
import CenteredCard from '../generic/CenteredCard';
import CardContent from '../generic/CardContent';
import ToolbarSpacer from '../generic/ToolbarSpacer';
import { STREAMS_ACTIONS } from '../../redux/streams/actions';

class SensorDetailsScreen extends Component {
  componentDidMount() {
    //In case this stream was not in state yet, load it (in case it was: refresh to get latest version)
    this.props.fetchStream();
  }

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
      display: flex;
      align-content: center;
      margin-bottom: 20px;
    `;

    const StyledSensorNameCardContent = styled.div`
      display:flex;
      justify-content:space-between;
    `;

    const StyledAttributeLabel = styled.span`
      margin-left: 12px;
    `;

    const { stream } = this.props;

    if(!stream)
      return(
        <div>
          <Toolbar showTabs={true} />
          <ToolbarSpacer/>
          <CenteredCard>
            <CardContent>
              <StyledSensorNameCardContent>
                <h1 style={{display:"inline-block"}}>{(stream)?stream.name:'Loading...'}</h1>
              </StyledSensorNameCardContent>
            </CardContent>
          </CenteredCard>
        </div>
      );

    return (
      <div>
        <Toolbar showTabs={true} />
        <ToolbarSpacer/>
        <CenteredCard>
          <CardContent noMarginBottom>
            <StyledSensorNameCardContent>
              <h1 style={{display:"inline-block"}}>{(stream)?stream.name:'loading'}</h1>
              <Button raised primary>Purchase access</Button>
            </StyledSensorNameCardContent>
          </CardContent>
          <StyledContentContainer>
            <StyledContentCell>
              <StyledSensorAttribute>
                <FontIcon>wb_sunny</FontIcon>
                <StyledAttributeLabel>Temperature sensor</StyledAttributeLabel>
              </StyledSensorAttribute>
              <StyledSensorAttribute>
                <FontIcon>update</FontIcon>
                <StyledAttributeLabel>Updated every two months</StyledAttributeLabel>
              </StyledSensorAttribute>
              <StyledSensorAttribute>
                <FontIcon>payment</FontIcon>
                <StyledAttributeLabel>20 DTX per hour</StyledAttributeLabel>
              </StyledSensorAttribute>
              <StyledSensorAttribute>
                <FontIcon>security</FontIcon>
                <StyledAttributeLabel>200 DTX staked by owner (?)</StyledAttributeLabel>
              </StyledSensorAttribute>
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

function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchStream: () => STREAMS_ACTIONS.fetchStream(dispatch, ownProps.match.params.id)
  }
}

function mapStateToProps({streams}, ownProps) {
  return {
    stream: streams.streams[ownProps.match.params.id]
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SensorDetailsScreen)
