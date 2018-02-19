import React, { Component } from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types'

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
      box-shadow: 0 1px 12px rgba(0,0,0,0.4);
    `;

    const StyledLogo = styled.img`
      height: 40px;
      float: left;
    `;

    return (
      <div>
        <StyledToolbar className="clearfix" >
          <StyledLogo src={Logo} alt="SettleMint"/>
          {this.props.showTabs &&
            <Tabs />
          }
        </StyledToolbar>
      </div>
    );
  }
}
