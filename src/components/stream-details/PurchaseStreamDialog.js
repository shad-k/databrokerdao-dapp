import React, { Component } from 'react';
import { Button, DialogContainer, DatePicker, Checkbox, CircularProgress } from 'react-md';
import { connect } from 'react-redux';
import Mixpanel from 'mixpanel-browser';
import moment from 'moment';
import { BigNumber } from 'bignumber.js';
import styled from 'styled-components';

import RegisterForm from '../authentication/RegisterForm';
import TransactionDialog from '../generic/TransactionDialog';
import { register } from '../../redux/authentication/reducer';
import { WALLET_ACTIONS } from '../../redux/wallet/actions';
import { PURCHASES_ACTIONS } from '../../redux/purchases/actions';

const STEP_INTRO = 0,
  STEP_REGISTRATION = 1,
  STEP_CONFIG = 2,
  STEP_MINTING = 3,
  STEP_PURCHASING = 4,
  STEP_SUCCESS = 5;

class PurchaseStreamDialog extends Component {
  constructor(props){
    super(props);

    const defaultPurchaseEndTime = moment().add(7,'d').format('MM/DD/YYYY');
    const steps = (this.props.token)?
                    [{id:STEP_INTRO,description:"Intro"},{id:STEP_CONFIG,description:"Delivery"},{id:STEP_MINTING,description:"Mint"},{id:STEP_PURCHASING,description:"Purchase"},{id:STEP_SUCCESS,description:"Success"}]
                    :[{id:STEP_INTRO,description:"Intro"},{id:STEP_REGISTRATION,description:"Registration"},{id:STEP_CONFIG,description:"Delivery"},{id:STEP_MINTING,description:"Mint"},{id:STEP_PURCHASING,description:"Purchase"},{id:STEP_SUCCESS,description:"Success"}];

    this.state = {
      steps: steps,
      stepIndex: STEP_INTRO,
      purchaseEndTime: defaultPurchaseEndTime,//Today + 7 days
      receiveEmail: true,
      modal: false
    };
  }

  finishStep(step){
    if(step === STEP_INTRO){
        if(!this.props.token)
          this.setState({stepIndex:STEP_REGISTRATION});
        else
          this.setState({stepIndex:STEP_CONFIG});
    }
    else if(step === STEP_REGISTRATION){
      Mixpanel.track("Finish registration for purchase");
      this.setState({stepIndex:STEP_CONFIG});
    }
    else if(step === STEP_CONFIG){
      const days = Math.abs(moment().diff(moment(this.state.purchaseEndTime),'days')) + 1;
      const amount = BigNumber(this.props.stream.price).times(days).times(86400).toString();
      this.props.mintTokens(amount);
      this.setState({stepIndex:STEP_MINTING,modal:true});
    }
    else if (step === STEP_MINTING){
      this.props.purchaseAccess(this.props.stream,this.state.purchaseEndTime);
      this.setState({stepIndex:STEP_PURCHASING});
    }
    else if(step === STEP_PURCHASING)
      this.setState({stepIndex:STEP_SUCCESS});
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
    const loading = this.props.mintingTokens || this.props.purchasingAccess;

    return(
      <TransactionDialog
        visible={this.props.visible}
        onHide={this.props.hideEventHandler}
        modal={this.state.modal}
        steps={this.state.steps}
        stepIndex={this.state.stepIndex}
        nextStepHandler={(step) => {this.finishStep(step)}}
        loading={loading}
        showContinueButton={this.state.stepIndex !== STEP_REGISTRATION}
      >
        <div style={{display:(this.state.stepIndex === STEP_INTRO)?'block':'none'}}>
          <h1>Purchase access</h1>
          <p>
            Purchases are made using DTX tokens. As DataBroker DAO is currently in beta, we will provide you with free demo tokens.
          </p>
          <p>
            After your purchase, the readings of this stream will be delivered to your email address.
          </p>
        </div>
        <div style={{display:(this.state.stepIndex === STEP_REGISTRATION)?'block':'none'}}>
          <h1>Create account</h1>
          <RegisterForm
            register={(values, settings) => this.props.register(values, settings)}
            callBack={() => {this.finishStep(STEP_REGISTRATION)}}
          />
        </div>
        <div style={{display:(this.state.stepIndex === STEP_CONFIG)?'block':'none', padding:"0 15%"}}>
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
        </div>
        <div style={{display:(this.state.stepIndex === STEP_MINTING)?'block':'none'}}>
          <h1>Minting DTX tokens</h1>
          <p>During the beta of DataBroker DAO DTX tokens are free.</p>
        </div>
        <div style={{display:(this.state.stepIndex === STEP_PURCHASING)?'block':'none'}}>
          <h1>Saving to the blockchain</h1>
          <p>
            It takes a while to save your purchase to the blockchain due to blocks that have to be mined before your transaction can be confirmed.
          </p>
        </div>
        <div style={{display:(this.state.stepIndex === STEP_SUCCESS)?'block':'none'}}>
          <h1>Purchase successful</h1>
          {this.state.receiveEmail &&
            <p>
              You will start to receive readings of this stream in your inbox.
            </p>
          }
          {!this.state.receiveEmail &&
            <p>
              Congratulations! You successfully purchased access to this stream.
            </p>
          }
        </div>
      </TransactionDialog>
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
