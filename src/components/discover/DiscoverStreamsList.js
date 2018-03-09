import React, { Component } from 'react';
import { List, ListItem, FontIcon } from 'react-md';
import { connect } from 'react-redux'
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import Icon from '../generic/Icon';

class DiscoverStreamsList extends Component {
  onStreamListItemClick(stream) {
    this.props.history.push(`/stream-details/${stream.key}`);
  }

  renderStreamsListItems(streams){
    const StyledListItem = styled.div`
      padding: 16px;
      font-size: 13px;
      cursor: pointer;
      display: flex;
      align-items: center;

      &:hover{
        background-color: #e0e0e0;
      }

      &.disabled{
        cursor:default;
        color: rgba(0,0,0,0.5);
      }
    `;

    let listItems = _.map(streams, stream => {
      return (<StyledListItem
                key={stream.id} onClick={(event) => this.onStreamListItemClick(stream)}
                leftIcon={<FontIcon key="data">data_usage</FontIcon>}
                >
                <Icon icon={stream.type} style={{fill:"rgba(0,0,0,0.5)", width:"20px", height:"20px", marginRight:"12px"}} />
                {stream.name}
              </StyledListItem>
              );
    });

    if(this.props.fetchingStreams)
      return <StyledListItem className="disabled">loading streams</StyledListItem>;
    else if(listItems.length > 0)
      return listItems;
    else
      return <StyledListItem className="disabled">no streams</StyledListItem>;
  }

  render() {
    return (
      <div>
        <h2 style={{margin:"10px 16px 0 16px"}}>Available streams</h2>
        <List>
          {this.renderStreamsListItems(this.props.streams)}
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  streams: state.streams.streams,
  fetchingStreams: state.streams.fetchingStreams
})

export default connect(mapStateToProps, null)(withRouter(DiscoverStreamsList))
