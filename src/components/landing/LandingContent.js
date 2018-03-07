import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Card, CardText, Button, Checkbox, Paper } from 'react-md';
import { connect } from 'react-redux';

import Icon from '../generic/icon';
import { STREAMS_ACTIONS } from '../../redux/streams/actions';

class LandingContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      temperature: true,
      humidity: true,
      pm25: true,
      pm10: true
    };
  }

  onDiscoverButtonClicked = e => {
    //Update Redux filter
    const filters = [];
    if (this.state.temperature) filters.push('temperature');
    if (this.state.humidity) filters.push('humidity');
    if (this.state.pm25) filters.push('pm25');
    if (this.state.pm10) filters.push('pm10');

    this.props.updateFilter({
      location: null,
      types: filters
    });

    this.props.history.push('/discover');
  };

  toggleFilterType(type) {
    const updatedState = this.state;

    switch (type) {
      case 'temperature': {
        updatedState.temperature = !this.state.temperature;
        break;
      }
      case 'humidity': {
        updatedState.humidity = !this.state.humidity;
        break;
      }
      case 'pm25': {
        updatedState.pm25 = !this.state.pm25;
        break;
      }
      case 'pm10': {
        updatedState.pm10 = !this.state.pm10;
        break;
      }
    }

    this.setState(updatedState);
  }

  render() {
    const StyledCard = styled(Card)`
      max-width: 600px;
      position: relative;
      top: 120px;
    `;

    const StyledH1 = styled.h1`
      text-align: center;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.7);
      line-height: 1.5;
      margin-top: 20px;
      margin-bottom: 10px;
    `;

    const StyledDiscoverButton = styled(Button)`
      margin: 0 auto;
      display: block;
    `;

    const StyledTypeButton = styled(Paper)`
      display: flex;
      align-items: center;
      margin: 18px 10px 18px 10px;
      padding-left: 12px;
    `;

    const StyledTypeButtonLabel = styled.span`
      flex: 1;
      margin-left: 12px;
      line-height: 1;
    `;

    return (
      <div>
        <StyledCard className="md-block-centered">
          <CardText>
            <StyledH1>
              Buy sensor data on the global market for sensor data
            </StyledH1>
            <div style={{ padding: '0 80px 20px 80px', display: 'flex' }}>
              <div style={{ flex: '1' }}>
                <StyledTypeButton zDepth={1}>
                  <Icon icon="temperature" />
                  <StyledTypeButtonLabel>Temperature</StyledTypeButtonLabel>
                  <Checkbox
                    id="temperature"
                    value="temperature"
                    name="temperature"
                    aria-label="temperature"
                    style={{ display: 'inline' }}
                    checked={this.state.temperature}
                    onChange={() => this.toggleFilterType('temperature')}
                  />
                </StyledTypeButton>
                <StyledTypeButton zDepth={1}>
                  <Icon icon="humidity" />
                  <StyledTypeButtonLabel>Humidity</StyledTypeButtonLabel>
                  <Checkbox
                    id="humidity"
                    value="humidity"
                    name="humidity"
                    aria-label="humidity"
                    style={{ display: 'inline' }}
                    checked={this.state.humidity}
                    onChange={() => this.toggleFilterType('humidity')}
                  />
                </StyledTypeButton>
              </div>
              <div style={{ flex: '1' }}>
                <StyledTypeButton zDepth={1}>
                  <Icon icon="pm25" />
                  <StyledTypeButtonLabel>PM 2.5</StyledTypeButtonLabel>
                  <Checkbox
                    id="pm25"
                    value="pm25"
                    name="pm25"
                    aria-label="pm25"
                    style={{ display: 'inline' }}
                    checked={this.state.pm25}
                    onChange={() => this.toggleFilterType('pm25')}
                  />
                </StyledTypeButton>
                <StyledTypeButton zDepth={1}>
                  <Icon icon="pm10" />
                  <StyledTypeButtonLabel>PM 10</StyledTypeButtonLabel>
                  <Checkbox
                    id="pm10"
                    value="pm10"
                    name="pm10"
                    aria-label="pm10"
                    style={{ display: 'inline' }}
                    checked={this.state.pm10}
                    onChange={() => this.toggleFilterType('pm10')}
                  />
                </StyledTypeButton>
              </div>
            </div>
            <StyledDiscoverButton
              primary
              raised
              onClick={this.onDiscoverButtonClicked.bind(this)}
            >
              Discover sensors
            </StyledDiscoverButton>
          </CardText>
        </StyledCard>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateFilter: filter => STREAMS_ACTIONS.updateFilter(dispatch, filter)
  };
}

export default connect(null, mapDispatchToProps)(withRouter(LandingContent));
