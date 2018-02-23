import React, { Component } from 'react';
import styled from 'styled-components';
import { Card } from 'react-md/lib/Cards';

export default class CenteredCard extends Component {
  render() {
    const StyledCard = styled(Card)`
      max-width: 900px;
      margin-bottom: 24px;

      &:first-of-type{
        margin-top: 100px;
      }
    `;

    return(
      <StyledCard className='md-block-centered'>
        {this.props.children}
      </StyledCard>
    );
  }
}
