import React, { Component } from 'react';
import { Button, FontIcon } from 'react-md';
import styled from 'styled-components';
import { connect } from 'react-redux'
import Mixpanel from 'mixpanel-browser';

import Toolbar from '../generic/Toolbar';
import CenteredCard from '../generic/CenteredCard';
import CardContent from '../generic/CardContent';
import ToolbarSpacer from '../generic/ToolbarSpacer';
import { STREAMS_ACTIONS } from '../../redux/streams/actions';
import Icon from '../generic/Icon';
import StakingExplainerDialog from './StakingExplainerDialog';
import PurchaseStreamDialog from './PurchaseStreamDialog';

class StreamDetailsScreen extends Component {
  constructor(props){
    super(props);

    this.state = {
      StakingExplainerVisible: false,
      PurchaseStreamVisible: false
    };
  }

  componentDidMount() {
    //In case this stream was not in state yet, load it (in case it was: refresh to get latest version)
    this.props.fetchStream();
    this.props.fetchAvailableStreamTypes();
    Mixpanel.track("View stream details screen");
  }

  toggleStakingExplainer(){
    this.setState({StakingExplainerVisible: !this.state.StakingExplainerVisible});
  }

  togglePurchaseStream(){
    if(!this.state.PurchaseStreamVisible)
      Mixpanel.track("View purchase stream dialog");
    this.setState({PurchaseStreamVisible: !this.state.PurchaseStreamVisible});
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
      font-weight: 400;
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

    const { stream, availableStreamTypes } = this.props;

    if(!stream || !availableStreamTypes)
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

      const example = JSON.stringify(JSON.parse(stream.example.replace(/'/g, '"')), null, '  ');

    return (
      <div>
        <Toolbar showTabs={true} />
        <ToolbarSpacer/>
        <CenteredCard>
          <CardContent noMarginBottom>
            <StyledSensorNameCardContent>
              <h1 style={{display:"inline-block"}}>{(stream)?stream.name:'loading'}</h1>
              <Button flat primary swapTheming onClick={event => this.togglePurchaseStream()} style={{marginTop:"6px"}}>Purchase access</Button>
            </StyledSensorNameCardContent>
          </CardContent>
          <StyledContentContainer>
            <StyledContentCell>
              <StyledSensorAttribute>
                <Icon icon={stream.type} style={{fill:"rgba(0,0,0,0.54)", width:"20px", height:"20px"}} />
                <StyledAttributeLabel>Type: {availableStreamTypes[stream.type].name}</StyledAttributeLabel>
              </StyledSensorAttribute>
              <StyledSensorAttribute>
                <FontIcon>update</FontIcon>
                <StyledAttributeLabel>Frequency: daily</StyledAttributeLabel>
              </StyledSensorAttribute>
            </StyledContentCell>
            <StyledContentCell>
              <StyledSensorAttribute>
                <Icon icon="dtx" style={{fill:"rgba(0,0,0,0.54)", width:"20px", height:"20px"}} />
                <StyledAttributeLabel>Price: {stream.price} DTX per reading</StyledAttributeLabel>
              </StyledSensorAttribute>
              <StyledSensorAttribute>
                <Icon icon="staking" style={{fill:"rgba(0,0,0,0.54)", width:"20px", height:"20px"}} />
                <StyledAttributeLabel>
                  Owner stake: {stream.stake} DTX (<span className="clickable" onClick={event => this.toggleStakingExplainer()}>?</span>)
                </StyledAttributeLabel>
              </StyledSensorAttribute>
            </StyledContentCell>
          </StyledContentContainer>
        </CenteredCard>
        <CenteredCard>
          <CardContent>
            <h1>Example reading(s)</h1>
            <div style={{backgroundColor:"rgba(0,0,0,0.1)", borderRadius:"12px", padding:"15px"}}>
              <pre>{example}</pre>
            </div>
          </CardContent>
        </CenteredCard>
        <StakingExplainerDialog visible={this.state.StakingExplainerVisible} hideEventHandler={() => this.toggleStakingExplainer()} />
        <PurchaseStreamDialog visible={this.state.PurchaseStreamVisible} stream={stream} hideEventHandler={() => this.togglePurchaseStream()} />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchStream: () => dispatch(STREAMS_ACTIONS.fetchStream(dispatch, ownProps.match.params.key)),
    fetchAvailableStreamTypes: () => dispatch(STREAMS_ACTIONS.fetchAvailableStreamTypes())
  }
}

function mapStateToProps(state, ownProps) {
  return {
    stream: state.streams.streams[ownProps.match.params.key],
    availableStreamTypes: state.streams.availableStreamTypes
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StreamDetailsScreen)
