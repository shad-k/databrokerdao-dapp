import React, { Component } from 'react';
import { Button, DialogContainer, DatePicker, Checkbox, CircularProgress } from 'react-md';
import { connect } from 'react-redux';
import Mixpanel from 'mixpanel-browser';
import moment from 'moment';
import { BigNumber } from 'bignumber.js';
import styled from 'styled-components';

import RegisterForm from '../authentication/RegisterForm';
import { register } from '../../redux/authentication/reducer';
import { WALLET_ACTIONS } from '../../redux/wallet/actions';
import { PURCHASES_ACTIONS } from '../../redux/purchases/actions';

const STEP_INTRO = 1,
  STEP_REGISTRATION = 2,
  STEP_CONFIG = 3,
  STEP_MINTING = 4,
  STEP_PURCHASING = 5,
  STEP_SUCCESS = 6;

class PurchaseStreamDialog extends Component {
  constructor(props){
    super(props);

    const defaultPurchaseEndTime = moment().add(7,'d').format('MM/DD/YYYY');

    this.state = {
      step: STEP_INTRO,
      purchaseEndTime: defaultPurchaseEndTime,//Today + 7 days
      receiveEmail: true,
      modal: false
    };
  }

  finishStep(step){
    if(step === STEP_INTRO){
        if(!this.props.token)
          this.setState({step:STEP_REGISTRATION});
        else
          this.setState({step:STEP_CONFIG});
    }
    else if(step === STEP_REGISTRATION){
      Mixpanel.track("Finish registration for purchase");
      this.setState({step:STEP_CONFIG});
    }
    else if(step === STEP_CONFIG){
      const days = Math.abs(moment().diff(moment(this.state.purchaseEndTime),'days')) + 1;
      const amount = BigNumber(this.props.stream.price).times(days).times(86400).toString();
      this.props.mintTokens(amount);
      this.setState({step:STEP_MINTING,modal:true});
    }
    else if (step === STEP_MINTING){
      this.props.purchaseAccess(this.props.stream,this.state.purchaseEndTime);
      this.setState({step:STEP_PURCHASING});
    }
    else if(step === STEP_PURCHASING)
      this.setState({step:STEP_SUCCESS});
    else if(step === STEP_SUCCESS){
      Mixpanel.track("Finished purchase stream");
      this.props.hideEventHandler();
    }
  }

  handleReceiveEmailChange(value){
    this.setState({receiveEmail:value});
  }

  handlePurchaseEndTimeChange(value){
    this.setState({purchaseEndTime:value});
  }

  render(){
    const StyledButtonContainer = styled.div`
      width:100%;
      margin-top:24px;
      display: flex;
    `;

    const StyledButtonColumnLeft = styled.div`
      flex:1;
    `;

    const StyledButtonColumnRight = styled.div`
      flex:1;
      justify-content:flex-end;
      align-items:flex-end;
      display:flex;
    `;

    const StyledCircularProgress = styled(CircularProgress)`
      margin: 9px 0 0 0;
    `;

    return(
      <DialogContainer
        id="staking-explainer"
        visible={this.props.visible}
        onHide={this.props.hideEventHandler}
        focusOnMount={false}
        dialogStyle={{width:"530px",position:"relative",top:"33%",padding:"4px 10px 4px 10px"}}
        aria-labelledby="Purchase stream"
        modal={this.state.modal}
      >
        <div style={{display:(this.state.step === STEP_INTRO)?'block':'none'}}>
          <h1>Purchase access to {this.props.stream.name}</h1>
          <p>
            Purchases are made using DTX tokens. As DataBroker DAO is currently in beta, we will provide you with free demo tokens.
          </p>
          <p>
            After your purchase, the readings of this stream will be delivered to your email address.
          </p>
          <StyledButtonContainer>
            <StyledButtonColumnRight>
              <Button flat primary swapTheming onClick={event => this.finishStep(STEP_INTRO)}>Continue</Button>
            </StyledButtonColumnRight>
          </StyledButtonContainer>
        </div>
        <div style={{display:(this.state.step === STEP_REGISTRATION)?'block':'none'}}>
          <h1>Registration</h1>
          <RegisterForm
            register={(values, settings) => this.props.register(values, settings)}
            callBack={() => {this.finishStep(STEP_REGISTRATION)}}
          />
        </div>
        <div style={{display:(this.state.step === STEP_CONFIG)?'block':'none'}}>
          <h1>Stream readings delivery</h1>
          <Checkbox
            id="purchase-reading-emails"
            name="receive-email-checkbox[]"
            label="Receive stream readings via email"
            value="receive-email"
            checked={this.state.receiveEmail}
            style={{position:"relative",left:"-10px"}}
            onChange={(value) => this.handleReceiveEmailChange(value)}
          />
          <DatePicker
            id="purchase-end-time"
            label="Receive readings until"
            portal
            lastChild
            renderNode={null}
            disableScrollLocking
            value={this.state.purchaseEndTime}
            style={{marginBottom:"20px"}}
            onChange={(value) => this.handlePurchaseEndTimeChange(value)}
            formatOptions={{timeZone: 'UTC'}}
          />
          <StyledButtonContainer>
            <StyledButtonColumnRight>
              <Button flat primary swapTheming onClick={event => this.finishStep(STEP_CONFIG)}>Continue</Button>
            </StyledButtonColumnRight>
          </StyledButtonContainer>
        </div>
        <div style={{display:(this.state.step === STEP_MINTING)?'block':'none'}}>
          <h1>Minting free DTX tokens for you</h1>
          <p>During the beta of DataBroker DAO DTX tokens are free.</p>
          <StyledButtonContainer>
            {this.props.mintingTokens && (
              <StyledButtonColumnLeft>
                <StyledCircularProgress
                  centered={false}
                  id="minting-in-progress"
                />
              </StyledButtonColumnLeft>
            )}
            <StyledButtonColumnRight>
              <Button flat primary swapTheming onClick={event => this.finishStep(STEP_MINTING)} disabled={this.props.mintingTokens} className={this.props.mintingTokens?'disabled-button':''} >Continue</Button>
            </StyledButtonColumnRight>
          </StyledButtonContainer>
        </div>
        <div style={{display:(this.state.step === STEP_PURCHASING)?'block':'none'}}>
          <h1>Saving purchase to the blockchain</h1>
          <p>
            It takes a while to save your purchase to the blockchain due to blocks that have to be mined before your transaction can be confirmed.
          </p>
          <StyledButtonContainer>
            {this.props.purchasingAccess && (
              <StyledButtonColumnLeft>
                <StyledCircularProgress
                  centered={false}
                  id="purchasing-in-progress"
                />
              </StyledButtonColumnLeft>
            )}
            <StyledButtonColumnRight>
              <Button flat primary swapTheming onClick={event => this.finishStep(STEP_PURCHASING)} disabled={this.props.purchasingAccess} className={this.props.purchasingAccess?'disabled-button':''} >Continue</Button>
            </StyledButtonColumnRight>
          </StyledButtonContainer>
        </div>
        <div style={{display:(this.state.step === STEP_SUCCESS)?'block':'none'}}>
          <h1>Purchase successful</h1>
          {this.state.receiveEmail &&
            <p>
              Congratulations! You will start to receive readings of this stream in your inbox.
            </p>
          }
          {!this.state.receiveEmail &&
            <p>
              Congratulations! You successfully purchased access to this stream.
            </p>
          }
          <StyledButtonContainer>
            <StyledButtonColumnRight>
              <Button flat primary swapTheming onClick={event => this.finishStep(STEP_SUCCESS)}>Continue</Button>
            </StyledButtonColumnRight>
          </StyledButtonContainer>
        </div>
      </DialogContainer>
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
  mintingTokens: state.wallet.mintingTokens,
  purchasingAccess: state.purchases.purchasingAccess
});

function mapDispatchToProps(dispatch) {
  return {
    register: (values, settings) => dispatch(register(values, settings)),
    mintTokens: (amount) => dispatch(WALLET_ACTIONS.mintTokens(amount)),
    purchaseAccess: (stream,endTime) => dispatch(PURCHASES_ACTIONS.purchaseAccess(stream,endTime))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseStreamDialog);
