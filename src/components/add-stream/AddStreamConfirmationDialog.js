import React, { Component } from 'react';
import { Button, DialogContainer, Checkbox } from 'react-md';
import { connect } from 'react-redux';
import Mixpanel from 'mixpanel-browser';
import moment from 'moment';
import { BigNumber } from 'bignumber.js';

import RegisterForm from '../authentication/RegisterForm';
import { register } from '../../redux/authentication/reducer';
import { WALLET_ACTIONS } from '../../redux/wallet/actions';

const STEP_INTRO = 1,
  STEP_REGISTRATION = 2,
  STEP_WELCOME = 3,
  STEP_MINTING = 4,
  STEP_ENLISTING = 5,
  STEP_SUCCESS = 6;

class AddStreamConfirmationDialog extends Component {
  constructor(props){
    super(props);

    this.state = {
      step: STEP_INTRO,
    };
  }

  finishStep(step){
    if(step === STEP_INTRO){
        if(!this.props.token)
          this.setState({step:STEP_REGISTRATION});
        else{
          const amount = BigNumber(this.props.stream.stake).times(BigNumber(10).pow(18)).toString(); //server needs amount in wei, so stake * 10^18
          this.props.mintTokens(amount);
          this.setState({step:STEP_MINTING});
        }
    }
    else if(step === STEP_REGISTRATION){
      Mixpanel.track("Finish registration for enlisting");
      this.setState({step:STEP_WELCOME});
    }
    else if(step === STEP_WELCOME){
      const amount = BigNumber(this.props.stream.stake).times(BigNumber(10).pow(18)).toString(); //server needs amount in wei, so stake * 10^18
      this.props.mintTokens(amount);
      this.setState({step:STEP_MINTING});
    }
    else if (step === STEP_MINTING){
      //this.props.purchaseAccess(this.props.stream,this.state.purchaseEndTime);
      this.setState({step:STEP_ENLISTING});
    }
    else if(step === STEP_ENLISTING)
      this.setState({step:STEP_SUCCESS});
    else if(step === STEP_SUCCESS){
      Mixpanel.track("Finished enlisting stream");
      this.props.hideEventHandler();
    }
  }

  render(){
    return(
      <DialogContainer
        id="staking-explainer"
        visible={this.props.visible}
        onHide={this.props.hideEventHandler}
        focusOnMount={false}
        dialogStyle={{width:"500px",position:"relative",top:"33%"}}
        aria-labelledby="Add stream"
        modal={true}
      >
        <div style={{display:(this.state.step === STEP_INTRO)?'block':'none'}}>
          <h1>Enlisting your stream: {this.props.stream.name}</h1>
          <p>
            To enlist a stream, you need DTX tokens to stake. As DataBroker DAO is currently in beta, we will provide you with free demo tokens.
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
        <div style={{display:(this.state.step === STEP_MINTING)?'block':'none'}}>
          <h1>Minting free DTX tokens for you</h1>
          <p>During the beta of DataBroker DAO DTX tokens are free.</p>
          <div style={{display:"flex", justifyContent:"flex-end",width:"100%"}}>
            <Button flat primary swapTheming onClick={event => this.finishStep(STEP_MINTING)} disabled={this.props.mintingTokens} className={this.props.mintingTokens?'disabled-button':''} >Continue</Button>
          </div>
        </div>
        <div style={{display:(this.state.step === STEP_ENLISTING)?'block':'none'}}>
          <h1>Saving your stream to the blockchain</h1>
          <p>
            It takes a while to save to the blockchain due to blocks that have to be mined before your transaction can be confirmed.
          </p>
          <div style={{display:"flex", justifyContent:"flex-end",width:"100%"}}>
            <Button flat primary swapTheming onClick={event => this.finishStep(STEP_ENLISTING)} disabled={this.props.purchasingAccess} className={this.props.purchasingAccess?'disabled-button':''} >Continue</Button>
          </div>
        </div>
        <div style={{display:(this.state.step === STEP_SUCCESS)?'block':'none'}}>
          <h1>Stream successfully added</h1>
          <p>
            Congratulations! From now on, people are able to purchase your stream data.
          </p>
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
  mintingTokens: state.wallet.mintingTokens
});

function mapDispatchToProps(dispatch) {
  return {
    register: (values, settings) => dispatch(register(values, settings)),
    mintTokens: (amount) => dispatch(WALLET_ACTIONS.mintTokens(amount))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddStreamConfirmationDialog);
