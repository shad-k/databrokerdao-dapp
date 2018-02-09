import React, { Component } from 'react';
import { RegisterForm } from './RegisterForm';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { register } from '../../redux/authentication/reducer';

class Register extends Component {
  render() {
    return (
      <div>
        <h2>Register</h2>
        <RegisterForm
          register={(values, settings) =>
            this.props.dispatch(register(values, settings))
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
