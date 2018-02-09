import React, { Component } from 'react'
import propTypes from 'prop-types'

const style = {
  fontFamily: '"Poppins", sans-serif',
  fontWeight: 500,

  fontSize: '13px',
  cursor: 'pointer',
  color: '#76b852',
}

const hoverStyle = {
  ...style,
  color: '#a1d682',
}

export default class Anchor extends Component {
  constructor() {
    super()
    this.state = {
      hover: false,
    }
  }

  static propTypes = {
    text: propTypes.string,
    onClick: propTypes.func,
    style: propTypes.object,
  }

  render() {
    const styles = {
      ...(this.state.hover ? hoverStyle : style),
      ...this.props.style,
    }
    return (
      <a
        className="anchor"
        style={styles}
        onMouseEnter={() =>
          this.setState({
            hover: true,
          })
        }
        onMouseLeave={() =>
          this.setState({
            hover: false,
          })
        }
        onClick={this.props.onClick}
      >
        {this.props.text}
      </a>
    )
  }
}
