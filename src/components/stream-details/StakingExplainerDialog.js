import React, { Component } from 'react';
import { DialogContainer, Button } from 'react-md';

export default class StakingExplainerDialog extends Component {
  render(){
    return(
      <DialogContainer
        id="staking-explainer"
        visible={this.props.visible}
        onHide={this.props.hideEventHandler}
        focusOnMount={false}
        dialogStyle={{width:"560px",position:"relative",top:"40%",padding:"4px 10px 4px 10px"}}
        aria-labelledby="About staking"
      >
        <h1>About staking</h1>
        <p>To list a stream on DataBroker DAO, the owner has to stake (to stake means commit/sent/lockup in this context) a certain amount of DTX tokens. These tokens are locked as a guarantee for good behavior by the data seller.</p>
        <p>A data buyer that is unhappy with the quality of data can challenge an entry in the registry by staking some DTX tokens. This challenge will be represented in the UI to all potential buyers as a negative reputation score.</p>
        <p>Upon reaching a certain threshold of challenges, a check of the data provider will be performed by a DataBroker DAO administrator. Upon finding issues with the advertised data, it’s stake is distributed equally over all challengers and the DataBroker DAO platform wallet. The entry is removed from the registry. If it is deemed that the data is sound, the staked tokens by the challengers get distributed to the data seller and the platform.</p>
        <Button flat primary swapTheming onClick={event => this.props.hideEventHandler()} style={{marginTop:"14px", float:"right"}}>Got it</Button>
      </DialogContainer>
    );
  }
}
