import React, { Component } from 'react';
import { Button, FontIcon, DialogContainer } from 'react-md';
import { connect } from 'react-redux';

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
    if(step == STEP_INTRO)
      this.setState({step:STEP_REGISTRATION});
    else if(step == STEP_REGISTRATION)
      this.setState({step:STEP_WELCOME});
    else if(step == STEP_WELCOME)
        this.setState({step:STEP_CONFIG});
    else if(step == STEP_CONFIG)
      this.setState({step:STEP_SAVING});
    else if(step == STEP_SAVING)
      this.setState({step:STEP_SUCCESS});
    else if(step == STEP_SUCCESS)
      this.props.hideEventHandler();
  }

  render(){
    const { visible } = this.props.visible;

    return(
      <DialogContainer
        id="staking-explainer"
        visible={this.props.visible}
        onHide={this.props.hideEventHandler}
        focusOnMount={false}
        dialogStyle={{width:"500px"}}
      >
        <div style={{display:(this.state.step == STEP_INTRO)?'block':'none'}}>
          <h1>How to purchase access</h1>
          <p>
            Some explainer about DTX and other great things about how Databroker works.
          </p>
          <p>
            Maybe a cool visual or something could be cool too.
          </p>
          <div style={{display:"flex", justifyContent:"flex-end",width:"100%"}}>
            <Button raised primary onClick={event => this.finishStep(STEP_INTRO)}>Continue</Button>
          </div>
        </div>
        <div style={{display:(this.state.step == STEP_REGISTRATION)?'block':'none'}}>
          <RegisterForm
            register={(values, settings) => this.props.dispatch(register(values, settings))}
            callBack={() => {this.finishStep(STEP_REGISTRATION)}}
          />
        </div>
        <div style={{display:(this.state.step == STEP_WELCOME)?'block':'none'}}>
          <h1>Welcome new user!</h1>
          <p>
            So happy to see you amigo.
          </p>
          <div style={{display:"flex", justifyContent:"flex-end",width:"100%"}}>
            <Button raised primary onClick={event => this.finishStep(STEP_WELCOME)}>Continue</Button>
          </div>
        </div>
        <div style={{display:(this.state.step == STEP_CONFIG)?'block':'none'}}>
          <h1>Choose duration and delivery method</h1>
          <p>
            Choose how long you want to get the stream data and also where our delivery guy has to put the stream data.
          </p>
          <div style={{display:"flex", justifyContent:"flex-end",width:"100%"}}>
            <Button raised primary onClick={event => this.finishStep(STEP_CONFIG)}>Continue</Button>
          </div>
        </div>
        <div style={{display:(this.state.step == STEP_SAVING)?'block':'none'}}>
          <h1>Saving to the blockchain</h1>
          <p>
            Choose how long you want to get the stream data and also where our delivery guy has to put the stream data.
          </p>
          <div style={{display:"flex", justifyContent:"flex-end",width:"100%"}}>
            <Button raised primary onClick={event => this.finishStep(STEP_SAVING)}>Continue</Button>
          </div>
        </div>
        <div style={{display:(this.state.step == STEP_SUCCESS)?'block':'none'}}>
          <h1>Great success!</h1>
          <p>
            Choose how long you want to get the stream data and also where our delivery guy has to put the stream data.
          </p>
          <div style={{display:"flex", justifyContent:"flex-end",width:"100%"}}>
            <Button raised primary onClick={event => this.finishStep(STEP_SUCCESS)}>Continue</Button>
          </div>
        </div>
      </DialogContainer>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(null, mapDispatchToProps)(PurchaseStreamDialog);
