import React, { Component } from 'react';
import { TextField } from 'react-md';

export default class EnhancedTextArea extends Component {
  state = {
    value: ''
  };

  componentDidMount() {
    this.setState({
      value: this.props.initialValue || ''
    });
  }

  handleChange = value => {
    this.setState({ value });
    this.props.onChange(this.props.fieldname, value);
  };

  handleBlur = () => {
    this.props.onBlur(this.props.fieldname, true);
  };

  render() {
    const {
      type,
      fieldname,
      label,
      touched,
      error,
      rows,
      maxRows,
      placeholder,
      helpText,
      className
    } = this.props;
    return (
      <TextField
        type={type}
        name={fieldname}
        id={fieldname}
        label={label}
        rows={rows}
        maxRows={maxRows}
        placeholder={placeholder}
        helpText={helpText}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        value={this.state.value}
        error={touched && error && true}
        errorText={error}
        className={className}
        style={this.props.style}
      />
    );
  }
}
