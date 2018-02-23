import React, { Component } from 'react';

import MapMarker from '../generic/MapMarker';
import ClosedDiscoverMapMarker from './ClosedDiscoverMapMarker';
import OpenDiscoverMapMarker from './OpenDiscoverMapMarker';

export default class DiscoverMapMarker extends Component {
  constructor(props){
    super(props);

    this.state = {expanded:false};
  }

  toggleExpanded() {
    this.setState({expanded:!this.state.expanded});
  }

  render() {
    return (
      <MapMarker position={this.props.position}>
          <div style={{cursor:"pointer"}} onClick={event => this.toggleExpanded()}>
            {!this.state.expanded &&
              <ClosedDiscoverMapMarker/>
            }
            {this.state.expanded &&
              <OpenDiscoverMapMarker/>
            }
          </div>
      </MapMarker>
    );
  }
}
