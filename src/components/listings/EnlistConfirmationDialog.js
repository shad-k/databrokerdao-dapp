import React, { Component } from 'react';
import { Button, DialogContainer, Checkbox, CircularProgress } from 'react-md';
import { connect } from 'react-redux';
import Mixpanel from 'mixpanel-browser';
import moment from 'moment';
import { BigNumber } from 'bignumber.js';
import styled from 'styled-components';

import RegisterForm from '../authentication/RegisterForm';
import { register } from '../../redux/authentication/reducer';
import { WALLET_ACTIONS } from '../../redux/wallet/actions';
import { LISTING_ACTIONS } from '../../redux/listings/actions';

const STEP_INTRO = 1,
  STEP_REGISTRATION = 2,
  STEP_MINTING = 3,
  STEP_ENLISTING = 4,
  STEP_SUCCESS = 5;

class EnlistConfirmationDialog extends Component {
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
      const amount = BigNumber(this.props.stream.stake).times(BigNumber(10).pow(18)).toString(); //server needs amount in wei, so stake * 10^18
      this.props.mintTokens(amount);
      this.setState({step:STEP_MINTING});
    }
    else if (step === STEP_MINTING){
      this.props.enlistStream(this.props.stream);
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
      margin: 4px 0 0 0;
    `;

    return(
      <DialogContainer
        id="staking-explainer"
        visible={this.props.visible}
        onHide={this.props.hideEventHandler}
        focusOnMount={false}
        dialogStyle={{width:"560px",position:"relative",top:"33%",padding:"4px 10px 4px 10px"}}
        aria-labelledby="Add stream"
        modal={true}
      >
        <div style={{display:(this.state.step === STEP_INTRO)?'block':'none'}}>
          <h1>Confirm enlisting</h1>
          <p>
            To enlist a stream, you need DTX tokens to stake. As DataBroker DAO is currently in beta, we will provide you with free demo tokens.
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
        <div style={{display:(this.state.step === STEP_MINTING)?'block':'none'}}>
          <h1>Minting free DTX tokens</h1>
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
        <div style={{display:(this.state.step === STEP_ENLISTING)?'block':'none'}}>
          <h1>Saving to the blockchain</h1>
          <p>
            It takes a while to save to the blockchain due to blocks that have to be mined before your transaction can be confirmed.
          </p>
          <StyledButtonContainer>
            {this.props.enlistingStream && (
              <StyledButtonColumnLeft>
                <StyledCircularProgress
                  centered={false}
                  id="enlisting-in-progress"
                />
              </StyledButtonColumnLeft>
            )}
            <StyledButtonColumnRight>
              <Button flat primary swapTheming onClick={event => this.finishStep(STEP_ENLISTING)} disabled={this.props.enlistingStream} className={this.props.enlistingStream?'disabled-button':''} >Continue</Button>
            </StyledButtonColumnRight>
          </StyledButtonContainer>
        </div>
        <div style={{display:(this.state.step === STEP_SUCCESS)?'block':'none'}}>
          <h1>Stream successfully enlisted</h1>
          <p>
            From now on, people are able to purchase your stream data.
          </p>
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
  enlistingStream: state.listings.enlistingStream
});

function mapDispatchToProps(dispatch) {
  return {
    register: (values, settings) => dispatch(register(values, settings)),
    mintTokens: (amount) => dispatch(WALLET_ACTIONS.mintTokens(amount)),
    enlistStream: (stream) => dispatch(LISTING_ACTIONS.enlistStream(stream))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EnlistConfirmationDialog);
