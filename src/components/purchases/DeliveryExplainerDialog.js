import React, { Component } from 'react';
import { DialogContainer, Button } from 'react-md';
import styled from 'styled-components';

import DeliveryScreenshot from '../../assets/delivery-screenshot.jpg';

export default class DeliveryExplainerDialog extends Component {
  render(){
    let DialogStyle = {};
    if(window.innerWidth > 480)
      DialogStyle = {width:"calc(100% - 20px)",maxWidth:"560px",position:"relative",top:"160px",padding:"20px 20px 12px 20px",transform:"translate3d(-50%,0,0)",WebkitTransform:"translate3d(-50%,0,0)"};
    else
      DialogStyle = {width:"calc(100% - 20px)",maxWidth:"500px",position:"relative",top:"100px",padding:"8px 8px 0px 8px",transform:"translate3d(-50%,0,0)",WebkitTransform:"translate3d(-50%,0,0)"};

    const StyledImage = styled.img`
      width:100%;
      max-width:472px;
    `;

    return(
      <DialogContainer
        id="delivery-explainer"
        visible={this.props.visible}
        onHide={this.props.hideEventHandler}
        focusOnMount={false}
        dialogStyle={DialogStyle}
        aria-labelledby="Stream readings delivery"
      >
        <StyledImage src={DeliveryScreenshot} alt="Delivery Screenshot" />
        <h1>Stream readings delivery</h1>
        <p>The readings of each purchased stream will be delivered via emails with a CSV file attached.</p>
        <Button flat primary swapTheming onClick={event => this.props.hideEventHandler()} style={{marginTop:"14px", float:"right"}}>Got it</Button>
      </DialogContainer>
    );
  }
}
