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
    if(step == STEP_INTRO){
        if(!this.props.token)
          this.setState({step:STEP_REGISTRATION});
        else
          this.setState({step:STEP_CONFIG});
    }
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
        dialogStyle={{width:"500px",position:"relative",top:"33%"}}
        aria-labelledby="Purchae stream"
      >
        <div style={{display:(this.state.step == STEP_INTRO)?'block':'none'}}>
          <h1>Purchase access</h1>
          <p>
            This is how it works: you pay DTX tokens and then we give you the stream data. Deal?
          </p>
          <p>
            Maybe a cool visual or something could be cool too.
          </p>
          <div style={{display:"flex", justifyContent:"flex-end",width:"100%"}}>
            <Button flat secondary swapTheming onClick={event => this.finishStep(STEP_INTRO)}>Continue</Button>
          </div>
        </div>
        <div style={{display:(this.state.step == STEP_REGISTRATION)?'block':'none'}}>
          <h1>Registration</h1>
          <RegisterForm
            register={(values, settings) => this.props.dispatch(register(values, settings))}
            callBack={() => {this.finishStep(STEP_REGISTRATION)}}
          />
        </div>
        <div style={{display:(this.state.step == STEP_WELCOME)?'block':'none'}}>
          <h1>Welcome to DataBroker DAO</h1>
          <p>
            To get you started, we have provided you with 100 free DTX tokens.
          </p>
          <div style={{display:"flex", justifyContent:"flex-end",width:"100%"}}>
            <Button flat secondary swapTheming onClick={event => this.finishStep(STEP_WELCOME)}>Continue</Button>
          </div>
        </div>
        <div style={{display:(this.state.step == STEP_CONFIG)?'block':'none'}}>
          <h1>Stream access configuration</h1>
          <p>
            In this step, you will soon be able to choose for how long you want to purchase stream data and where the stream data will be delivered.
          </p>
          <div style={{display:"flex", justifyContent:"flex-end",width:"100%"}}>
            <Button flat secondary swapTheming onClick={event => this.finishStep(STEP_CONFIG)}>Continue</Button>
          </div>
        </div>
        <div style={{display:(this.state.step == STEP_SAVING)?'block':'none'}}>
          <h1>Saving to the blockchain</h1>
          <p>
            It takes a while to save to the blockchain. Don''t go away!
          </p>
        </div>
        <div style={{display:(this.state.step == STEP_SUCCESS)?'block':'none'}}>
          <h1>Purchase successful</h1>
          <p>
            Congratulations! The readings of this sensor will be delivered to your Google Spreadsheet.
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
