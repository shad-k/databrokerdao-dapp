import React, { Component } from 'react';
import styled from 'styled-components';

export default class ToolbarSpacer extends Component {
  render(){
    const StyledToolbarSpacer = styled.div`
      height:100px;

      @media (max-width: ${props => props.theme.mobileBreakpoint}) {
        height: 86px;
      }
    `;

    return(
      <StyledToolbarSpacer/>
    );
  }
}
