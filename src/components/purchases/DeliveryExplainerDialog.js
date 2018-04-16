import React, { Component } from 'react';
import { DialogContainer, Button } from 'react-md';

import DeliveryScreenshot from '../../assets/delivery-screenshot.jpg';

export default class DeliveryExplainerDialog extends Component {
  render(){
    return(
      <DialogContainer
        id="delivery-explainer"
        visible={this.props.visible}
        onHide={this.props.hideEventHandler}
        focusOnMount={false}
        dialogStyle={{width:"560px",position:"relative",top:"160px",padding:"20px 20px 12px 20px",transform:"translate3d(-50%,0,0)",WebkitTransform:"translate3d(-50%,0,0)"}}
        aria-labelledby="Stream readings delivery"
      >
        <img src={DeliveryScreenshot} style={{width:"472px"}} alt="Delivery Screenshot" />
        <h1>Stream readings delivery</h1>
        <p>The readings of each purchased stream will be delivered via emails with a CSV file attached.</p>
        <Button flat primary swapTheming onClick={event => this.props.hideEventHandler()} style={{marginTop:"14px", float:"right"}}>Got it</Button>
      </DialogContainer>
    );
  }
}
