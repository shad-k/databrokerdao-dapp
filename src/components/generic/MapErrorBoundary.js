import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ERROR_ACTIONS } from '../../redux/errors/actions';

class MapErrorBoundary extends Component {
  componentDidCatch(error, info) {
    this.props.setMapError(error);
  }
  render() {
    return this.props.children(this.props.error || {});
  }
}

const mapStateToProps = state => ({
  error: state.error.googleMapError
})

function mapDispatchToProps(dispatch) {
  return {
    setMapError: error => dispatch(ERROR_ACTIONS.setMapError(error)),
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapErrorBoundary);