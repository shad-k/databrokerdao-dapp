import React, { Component } from 'react';
import { Button } from 'react-md';
import styled from 'styled-components';

import Toolbar from '../generic/Toolbar';
import CenteredCard from '../generic/CenteredCard';
import CardContent from '../generic/CardContent';
import ToolbarSpacer from '../generic/ToolbarSpacer';
import ListingsTable from './ListingsTable';

export default class ListingsScreen extends Component {
  onEnlistStreamClicked() {
    this.props.history.push(`/enlist`);
  }

  render() {
    const StyledTitleContainer = styled.div`
      display:flex;
      justify-content:space-between;
    `;

    return (
      <div>
        <Toolbar showTabs={true} />
        <ToolbarSpacer/>
        <CenteredCard >
          <CardContent>
            <StyledTitleContainer>
              <h1>Listed streams</h1>
              <Button flat primary swapTheming onClick={event => this.onEnlistStreamClicked()} style={{marginTop:"8px"}}>Enlist stream</Button>
            </StyledTitleContainer>
            <ListingsTable />
          </CardContent>
        </CenteredCard>
      </div>
    );
  }
}
