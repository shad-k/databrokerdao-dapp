import React, { Component } from 'react';
import styled from 'styled-components';

import Toolbar from '../generic/Toolbar';
import CenteredCard from '../generic/CenteredCard';
import CardContent from '../generic/CardContent';
import ToolbarSpacer from '../generic/ToolbarSpacer';
import ListingsTable from './ListingsTable';
import TitleCTAButton from '../generic/TitleCTAButton';

export default class ListingsScreen extends Component {
  onEnlistStreamClicked() {
    this.props.history.push(`/enlist`);
  }

  render() {
    const StyledTitleContainer = styled.div`
      display:flex;
      justify-content:space-between;

      @media (max-width: ${props => props.theme.mobileBreakpoint}) {
        flex-direction: column;
      }
    `;

    return (
      <div>
        <Toolbar showTabs={true} />
        <ToolbarSpacer/>
        <CenteredCard >
          <CardContent>
            <StyledTitleContainer>
              <h1>Listed streams</h1>
              <TitleCTAButton flat primary swapTheming onClick={event => this.onEnlistStreamClicked()}>Enlist stream</TitleCTAButton>
            </StyledTitleContainer>
            <ListingsTable />
          </CardContent>
        </CenteredCard>
      </div>
    );
  }
}
