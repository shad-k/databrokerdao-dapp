import React, { Component } from 'react';
import styled from 'styled-components';
import Mixpanel from 'mixpanel-browser';

import Toolbar from '../generic/Toolbar';
import Sidebar from './Sidebar';

class DatasetsScreen extends Component {
  componentDidMount() {
    Mixpanel.track('View datasets screen');
  }

  constructor(props) {
    super(props);

    this.state = {
      sidebarWidth: window.innerWidth > 480 ? 320 : 0
    };
  }

  setSidebarWidth(width) {
    this.setState({ sidebarWidth: width });
  }

  render() {
    return (
      <div style={{ height: '100%', display: 'flex', alignItems: 'stretch' }}>
        <Toolbar showTabs={true} />
        <Sidebar setWidthHandler={width => this.setSidebarWidth(width)} />
        <p>datasets</p>
      </div>
    );
  }
}

module.exports = DatasetsScreen;
