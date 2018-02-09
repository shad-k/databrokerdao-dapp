import React, { Component } from 'react';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { login } from '../../redux/authentication/reducer';

class Login extends Component {
  render() {
    return (
      <div>
        <h2>Login</h2>
        <LoginForm
          login={(values, settings) =>
            this.props.dispatch(login(values, settings))
          }
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: url => dispatch(push(url)),
    dispatch
  };
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
