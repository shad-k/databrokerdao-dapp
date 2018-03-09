import React, { Component } from 'react';
import { Button, FontIcon, DialogContainer } from 'react-md';

export default class StakingExplainerDialog extends Component {
  render(){
    const { visible } = this.props.visible;
    const actions = [{
      onClick: this.props.hideEventHandler,
      primary: true,
      children: 'Got it',
    }];

    return(
      <DialogContainer
        id="staking-explainer"
        visible={this.props.visible}
        onHide={this.props.hideEventHandler}
        actions={actions}
        focusOnMount={false}
        dialogStyle={{width:"500px",position:"relative",top:"33%"}}
        aria-labelledby="About staking"
      >
        <h1>About staking</h1>
        <p>To list a stream on DataBroker DAO, the owner has to stake (to stake means commit/sent/lockup in this context) a certain amount of DTX tokens. These tokens are locked as a guarantee for good behavior by the data seller.</p>
        <p>A data buyer that is unhappy with the quality of data can challenge an entry in the registry by staking some DTX tokens. This challenge will be represented in the UI to all potential buyers as a negative reputation score.</p>
        <p>Upon reaching a certain threshold of challenges, a check of the data provider will be performed by a DataBroker DAO administrator. Upon finding issues with the advertised data, it’s stake is distributed equally over all challengers and the DataBroker DAO platform wallet. The entry is removed from the registry. If it is deemed that the data is sound, the staked tokens by the challengers get distributed to the data seller and the platform.</p>
      </DialogContainer>
    );
  }
}
