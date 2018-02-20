import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, FontIcon, Chip, Avatar, Autocomplete, DropdownMenu, TextField } from 'react-md';

export default class Filter extends Component {
  render() {
    const StyledFilterContainer = styled.div`
      background: #F3F3F3;
      margin: 0 14px 14px 14px;
      padding: 4px 16px 16px 16px;
      &:first-child{
        margin-top: 20px;
      }
    `;

    const StyledChip = styled(Chip)`
      width:100%;
      margin-bottom:16px;
      &:last-child{
        margin-bottom:0;
      }
    `;

    const StyledDropdownMenu = styled(DropdownMenu)`
      width: 100%;
      margin-bottom: 16px;
    `;

    return (
      <div>
        <StyledFilterContainer>
          <Autocomplete
            id="sensor-type-filter"
            label="Location"
            data={["Antwerp","Diepenbeek","Berlin","New York","Leuven"]}
            filter={Autocomplete.caseInsensitiveFilter}
            value="Leuven, Belgium"
          />
        </StyledFilterContainer>
        <StyledFilterContainer>
          <StyledDropdownMenu
            id="textfield-dropdown-menu"
            menuItems={["Temperature","CO2","Humidity","Light"]}
            toggleQuery=".md-text-field-container"
            anchor={{
              x: DropdownMenu.HorizontalAnchors.INNER_LEFT,
              y: DropdownMenu.VerticalAnchors.BOTTOM,
            }}
            position={DropdownMenu.Positions.BELOW}
          >
            <TextField
              id="dropdown-menu-textfield"
              label="Sensor type(s)"
            />
          </StyledDropdownMenu>
          <StyledChip
            style={{}}
            label="Temperature"
            avatar={<Avatar><FontIcon>wb_sunny</FontIcon></Avatar>}
            removable
          />
          <StyledChip
            label="Humidity"
            avatar={<Avatar><FontIcon>pets</FontIcon></Avatar>}
            removable
          />
          <StyledChip
            label="Wind speed"
            avatar={<Avatar><FontIcon>directions_car</FontIcon></Avatar>}
            removable
          />
          <StyledChip
            label="Air pollution"
            avatar={<Avatar><FontIcon>cloud</FontIcon></Avatar>}
            removable
          />
        </StyledFilterContainer>
      </div>
    );
  }
}
