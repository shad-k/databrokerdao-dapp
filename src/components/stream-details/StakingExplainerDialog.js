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
        modal
        actions={actions}
        focusOnMount={false}
        dialogStyle={{width:"500px"}}
      >
        <h1>About staking</h1>
        <p>
          Hello and welcome everyone to the explaination about the staking. We are currently waiting for our teacher so please stay here and do not go away. OK?
        </p>
      </DialogContainer>
    );
  }
}
