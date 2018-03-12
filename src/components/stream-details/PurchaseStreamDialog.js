import React, { Component } from 'react';
import { Button, DialogContainer } from 'react-md';
import { connect } from 'react-redux';
import Mixpanel from 'mixpanel-browser';

import RegisterForm from '../authentication/RegisterForm';
import { register } from '../../redux/authentication/reducer';

const STEP_INTRO = 1,
  STEP_REGISTRATION = 2,
  STEP_WELCOME = 3,
  STEP_CONFIG = 4,
  STEP_SAVING = 5,
  STEP_SUCCESS = 6;

class PurchaseStreamDialog extends Component {
  constructor(props){
    super(props);

    this.state = {
      step: STEP_INTRO
    };
  }

  finishStep(step){
    if(step === STEP_INTRO){
        if(!this.props.token)
          this.setState({step:STEP_REGISTRATION});
        else
          this.setState({step:STEP_WELCOME});
    }
    else if(step === STEP_REGISTRATION){
      Mixpanel.track("Finish registration for purchase");
      this.setState({step:STEP_WELCOME});
    }
    else if(step === STEP_WELCOME){
      this.props.hideEventHandler();
      //this.setState({step:STEP_CONFIG});
    }
    else if(step === STEP_CONFIG)
      this.setState({step:STEP_SAVING});
    else if(step === STEP_SAVING)
      this.setState({step:STEP_SUCCESS});
    else if(step === STEP_SUCCESS){
      Mixpanel.track("Finished purchase stream");
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
        aria-labelledby="Purchae stream"
      >
        <div style={{display:(this.state.step === STEP_INTRO)?'block':'none'}}>
          <h1>Purchase access to {this.props.stream.name}</h1>
          <p>
            Purchases are made using DTX tokens. As DataBroker DAO is currently in beta, we will provide you with free demo tokens.
          </p>
          <p>
            After your purchase, the readings of this stream will be delivered to an endpoint of your choice, such as a Google Sheet.
          </p>
          <div style={{display:"flex", justifyContent:"flex-end",width:"100%"}}>
            <Button flat secondary swapTheming onClick={event => this.finishStep(STEP_INTRO)}>Continue</Button>
          </div>
        </div>
        <div style={{display:(this.state.step === STEP_REGISTRATION)?'block':'none'}}>
          <h1>Registration</h1>
          <RegisterForm
            register={(values, settings) => this.props.dispatch(register(values, settings))}
            callBack={() => {this.finishStep(STEP_REGISTRATION)}}
          />
        </div>
        <div style={{display:(this.state.step === STEP_WELCOME)?'block':'none'}}>
          <h1>Welcome to DataBroker DAO</h1>
          <p>
            To get you started, we will provide you with free demo DTX tokens.
          </p>
          <p>
            Purchasing stream access is not yet unavailable in this public beta. We will let you know when it is!
          </p>
          <div style={{display:"flex", justifyContent:"flex-end",width:"100%"}}>
            <Button flat secondary swapTheming onClick={event => this.finishStep(STEP_WELCOME)}>Continue</Button>
          </div>
        </div>
        <div style={{display:(this.state.step === STEP_CONFIG)?'block':'none'}}>
          <h1>Purchase details</h1>
          <p>
            In an upcoming update of DataBroker DAO, you will be able to:
          </p>
          <ul>
            <li>Choose the timeframe of your access to this stream</li>
            <li>Set up a delivery endpoint, such as a Google Spreadsheet</li>
          </ul>
          <div style={{display:"flex", justifyContent:"flex-end",width:"100%"}}>
            <Button flat secondary swapTheming onClick={event => this.finishStep(STEP_CONFIG)}>Continue</Button>
          </div>
        </div>
        <div style={{display:(this.state.step === STEP_SAVING)?'block':'none'}}>
          <h1>Saving to the blockchain</h1>
          <p>
            It takes a while to save your purchase to the blockchain as your transactions needs to be confirmed by different nodes mining.
          </p>
          <div style={{display:"flex", justifyContent:"flex-end",width:"100%"}}>
            <Button flat secondary swapTheming onClick={event => this.finishStep(STEP_SAVING)}>Continue</Button>
          </div>
        </div>
        <div style={{display:(this.state.step === STEP_SUCCESS)?'block':'none'}}>
          <h1>Purchase successful</h1>
          <p>
            Congratulations! You will soon be able to receive readings of this stream.
          </p>
          <div style={{display:"flex", justifyContent:"flex-end",width:"100%"}}>
            <Button flat secondary swapTheming onClick={event => this.finishStep(STEP_SUCCESS)}>Continue</Button>
          </div>
        </div>
      </DialogContainer>
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseStreamDialog);
