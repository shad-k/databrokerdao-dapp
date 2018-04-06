import React, { Component } from 'react';
import { Button, FontIcon, DropdownMenu, AccessibleFakeButton, IconSeparator, ListItem } from 'react-md';
import styled from 'styled-components';
import { connect } from 'react-redux'
import Mixpanel from 'mixpanel-browser';
import { BigNumber } from 'bignumber.js';
import _ from 'lodash';
import moment from 'moment';

import Toolbar from '../generic/Toolbar';
import CenteredCard from '../generic/CenteredCard';
import CardContent from '../generic/CardContent';
import ToolbarSpacer from '../generic/ToolbarSpacer';
import { STREAMS_ACTIONS } from '../../redux/streams/actions';
import { PURCHASES_ACTIONS } from '../../redux/purchases/actions';
import Icon from '../generic/Icon';
import StakingExplainerDialog from './StakingExplainerDialog';
import PurchaseStreamDialog from './PurchaseStreamDialog';
import ChallengeStreamDialog from './ChallengeStreamDialog';

class StreamDetailsScreen extends Component {
  constructor(props){
    super(props);

    this.state = {
      StakingExplainerVisible: false,
      PurchaseStreamVisible: false,
      ChallengeDialogVisible: false
    };
  }

  componentDidMount() {
    //In case this stream was not in state yet, load it (in case it was: refresh to get latest version)
    this.props.fetchStream();
    this.props.fetchAvailableStreamTypes();
    if(this.props.token)
      this.props.fetchPurchases();
    Mixpanel.track("View stream details screen");
  }

  convertWeiToDtx(dtxValue){
    return BigNumber(dtxValue).div(BigNumber(10).pow(18)).toString();
  }

  toggleStakingExplainer(){
    this.setState({StakingExplainerVisible: !this.state.StakingExplainerVisible});
  }

  togglePurchaseStream(){
    if(!this.state.PurchaseStreamVisible)
      Mixpanel.track("View purchase stream dialog");
    this.setState({PurchaseStreamVisible: !this.state.PurchaseStreamVisible});
  }

  toggleChallengeDialog(event){
    if(!this.state.PurchaseStreamVisible)
      Mixpanel.track("View challenge stream dialog");
    this.setState({ChallengeDialogVisible: !this.state.ChallengeDialogVisible});
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

    const StyledExampleContainer = styled.div`
      background-color:rgba(0,0,0,0.1);
      border-radius:12px;
      padding:15px;
    `;

    const { stream, availableStreamTypes, fetchingPurchases } = this.props;

    if(!stream || !availableStreamTypes || fetchingPurchases)
      return(
        <div>
          <Toolbar showTabs={true} />
          <ToolbarSpacer/>
          <CenteredCard>
            <CardContent>
              <StyledSensorNameCardContent>
                <h1 style={{display:"inline-block"}}>Loading...</h1>
              </StyledSensorNameCardContent>
            </CardContent>
          </CenteredCard>
        </div>
      );

      let example = stream.example;
      try {
        example = JSON.stringify(JSON.parse(stream.example.replace(/'/g, '"')), null, '  ');
      } catch (e) {
        // Not a JSON example - OK no problem
      }

      const price = this.convertWeiToDtx(stream.price * stream.updateinterval / 1000);
      const stake = this.convertWeiToDtx(stream.stake);

      const purchase = _.find(this.props.purchases, purchase => {return purchase.key === this.props.stream.key;});
      const purchased = purchase !== undefined;
      const isOwner = this.props.stream.owner === localStorage.getItem('address');

      const updateInterval = stream.updateinterval === 86400000?"daily":`${stream.updateinterval/1000}\'\'`;

      let purchaseEndTime = null;
      if(purchase)
        purchaseEndTime = moment(parseInt(purchase.endTime)*1000).format('MMM D, YYYY');

      const menuItems =  [
        <ListItem
          id="challenge-list-item"
          key="challenge-list-item"
          primaryText="Challenge stream"
          onClick={(event) => this.toggleChallengeDialog(event)}
        />
      ];

      return (
        <div>
          <Toolbar showTabs={true} />
          <ToolbarSpacer/>
          <CenteredCard>
            <CardContent noMarginBottom>
              <StyledSensorNameCardContent>
                <h1 style={{display:"inline-block"}}>{stream.name}</h1>
                {(!purchased && !isOwner) &&
                  <Button flat primary swapTheming onClick={event => this.togglePurchaseStream()} style={{marginTop:"8px"}}>Purchase access</Button>
                }
                { purchased &&
                  <DropdownMenu
                    id={`smart-avatar-dropdown-menu`}
                    menuItems={menuItems}
                    anchor={{
                      x: DropdownMenu.HorizontalAnchors.CENTER,
                      y: DropdownMenu.VerticalAnchors.OVERLAP,
                    }}
                    position={DropdownMenu.Positions.TOP_LEFT}
                    animationPosition="below"
                    sameWidth
                    simplifiedMenu={true}
                    style={{marginTop:"17px"}}
                  >
                    <AccessibleFakeButton>
                      <IconSeparator label={`Purchased until ${purchaseEndTime}`}>
                        <FontIcon>arrow_drop_down</FontIcon>
                      </IconSeparator>
                    </AccessibleFakeButton>
                  </DropdownMenu>
                }
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
                  <StyledAttributeLabel>Frequency: {updateInterval}</StyledAttributeLabel>
                </StyledSensorAttribute>
                {parseInt(stream.challenges) !== 0 &&
                  <StyledSensorAttribute>
                    <Icon icon="danger" style={{fill:"red", width:"20px", height:"20px"}} />
                    <StyledAttributeLabel>Challenges: {stream.challenges} ({Math.floor(this.convertWeiToDtx(stream.challengesstake))} DTX staked) (<span className="clickable" onClick={event => this.toggleStakingExplainer()}>?</span>)</StyledAttributeLabel>
                  </StyledSensorAttribute>
                }
              </StyledContentCell>
              <StyledContentCell>
                <StyledSensorAttribute>
                  <Icon icon="dtx" style={{fill:"rgba(0,0,0,0.54)", width:"20px", height:"20px"}} />
                  <StyledAttributeLabel>Price: {price} DTX per reading</StyledAttributeLabel>
                </StyledSensorAttribute>
                <StyledSensorAttribute>
                  <Icon icon="staking" style={{fill:"rgba(0,0,0,0.54)", width:"20px", height:"20px"}} />
                  <StyledAttributeLabel>
                    Owner stake: {stake} DTX (<span className="clickable" onClick={event => this.toggleStakingExplainer()}>?</span>)
                  </StyledAttributeLabel>
                </StyledSensorAttribute>
              </StyledContentCell>
            </StyledContentContainer>
          </CenteredCard>
          <CenteredCard>
            <CardContent>
              <h1>Example reading(s)</h1>
              <StyledExampleContainer>
                <pre>{example}</pre>
              </StyledExampleContainer>
            </CardContent>
          </CenteredCard>
          <PurchaseStreamDialog visible={this.state.PurchaseStreamVisible} stream={stream} hideEventHandler={() => this.togglePurchaseStream()} />
          <ChallengeStreamDialog visible={this.state.ChallengeDialogVisible} stream={stream} hideEventHandler={() => this.toggleChallengeDialog()} toggleStakingExplainer={() => this.toggleStakingExplainer()}/>
          <StakingExplainerDialog visible={this.state.StakingExplainerVisible} hideEventHandler={() => this.toggleStakingExplainer()} />
        </div>
      );
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchStream: () => dispatch(STREAMS_ACTIONS.fetchStream(dispatch, ownProps.match.params.key)),
    fetchAvailableStreamTypes: () => dispatch(STREAMS_ACTIONS.fetchAvailableStreamTypes()),
    fetchPurchases: () => dispatch(PURCHASES_ACTIONS.fetchPurchases())
  }
}

function mapStateToProps(state, ownProps) {
  return {
    stream: state.streams.streams[ownProps.match.params.key],
    availableStreamTypes: state.streams.availableStreamTypes,
    purchases:state.purchases.purchases,
    fetchingPurchases:state.purchases.fetchingPurchases,
    token: state.auth.token //Used to verify if a user is signed in, if not we don't have to get purchases from API
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StreamDetailsScreen)
