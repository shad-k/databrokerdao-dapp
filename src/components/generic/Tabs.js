import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import DiscoverIcon from '../../assets/discover-icon.svg';
import PurchasesIcon from '../../assets/purchases-icon.svg';
import AddSensorIcon from '../../assets/add-sensor-icon.svg';

export default class Tabs extends Component {
  render() {
    const StyledTabBarContainer = styled.div`
      width: 100%;
      max-width: 630px;
      display: flex;
      justify-content: space-between;
    `;

    const StyledTabBarItem = styled(Link)`
      margin-right: 46px;
      color: white;
      font-weight: 700;
      text-decoration: none;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      &:last-child {
        margin-right:0;
      }
    `;

    const StyledTabBarItemIcon = styled.img`
      width: 34px;
      height: 34px;
      margin-right: 12px;
      padding-top: 2px;
    `;

    const StyledTabBarItemContent = styled.div`
      text-transform: uppercase;
      font-size: 18px;
    `;

    return(
      <StyledTabBarContainer>
        <StyledTabBarItem to="/discover">
          <StyledTabBarItemIcon src={DiscoverIcon} alt="Discover" />
          <StyledTabBarItemContent>
            Discover
          </StyledTabBarItemContent>
        </StyledTabBarItem>
        <StyledTabBarItem to="/purchases">
          <StyledTabBarItemIcon src={PurchasesIcon} alt="Purchases" />
          <StyledTabBarItemContent>
            Purchased streams
          </StyledTabBarItemContent>
        </StyledTabBarItem>
        <StyledTabBarItem to="/add-sensor">
          <StyledTabBarItemIcon src={AddSensorIcon} alt="Add sensor" />
          <StyledTabBarItemContent>
            Add sensor
          </StyledTabBarItemContent>
        </StyledTabBarItem>
      </StyledTabBarContainer>
    );
  }
}
