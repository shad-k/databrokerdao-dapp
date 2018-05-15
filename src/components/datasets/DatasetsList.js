import React, { Component } from 'react';
import { List, FontIcon } from 'react-md';
import { connect } from 'react-redux';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { convertWeiToDtx } from '../../utils/transforms';

import Icon from '../generic/Icon';

class DatasetsList extends Component {
  // onStreamListItemClick(stream) {
  //   this.props.history.push(`/stream-details/${stream.key}`);
  // }

  renderDatasetListItems(datasets) {
    const StyledListItem = styled.div`
      padding: 18px 16px;
      cursor: pointer;
      display: flex;
      align-items: center;

      &:hover {
        background-color: #e0e0e0;
      }

      &.disabled {
        color: rgba(0, 0, 0, 0.5);
      }

      &.disabled:hover {
        cursor: default;
        background-color: white;
      }
    `;

    const DatasetName = styled.p`
      font-size: 16px;
      margin: 0 0 3px 0;
    `;

    const StakeDetails = styled.p`
      font-size: 14px;
      color: #b6b6b6;
      margin: 0;
    `;

    let listItems = _.map(datasets, dataset => {
      return (
        <StyledListItem
          key={dataset.id}
          // onClick={event => this.onStreamListItemClick(dataset)}
          leftIcon={<FontIcon key="data">data_usage</FontIcon>}
        >
          <Icon
            icon={dataset.type}
            style={{
              fill: 'rgba(0,0,0,0.5)',
              width: '20px',
              height: '20px',
              marginRight: '13px'
            }}
          />
          <div style={{ flex: '1' }}>
            <DatasetName>{dataset.name}</DatasetName>
            <StakeDetails>
              Stake: {convertWeiToDtx(dataset.stake)}, Challenges:{' '}
              {dataset.numberofchallenges} ({convertWeiToDtx(
                dataset.challengesstake
              )}{' '}
              DTX)
            </StakeDetails>
          </div>
        </StyledListItem>
      );
    });

    if (this.props.fetchingDatasets)
      return (
        <StyledListItem className="disabled">loading datasets</StyledListItem>
      );
    else if (listItems.length > 0) return listItems;
    else
      return <StyledListItem className="disabled">no datasets</StyledListItem>;
  }

  render() {
    const StyledList = styled.div`
      padding-top: 65px;
      width: 100%;
    `;

    return (
      <StyledList>
        <List>{this.renderDatasetListItems(this.props.datasets)}</List>
      </StyledList>
    );
  }
}

const mapStateToProps = state => ({
  datasets: state.datasets.datasets,
  fetchingDatasets: state.datasets.fetchingDatasets
});

export default connect(mapStateToProps, null)(withRouter(DatasetsList));
