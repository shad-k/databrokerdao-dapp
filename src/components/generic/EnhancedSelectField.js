import React, { Component } from 'react';
import { SelectField } from 'react-md';

export default class EnhancedSelectField extends Component {
  state = {
    value: ''
  };

  componentDidMount() {
    this.setState({
      value: this.props.initialValue || ''
    });
  }

  handleChange = value => {
    if(this.props.valueInState){
      this.setState({ value });
    }
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
      placeholder,
      helpText,
      menuItems,
      className,
      itemLabel,
      itemValue
    } = this.props;

    return (
      <SelectField
        type={type}
        name={fieldname}
        id={fieldname}
        label={label}
        placeholder={placeholder}
        helpText={helpText}
        menuItems={menuItems}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        value={this.state.value}
        error={touched && error && true}
        errorText={touched && error}
        className={className}
        simplifiedMenu={false}
        itemLabel={itemLabel}
        itemValue={itemValue}
        style={this.props.style}
      />
    );
  }
}
