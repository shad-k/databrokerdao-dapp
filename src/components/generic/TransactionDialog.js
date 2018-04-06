import React, { Component } from 'react';
import { Button, DialogContainer, CircularProgress } from 'react-md';
import styled from 'styled-components';
import _ from 'lodash';

export default class TransactionDialog extends Component {
  constructor(props){
    super(props);

    //Outside render() function to allow input fields inside (https://labs.chiedo.com/blog/always-define-components-outside-react-render-method)
    this.StyledContentContainer = styled.div`
      h1 {
        text-align: center;
        margin-bottom: 24px;
      }

      p {
        text-align:center;
        padding: 0 5%;
        line-height: 1.7;
        font-size:15px;
      }
    `;
  }


  renderSteps(){
    const StyledStep = styled.div`
      color: #B6B6B6;
      text-transform: uppercase;
      margin-right:24px;
      font-size: 13px;
      font-weight:500;

      &.active{
        color: #ee274c;
      }

      &:last-child{
        margin:0;
      }
    `;

    const steps = _.map(this.props.steps, (step) => {
      return (
        <StyledStep className={(step.id === this.props.stepIndex)?"active":""} key={step.id}>
          {step.description}
        </StyledStep>
      );
    });

    return steps;
  }

  render(){
    const dialogStyle = {width:"780px",position:"relative",top:"160px",padding:"20px 20px 12px 20px",transform:"translate3d(-50%,0,0)",WebkitTransform:"translate3d(-50%,0,0)"};

    const StyledStepsContainer = styled.div`
      display: flex;
      justify-content: center;
      margin-bottom: 48px;
    `;

    const StyledButtonContainer = styled.div`
      margin-top: 60px;
      display: flex;
      justify-content:flex-end;
      align-items:center;
    `;

    const StyledCircularProgress = styled(CircularProgress)`
      margin: 0 24px 0 0;
    `;

    return(
      <DialogContainer
        id="transaction-dialog"
        visible={this.props.visible}
        onHide={this.props.onHide}
        dialogStyle={dialogStyle}
        aria-labelledby="Transaction dialog"
        modal={this.props.modal}
      >
        <StyledStepsContainer>
          {this.renderSteps()}
        </StyledStepsContainer>
        <this.StyledContentContainer>
          {this.props.children}
        </this.StyledContentContainer>
        {(this.props.showContinueButton) && (
          <StyledButtonContainer>
            {(this.props.loading) && (
                <StyledCircularProgress
                  centered={false}
                  id="transaction-in-progress"
                />
            )}
            <Button flat primary disabled={this.props.loading} className={this.props.loading?"disabled-button":""} swapTheming onClick={event => this.props.nextStepHandler(this.props.stepIndex)}>Continue</Button>
          </StyledButtonContainer>
        )}
      </DialogContainer>
    );
  }
}
