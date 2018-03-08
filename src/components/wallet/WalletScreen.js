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
    const address = localStorage.getItem('address');

    return (
      <div>
        <Toolbar showTabs={true} />
        <ToolbarSpacer/>
        <CenteredCard >
          <CardContent>
            <h1>My wallet</h1>
            <p>Address: {address}</p>
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
