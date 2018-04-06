import React, { Component } from 'react';
import { Button, DatePicker, Checkbox, TextField } from 'react-md';
import { connect } from 'react-redux';
import Mixpanel from 'mixpanel-browser';
import { BigNumber } from 'bignumber.js';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faQuestionCircle from '@fortawesome/fontawesome-free-regular/faQuestionCircle';

import TransactionDialog from '../generic/TransactionDialog';
import { WALLET_ACTIONS } from '../../redux/wallet/actions';
import EnhancedTextField from '../generic/EnhancedTextField';
import { STREAMS_ACTIONS } from '../../redux/streams/actions';

const STEP_INTRO = 0,
  STEP_STAKE = 1,
  STEP_MINTING = 2,
  STEP_CHALLENGING = 3,
  STEP_SUCCESS = 4;

class ChallengeStreamDialog extends Component {
  constructor(props){
    super(props);

    const steps = [{id:STEP_INTRO,description:"Intro"},{id:STEP_STAKE,description:"Stake"},{id:STEP_MINTING,description:"Mint"},{id:STEP_CHALLENGING,description:"Challenge"},{id:STEP_SUCCESS,description:"Success"}];

    this.state = {
      steps: steps,
      stepIndex: STEP_INTRO,
      modal: false,
      stakeAmount: "",
      stakeError: null
    };
  }

  finishStep(step){
    if(step === STEP_INTRO){
      this.setState({stepIndex:STEP_STAKE});
    }
    else if(step === STEP_STAKE){
      if(parseInt(this.state.stakeAmount) > 0){
        const amount = BigNumber(parseInt(this.state.stakeAmount)).times(BigNumber(10).pow(18)).toString();
        this.props.mintTokens(amount);
        this.setState({stepIndex:STEP_MINTING,modal:true});
      }
      else
        this.setState({stakeError:"Stake amount must be a positive number"});
    }
    else if (step === STEP_MINTING){
      const amount = BigNumber(parseInt(this.state.stakeAmount)).times(BigNumber(10).pow(18)).toString();
      this.props.challengeStream(this.props.stream,amount);
      this.setState({stepIndex:STEP_CHALLENGING});
    }
    else if(step === STEP_CHALLENGING)
      this.setState({stepIndex:STEP_SUCCESS});
    else if(step === STEP_SUCCESS){
      Mixpanel.track("Finished challenging stream");
      this.props.hideEventHandler();
    }
  }

  stakeAmountChanged(event){
    this.setState({stakeAmount:event.value});
  }

  render(){
    const loading = this.props.mintingTokens || this.props.challengingStream;

    return(
      <TransactionDialog
        visible={this.props.visible}
        onHide={this.props.hideEventHandler}
        modal={this.state.modal}
        steps={this.state.steps}
        stepIndex={this.state.stepIndex}
        nextStepHandler={(step) => {this.finishStep(step)}}
        loading={loading}
        showContinueButton={true}
      >
        <div style={{display:(this.state.stepIndex === STEP_INTRO)?'block':'none'}}>
          <h1>Challenge stream quality</h1>
          <p>If you are unhappy with the quality of data of this stream, you can challenge it by staking some DTX tokens.</p>
          <p>Upon reaching a certain threshold of challenges, a check of the data provider will be performed by a DataBroker DAO administrator. <span className="clickable" onClick={this.props.toggleStakingExplainer}><FontAwesomeIcon icon={faQuestionCircle} color="rgba(0,0,0,0.6)" /></span></p>
        </div>
        {this.state.stepIndex === STEP_STAKE &&
          <div style={{padding:"0 15%"}}>
            <h1>Define stake</h1>
            <TextField
              id="stake"
              fieldname="stake"
              label="Number of DTX to stake"
              className="md-cell md-cell--bottom"
              value={this.state.stakeAmount}
              onChange={(value) => this.setState({stakeAmount: value})}
              style={{width:"100%"}}
              error={this.state.stakeError !== null}
              errorText={this.state.stakeError}
            />
          </div>
        }
        <div style={{display:(this.state.stepIndex === STEP_MINTING)?'block':'none'}}>
          <h1>Minting DTX tokens</h1>
          <p>During the beta of DataBroker DAO DTX tokens are free.</p>
        </div>
        <div style={{display:(this.state.stepIndex === STEP_CHALLENGING)?'block':'none'}}>
          <h1>Saving to the blockchain</h1>
          <p>
            It takes a while to save your challenge to the blockchain due to blocks that have to be mined before your transaction can be confirmed.
          </p>
        </div>
        <div style={{display:(this.state.stepIndex === STEP_SUCCESS)?'block':'none'}}>
          <h1>Challenge successful</h1>
          <p>
            Upon reaching a certain threshold of challenges, a check of the data provider will be performed by a DataBroker DAO administrator <span className="clickable" onClick={this.props.toggleStakingExplainer}><FontAwesomeIcon icon={faQuestionCircle} color="rgba(0,0,0,0.6)"/></span>.
          </p>
        </div>
      </TransactionDialog>
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
  mintingTokens: state.wallet.mintingTokens,
  challengingStream: state.streams.challengingStream
});

function mapDispatchToProps(dispatch) {
  return {
    mintTokens: (amount) => dispatch(WALLET_ACTIONS.mintTokens(amount)),
    challengeStream: (stream,amount) => dispatch(STREAMS_ACTIONS.challengeStream(stream,amount))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeStreamDialog);
