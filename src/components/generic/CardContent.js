import React, { Component } from 'react';
import styled from 'styled-components';

export default class CardContent extends Component {
  render() {
    const StyledContent = styled.div`
      padding: 30px;
      ${this.props.noMarginBottom?'padding-bottom: 0;':''}

      @media (max-width: ${props => props.theme.mobileBreakpoint}) {
        padding: 12px 16px;
      }
    `;

    return(
      <StyledContent style={this.props.style}>
        {this.props.children}
      </StyledContent>
    );
  }
}
