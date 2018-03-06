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
        title="How staking works"
        onHide={this.props.hideEventHandler}
        modal
        actions={actions}
        focusOnMount={false}
      >
        <p className="md-color--secondary-text">
          Hello and welcome everyone to the explaination about the staking. We are currently waiting for our teacher so please stay here and do not go away. OK?
        </p>
      </DialogContainer>
    );
  }
}
