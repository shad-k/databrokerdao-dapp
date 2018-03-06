import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button } from 'react-md';

import Toolbar from '../generic/Toolbar';
import CenteredCard from '../generic/CenteredCard';
import CardContent from '../generic/CardContent';
import ToolbarSpacer from '../generic/ToolbarSpacer';
import { logout } from '../../redux/authentication/reducer';

class WalletScreen extends Component {
  render() {
    return (
      <div>
        <Toolbar showTabs={true} />
        <ToolbarSpacer/>
        <CenteredCard >
          <CardContent>
            <h1>Wallet</h1>
            <p>Private key:</p>
            <p style={{wordWrap:"break-word"}}>{this.props.token}</p>
            <Button raised primary onClick={event => this.props.dispatch(logout())}>Log out</Button>
          </CardContent>
        </CenteredCard>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletScreen)
