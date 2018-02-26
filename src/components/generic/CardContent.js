import React, { Component } from 'react';
import styled from 'styled-components';

export default class CardContent extends Component {
  render() {
    const StyledContent = styled.div`
      padding: 30px;
      ${this.props.noMarginBottom?'padding-bottom: 0;':''}
    `;

    return(
      <StyledContent style={this.props.style}>
        {this.props.children}
      </StyledContent>
    );
  }
}
