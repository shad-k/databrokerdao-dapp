import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default class LandingBackground extends Component {
  render() {
    const StyledBackgroundDiv = styled.div`
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      background-color: rgb(100,180,190);
    `;

    return (
      <StyledBackgroundDiv>
      </StyledBackgroundDiv>
    );
  }
}
