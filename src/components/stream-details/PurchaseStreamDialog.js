import React, { Component } from 'react';
import { Button, FontIcon, DialogContainer } from 'react-md';

export default class PurchaseStreamDialog extends Component {
  hide = () => {
    this.setState({ visible: false });
  };

  render(){
    const { visible } = this.props.visible;

    return(
      <DialogContainer
        id="staking-explainer"
        visible={this.props.visible}
        onHide={this.props.hideEventHandler}
        focusOnMount={false}
        dialogStyle={{width:"540px", height:"540px"}}
      >
        <h1>Buy access and improve your life</h1>
        <p className="md-color--secondary-text">
          Thanks you very much for your purchase!!11!!
        </p>
      </DialogContainer>
    );
  }
}
