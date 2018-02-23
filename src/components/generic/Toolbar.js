import React, { Component } from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types'
import { Link } from 'react-router-dom';

import Logo from '../../assets/databroker-logo-white.svg';
import Tabs from './Tabs.js';

export default class Toolbar extends Component {
  static propTypes = {
    showTabs: propTypes.bool
  }

  render() {
    const StyledToolbar = styled.div`
      background: linear-gradient(to right,#EE274C 10%, #2E3192 100%);
      width: 100%;
      padding: 12px 25px;
      box-shadow: 0 1px 11px rgba(0,0,0,0.5);
      position: fixed;
      z-index: 100;
      display: flex;
      justify-content: space-between;
      position: absolute;
      top: 0;
    `;

    const StyledLogoContainer = styled.div`
      flex: 1;
    `;

    const StyledLogo = styled.img`
      height: 40px;
    `;

    const StyledWalletLinkContainer = styled.div`
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    `;

    const StyledWalletLink = styled(Link)`
      color: white;
      font-weight: 700;
      text-decoration: none;
      font-size: 15px;
    `;

    return (
      <StyledToolbar >
        <StyledLogoContainer>
          <StyledLogo src={Logo} alt="SettleMint"/>
        </StyledLogoContainer>
        {this.props.showTabs &&
          <Tabs />
        }
        <StyledWalletLinkContainer>
          <StyledWalletLink to="/wallet">
            Log In
          </StyledWalletLink>
        </StyledWalletLinkContainer>
      </StyledToolbar>
    );
  }
}
