import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button } from 'react-md';
import { BigNumber } from 'bignumber.js';

import Toolbar from '../generic/Toolbar';
import CenteredCard from '../generic/CenteredCard';
import CardContent from '../generic/CardContent';
import ToolbarSpacer from '../generic/ToolbarSpacer';
import { logout } from '../../redux/authentication/reducer';
import { WALLET_ACTIONS } from '../../redux/wallet/actions';

class WalletScreen extends Component {
  componentDidMount() {
    this.props.fetchWallet();
  }

  convertWeiToDtx(dtxValue){
    return BigNumber(dtxValue).div(BigNumber(10).pow(18)).toString();
  }

  fundWallet() {
    const amount = BigNumber(500).times(BigNumber(10).pow(18)).toString();
    this.props.mintTokens(amount);
  }

  render() {
    const address = localStorage.getItem('address');
    const email = localStorage.getItem('email');
    let DTXBalance = "(loading)";
    if(!this.props.fetchingWallet && this.props.balance){
      DTXBalance = this.convertWeiToDtx(this.props.balance);
    }

    return (
      <div>
        <Toolbar showTabs={true} />
        <ToolbarSpacer/>
        <CenteredCard >
          <CardContent>
            <h1>My wallet</h1>
            <p>Address: {address}</p>
            <p>Email: {email}</p>
            <p>DTX balance: &Xi; {DTXBalance}</p>
            <Button flat swapTheming primary className={this.props.mintingTokens?"disabled-button":""} disabled={this.props.mintingTokens} onClick={() => this.fundWallet()} style={{marginTop:"10px", marginRight:"10px"}}>
              {this.props.mintingTokens?"(funding in progress)":"Fund wallet (+ 500 DTX)"}
            </Button>
            <Button flat swapTheming primary onClick={() => this.props.logout()} style={{marginTop:"10px"}}>Log out</Button>
          </CardContent>
        </CenteredCard>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
  balance: state.wallet.wallet.balance,
  fetchingWallet: state.wallet.fetchingWallet,
  mintingTokens: state.wallet.mintingTokens
});

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
    fetchWallet: () => dispatch(WALLET_ACTIONS.fetchWallet()),
    mintTokens: (amount) => dispatch(WALLET_ACTIONS.mintTokens(amount))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletScreen)
