import React, { Component } from 'react';
import { DialogContainer } from 'react-md';
import { connect } from 'react-redux';

import LoginForm from './LoginForm';
import { login } from '../../redux/authentication/reducer';

class LoginDialog extends Component {
  render(){
    return(
      <DialogContainer
        id="login"
        visible={this.props.visible}
        onHide={this.props.hideEventHandler}
        focusOnMount={false}
        dialogStyle={{width:"500px",position:"relative",top:"33%"}}
        aria-labelledby="Log In"
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
