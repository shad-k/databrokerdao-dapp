import React, { Component } from 'react';
import { List, ListItem } from 'react-md';
import { connect } from 'react-redux'
import _ from 'lodash';
import { withRouter } from 'react-router-dom';

class DiscoverStreamsList extends Component {
  onStreamListItemClick(stream) {
    this.props.history.push(`/stream-details/${stream.id}`);
  }

  renderStreamsListItems(streams){
    let listItems = _.map(streams, stream => {
      return <ListItem key={stream.id} primaryText={stream.name} onClick={(event) => this.onStreamListItemClick(stream)}/>;
    });

    if(this.props.fetchingStreams)
      return <ListItem primaryText={'loading streams'} disabled/>;
    else if(listItems.length > 0)
      return listItems;
    else
      return <ListItem primaryText={'no streams'} disabled/>;
  }

  render() {
    return (
      <div>
        <h2 style={{margin:"30px 16px 0 16px"}}>Streams</h2>
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
