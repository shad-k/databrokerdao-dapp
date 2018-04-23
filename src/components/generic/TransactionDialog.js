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
        color: ${props => props.theme.dbdaoPink};
      }

      &:last-child{
        margin:0;
      }

      @media (max-width: ${props => props.theme.mobileBreakpoint}) {
        font-size: 11px;
        margin-right: 14px;
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
    let DialogStyle = {};
    if(window.innerWidth > 480)
      DialogStyle = {width:"calc(100% - 20px)", maxWidth:"780px", position:"relative",top:"160px",padding:"44px 44px 36px 44px",transform:"translate3d(-50%,0,0)",WebkitTransform:"translate3d(-50%,0,0)"};
    else
      DialogStyle = {width:"calc(100% - 20px)", maxWidth:"780px", position:"relative",top:"100px",padding:"18px 18px 10px 18px",transform:"translate3d(-50%,0,0)",WebkitTransform:"translate3d(-50%,0,0)"};

    const StyledStepsContainer = styled.div`
      display: flex;
      justify-content: center;
      margin-bottom: 48px;

      @media (max-width: ${props => props.theme.mobileBreakpoint}) {
        margin-bottom: 30px;
      }
    `;

    const StyledButtonContainer = styled.div`
      margin-top: 60px;
      display: flex;
      justify-content:flex-end;
      align-items:center;
      overflow: hidden;

      @media (max-width: ${props => props.theme.mobileBreakpoint}) {
        margin-top: 30px;
      }
    `;

    const StyledCircularProgress = styled(CircularProgress)`
      margin: 0 24px 0 0;
    `;

    return(
      <DialogContainer
        id="transaction-dialog"
        visible={this.props.visible}
        onHide={this.props.onHide}
        dialogStyle={DialogStyle}
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
