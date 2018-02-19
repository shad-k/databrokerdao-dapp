import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default class Tabs extends Component {
  render() {
    const StyledTabBarItem = styled(Link)`
      float: left;
      margin-right: 20px;
      color: white;
      font-weight: 800;
    `;

    return(
      <div>
        <StyledTabBarItem to="/discover">
          Discover
        </StyledTabBarItem>
        <StyledTabBarItem to="/purchases">
          Purchased streams
        </StyledTabBarItem>
        <StyledTabBarItem to="/add-sensor">
          Add sensor
        </StyledTabBarItem>
        <StyledTabBarItem to="/wallet">
          Wallet
        </StyledTabBarItem>
      </div>
    );
  }
}
