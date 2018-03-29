import React, { Component } from 'react';
import { Button, DialogContainer, DatePicker, Checkbox } from 'react-md';
import { connect } from 'react-redux';
import Mixpanel from 'mixpanel-browser';
import moment from 'moment';
import { BigNumber } from 'bignumber.js';

import RegisterForm from '../authentication/RegisterForm';
import { register } from '../../redux/authentication/reducer';
import { WALLET_ACTIONS } from '../../redux/wallet/actions';
import { PURCHASES_ACTIONS } from '../../redux/purchases/actions';

const STEP_INTRO = 1,
  STEP_REGISTRATION = 2,
  STEP_WELCOME = 3,
  STEP_CONFIG = 4,
  STEP_MINTING = 5,
  STEP_PURCHASING = 6,
  STEP_SUCCESS = 7;

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
      this.setState({step:STEP_WELCOME});
    }
    else if(step === STEP_WELCOME){
      this.setState({step:STEP_CONFIG});
    }
    else if(step === STEP_CONFIG){
      //const amount = this.props.stream.price * days * 86400; //1 wei per second
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
    return(
      <DialogContainer
        id="staking-explainer"
        visible={this.props.visible}
        onHide={this.props.hideEventHandler}
        focusOnMount={false}
        dialogStyle={{width:"500px",position:"relative",top:"33%"}}
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
          <div style={{display:"flex", justifyContent:"flex-end",width:"100%"}}>
            <Button flat primary swapTheming onClick={event => this.finishStep(STEP_INTRO)}>Continue</Button>
          </div>
        </div>
        <div style={{display:(this.state.step === STEP_REGISTRATION)?'block':'none'}}>
          <h1>Registration</h1>
          <RegisterForm
            register={(values, settings) => this.props.register(values, settings)}
            callBack={() => {this.finishStep(STEP_REGISTRATION)}}
          />
        </div>
        <div style={{display:(this.state.step === STEP_WELCOME)?'block':'none'}}>
          <h1>Welcome to DataBroker DAO</h1>
          <p>
            To get you started, we will provide you with free demo DTX tokens.
          </p>
          <div style={{display:"flex", justifyContent:"flex-end",width:"100%"}}>
            <Button flat primary swapTheming onClick={event => this.finishStep(STEP_WELCOME)}>Continue</Button>
          </div>
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
          <div style={{display:"flex", justifyContent:"flex-end",width:"100%"}}>
            <Button flat primary swapTheming onClick={event => this.finishStep(STEP_CONFIG)}>Continue</Button>
          </div>
        </div>
        <div style={{display:(this.state.step === STEP_MINTING)?'block':'none'}}>
          <h1>Minting free DTX tokens for you</h1>
          <p>During the beta of DataBroker DAO DTX tokens are free.</p>
          <div style={{display:"flex", justifyContent:"flex-end",width:"100%"}}>
            <Button flat primary swapTheming onClick={event => this.finishStep(STEP_MINTING)} disabled={this.props.mintingTokens} className={this.props.mintingTokens?'disabled-button':''} >Continue</Button>
          </div>
        </div>
        <div style={{display:(this.state.step === STEP_PURCHASING)?'block':'none'}}>
          <h1>Saving purchase to the blockchain</h1>
          <p>
            It takes a while to save your purchase to the blockchain due to blocks that have to be mined before your transaction can be confirmed.
          </p>
          <div style={{display:"flex", justifyContent:"flex-end",width:"100%"}}>
            <Button flat primary swapTheming onClick={event => this.finishStep(STEP_PURCHASING)} disabled={this.props.purchasingAccess} className={this.props.purchasingAccess?'disabled-button':''} >Continue</Button>
          </div>
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
          <div style={{display:"flex", justifyContent:"flex-end",width:"100%"}}>
            <Button flat primary swapTheming onClick={event => this.finishStep(STEP_SUCCESS)}>Continue</Button>
          </div>
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
