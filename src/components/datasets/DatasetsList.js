import React, { Component } from 'react';
import { List, FontIcon } from 'react-md';
import { connect } from 'react-redux';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { convertWeiToDtx } from '../../utils/transforms';
import TitleCTAButton from '../generic/TitleCTAButton';

import Icon from '../generic/Icon';

class DatasetsList extends Component {
  onListItemClick(dataset) {
    this.props.history.push(`/dataset/${dataset.key}`);
  }

  renderDatasetListItems(datasets) {
    const StyledListItem = styled.div`
      padding: 25px;
      cursor: pointer;
      display: flex;
      align-items: center;
      border-top: 1px solid #e0e0e0;

      &:first-child {
        border: none;
      }

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

    const DatasetName = styled.h3`
      margin: 0 0 10px 0;
    `;

    const DatasetDetails = styled.p`
      font-size: 14px;
      color: #b6b6b6;
      margin: 0;
    `;

    const DatasetPrice = styled.p`
      font-size: 14px;
      margin: 0;
    `;

    let listItems = _.map(datasets, dataset => {
      return (
        <StyledListItem
          key={dataset.id}
          onClick={event => this.onListItemClick(dataset)}
          leftIcon={<FontIcon key="data">data_usage</FontIcon>}
        >
          <Icon
            icon={dataset.category}
            style={{
              fill: 'rgba(0,0,0,0.5)',
              width: '20px',
              height: '20px',
              marginRight: '25px'
            }}
          />
          <div style={{ flex: '1' }}>
            <DatasetName>{dataset.name}</DatasetName>
            <DatasetPrice>
              Price: {convertWeiToDtx(dataset.price)} DTX
            </DatasetPrice>
            <DatasetDetails>
              File type: {dataset.filetype}, Owner stake:{' '}
              {convertWeiToDtx(dataset.stake)} DTX, Challenges:{' '}
              {dataset.numberofchallenges} ({convertWeiToDtx(
                dataset.challengesstake
              )}{' '}
              DTX)
            </DatasetDetails>
          </div>
          <div>
            <TitleCTAButton flat primary swapTheming onClick={event => {}}>
              Purchase access
            </TitleCTAButton>
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
