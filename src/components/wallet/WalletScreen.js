import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button } from 'react-md';

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

  render() {
    const address = localStorage.getItem('address');

    return (
      <div>
        <Toolbar showTabs={true} />
        <ToolbarSpacer/>
        <CenteredCard >
          <CardContent>
            <h1>My wallet</h1>
            <p>Address: {address}</p>
            <p>DTX balance: &Xi; {this.props.fetchingWallet?'(loading)':this.props.wallet.balance}</p>
            <Button flat swapTheming primary onClick={() => this.props.logout()}>Log out</Button>
          </CardContent>
        </CenteredCard>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
  wallet: state.wallet.wallet,
  fetchingWallet: state.wallet.fetchingWallet
});

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
    fetchWallet: () => dispatch(WALLET_ACTIONS.fetchWallet())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletScreen)
