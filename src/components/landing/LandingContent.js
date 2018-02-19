import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Card, CardText } from 'react-md/lib/Cards';

export default class LandingContent extends Component {
  render() {
    const StyledCard = styled(Card)`
      max-width: 600px;
    `;

    return (
      <div>
        <div style={{height:"84px"}}>
        </div>
        <StyledCard className='md-block-centered'>
          <CardText>
            <h2>Buy and sell data!</h2>
            <Link to="/discover">Discover sensors</Link>
          </CardText>
        </StyledCard>
      </div>
    );
  }
}
