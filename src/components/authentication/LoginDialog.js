import React, { Component } from 'react';
import { Button, FontIcon, DialogContainer } from 'react-md';
import { connect } from 'react-redux';

import LoginForm from './LoginForm';
import { login } from '../../redux/authentication/reducer';

class LoginDialog extends Component {
  render(){
    const { visible } = this.props.visible;

    return(
      <DialogContainer
        id="login"
        visible={this.props.visible}
        onHide={this.props.hideEventHandler}
        focusOnMount={false}
        dialogStyle={{width:"500px"}}
        title="Log In"
      >
        <h1>Log In</h1>
        <LoginForm
          login={(values, settings) =>
            this.props.dispatch(login(values, settings))
          }
        />
      </DialogContainer>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(null, mapDispatchToProps)(LoginDialog);
