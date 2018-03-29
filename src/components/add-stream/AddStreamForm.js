import React, { Component } from 'react';
import { withFormik } from 'formik';
import Yup from 'yup';
import styled from 'styled-components';
import { Button } from 'react-md';
import EnhancedTextField from '../generic/EnhancedTextField';
import EnhancedTextArea from '../generic/EnhancedTextArea';
import EnhancedSelectField from '../generic/EnhancedSelectField';

export default class AddStreamForm extends Component {

  render(){
    const streamTypes = [
      {
        label: 'Temperature',
        value: 'temperature'
      },
      {
        label: 'Humidity',
        value: 'humidity'
      },
      {
        label: 'PM2.5',
        value: 'PM25'
      },
      {
        label: 'PM10',
        value: 'PM10'
      }
    ]

    const StyledForm = styled.form`
      display:flex;
      flex-wrap:wrap;
      justify-content: space-between;
    `;

    const StyledColumn = styled.div`
      width:49%;
    `;

    // Our inner form component. Will be wrapped with Formik({..})
    const InnerForm = props => {
      const {
        values,
        errors,
        touched,
        setFieldValue,
        setFieldTouched,
        handleSubmit,
        isSubmitting
      } = props;
      return (
        <StyledForm onSubmit={handleSubmit}>
          <StyledColumn>
            <EnhancedTextField
              id="name"
              fieldname="name"
              label="Stream name"
              className="md-cell md-cell--bottom"
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              error={errors.name}
              touched={touched.name}
              style={{width:"100%"}}
            />
          </StyledColumn>
          <StyledColumn>
            <EnhancedSelectField
              id="type"
              fieldname="type"
              label="Stream type"
              className="md-cell"
              onChange={setFieldValue}
              menuItems={streamTypes}
              simplifiedMenu={true}
              onBlur={setFieldTouched}
              style={{width:"100%"}}
              error={errors.type}
              touched={touched.type}
            />
          </StyledColumn>
          <StyledColumn>
            <EnhancedTextField
              id="lat"
              fieldname="lat"
              label="Latitude"
              className="md-cell md-cell--bottom"
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              error={errors.lat}
              touched={touched.lat}
              style={{width:"100%"}}
            />
          </StyledColumn>
          <StyledColumn>
            <EnhancedTextField
              id="lng"
              fieldname="lng"
              label="Longitude"
              className="md-cell md-cell--bottom"
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              error={errors.lng}
              touched={touched.lng}
              style={{width:"100%"}}
            />
          </StyledColumn>
          <StyledColumn>
            <EnhancedTextField
              id="updateinterval"
              fieldname="updateinterval"
              label="Update interval (seconds)"
              className="md-cell md-cell--bottom"
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              error={errors.updateinterval}
              touched={touched.updateinterval}
              style={{width:"100%"}}
            />
          </StyledColumn>
          <StyledColumn>
            <EnhancedTextField
              id="price"
              fieldname="price"
              label="Price (DTX)"
              className="md-cell md-cell--bottom"
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              error={errors.price}
              touched={touched.price}
              style={{width:"100%"}}
            />
          </StyledColumn>
          <StyledColumn>
            <EnhancedTextField
              id="stake"
              fieldname="stake"
              label="Stake (DTX)"
              className="md-cell md-cell--bottom"
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              error={errors.stake}
              touched={touched.stake}
              style={{width:"100%"}}
            />
          </StyledColumn>
          <StyledColumn style={{width:"100%"}}>
            <EnhancedTextArea
              id="example"
              fieldname="example"
              label="Example reading(s)"
              className="md-cell md-cell--bottom"
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              error={errors.example}
              touched={touched.example}
              style={{width:"100%"}}
              rows={4}
              maxRows={10}
            />
          </StyledColumn>
          <StyledColumn>
          </StyledColumn>
          <StyledColumn style={{display:"flex", justifyContent:"flex-end"}}>
            <Button type="submit" flat swapTheming primary disabled={isSubmitting} style={{marginTop:"20px"}}>
              Submit
            </Button>
          </StyledColumn>
        </StyledForm>
      );
    };

    const EnhancedForm = withFormik({
      mapPropsToValues: () => ({ name: '', lat: '', lng: '', type: '', example: '', updateinterval: '', price: '', stake: '' }),
      validationSchema: Yup.object().shape({
        name: Yup.string().required('Stream name is required'),
        type: Yup.string().required('Type is required'),
        lat: Yup.number().typeError('Latitude must be a number').required('Latitude is required'),
        lng: Yup.number().typeError('Longitude must be a number').required('Longitude is required'),
        example: Yup.string().required('Example is required'),
        updateinterval: Yup.number().typeError('Update must be a number').required('Update interval is required'),
        price: Yup.number().typeError('Price must be a number').required('Price is required'),
        stake: Yup.number().typeError('Stake must be a number').required('Stake is required')
      }),
      handleSubmit: (values, { setSubmitting }) => {
        console.log(values);
        setSubmitting(false);
      },
      displayName: 'AddStreamForm', // helps with React DevTools
    })(InnerForm);

    return(
      <EnhancedForm />
    );
  }
}
