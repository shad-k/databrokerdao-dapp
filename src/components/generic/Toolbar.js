import React, { Component } from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

import Logo from '../../assets/databroker-logo-white.svg';
import Tabs from './Tabs.js';
import LoginDialog from '../authentication/LoginDialog';

class Toolbar extends Component {
  static propTypes = {
    showTabs: propTypes.bool
  }

  constructor(props){
    super(props);

    this.state = {
      LoginVisible: false
    };
  }

  toggleLogin(){
    this.setState({LoginVisible: !this.state.LoginVisible});
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
      font-weight: 600;
      text-decoration: none;
      font-size: 18px;
      font-family: 'Titillium Web', sans-serif;
    `;

    const StyledLoginSpan = styled.span`
      color: white;
      font-weight: 600;
      font-size: 18px;
      cursor:pointer;
      font-family: 'Titillium Web', sans-serif;
    `;

    return (
      <div>
        <StyledToolbar >
          <StyledLogoContainer>
            <StyledLogo src={Logo} alt="SettleMint"/>
          </StyledLogoContainer>
          {this.props.showTabs &&
            <Tabs />
          }
          <StyledWalletLinkContainer>
            {this.props.token &&
              <StyledWalletLink to="/wallet">
                My wallet
              </StyledWalletLink>
            }
            {!this.props.token &&
              <StyledLoginSpan onClick={event => this.toggleLogin()}>
                Log In
              </StyledLoginSpan>
            }
          </StyledWalletLinkContainer>
        </StyledToolbar>
        <LoginDialog visible={this.state.LoginVisible && !this.props.token} hideEventHandler={() => this.toggleLogin()} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token
});

export default connect(mapStateToProps, null)(Toolbar)
