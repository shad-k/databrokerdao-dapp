import React, { Component } from 'react';
import { Link, push, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Card, CardText, Button, List, ListItemControl, Avatar, FontIcon, Checkbox } from 'react-md';

export default withRouter(class LandingContent extends Component {
  constructor() {
    super()
  }

  onDiscoverButtonClicked = e => {
    // Save filter to state (if needed), log button click to Mixpanel,...
    this.props.history.push('/discover');
  }

  render() {
    const StyledCard = styled(Card)`
      max-width: 600px;
      position: relative;
      top: 140px;
    `;

    const StyledH1 = styled.h1`
      text-align:center;
      font-weight:700;
      color: black;
      margin-top:20px;
      margin-bottom: 10px;
    `;

    const StyledColumn = styled.div`
      width: 50%;
      padding: 20px 0 35px 0;
      &:first-child{
        padding-right: 25px;
        padding-left: 35px;
      }
      &:last-child{
        padding-left: 25px;
        padding-right: 35px;
      }
    `;

    const StyledDiscoverButton = styled(Button)`
      margin:0 auto;
      display:block;
    `;

    return (
      <div>
        <StyledCard className='md-block-centered'>
          <CardText>
            <StyledH1>Buy sensor data on the global market for sensor data</StyledH1>
            <div>
              <StyledColumn style={{float:"left", width:"50%"}}>
                <List>
                  <ListItemControl
                    leftIcon={<FontIcon>wb_sunny</FontIcon>}
                    secondaryAction={
                      <Checkbox
                        id="list-control-secondary-1"
                        name="list-control-secondary"
                        label="Temperature"
                        labelBefore
                        defaultChecked
                      />
                    }
                  />
                  <ListItemControl
                    leftIcon={<FontIcon>pets</FontIcon>}
                    secondaryAction={
                      <Checkbox
                        id="list-control-secondary-2"
                        name="list-control-secondary"
                        label="Humidity"
                        labelBefore
                        defaultChecked
                      />
                    }
                  />
                </List>
              </StyledColumn>
              <StyledColumn style={{float:"left", width:"50%"}}>
              <List>
                <ListItemControl
                  leftIcon={<FontIcon>directions_car</FontIcon>}
                  secondaryAction={
                    <Checkbox
                      id="list-control-secondary-3"
                      name="list-control-secondary"
                      label="Wind speed"
                      labelBefore
                      defaultChecked
                    />
                  }
                />
                <ListItemControl
                  leftIcon={<FontIcon>cloud</FontIcon>}
                  secondaryAction={
                    <Checkbox
                      id="list-control-secondary-4"
                      name="list-control-secondary"
                      label="Air polution"
                      labelBefore
                      defaultChecked
                    />
                  }
                />
              </List>
              </StyledColumn>
            </div>
            <StyledDiscoverButton primary raised onClick={this.onDiscoverButtonClicked.bind(this)}>
              Discover sensors
            </StyledDiscoverButton>
          </CardText>
        </StyledCard>
      </div>
    );
  }
})
