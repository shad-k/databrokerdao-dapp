import React, { Component } from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';

import DiscoverIcon from '../../assets/discover-icon.svg';
import PurchasesIcon from '../../assets/purchases-icon.svg';
import ListingsIcon from '../../assets/listings-icon.svg';

export default withRouter(class Tabs extends Component {
  render() {
    const StyledTabBarContainer = styled.div`
      width: 100%;
      max-width: 530px;
      display: flex;
      justify-content: space-between;
    `;

    const StyledTabBarItem = styled(Link)`
      margin-right: 46px;
      color: white;
      font-weight: 600;
      font-family: 'Titillium Web', sans-serif;
      text-decoration: none;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      opacity:0.7;
      transition: all 0.5s ease;
      &:hover{
        opacity: 0.9;
      }
      &:last-child {
        margin-right:0;
      }
      &.active, &.active:hover{
        opacity:1;
      }
    `;

    const StyledTabBarItemIcon = styled.img`
      width: 28px;
      height: 28px;
      margin-right: 12px;
      padding-top: 2px;
    `;

    const StyledTabBarItemContent = styled.div`
      text-transform: uppercase;
      font-size: 22px;
    `;

    return(
      <StyledTabBarContainer>
        <StyledTabBarItem to="/discover" className={this.props.location.pathname === '/discover'?'active':''}>
          <StyledTabBarItemIcon src={DiscoverIcon} alt="Discover" />
          <StyledTabBarItemContent>
            Discover
          </StyledTabBarItemContent>
        </StyledTabBarItem>
        <StyledTabBarItem to="/purchases" className={this.props.location.pathname === '/purchases'?'active':''}>
          <StyledTabBarItemIcon src={PurchasesIcon} alt="Purchases" />
          <StyledTabBarItemContent>
            Purchases
          </StyledTabBarItemContent>
        </StyledTabBarItem>
        <StyledTabBarItem to="/listings" className={this.props.location.pathname === '/listings'?'active':''}>
          <StyledTabBarItemIcon src={ListingsIcon} alt="Add stream" />
          <StyledTabBarItemContent>
            Listings
          </StyledTabBarItemContent>
        </StyledTabBarItem>
      </StyledTabBarContainer>
    );
  }
})
