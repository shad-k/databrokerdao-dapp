import React, { Component } from 'react';
import styled from 'styled-components';
import { FontIcon, Chip, Avatar, Autocomplete, DropdownMenu, TextField, ListItem } from 'react-md';
import { connect } from 'react-redux'
import _ from 'lodash';

class Filter extends Component {
  submitFilter() {
    console.log("Filter has been changed!!");

    //Update filter in Redux state
  }

  addTypeToFilter(key){
    console.log(key);

    this.submitFilter();
  }

  removeTypeFromFilter(key){
    console.log("Remove filter");
  }

  renderTypeChips(){
    const StyledChip = styled(Chip)`
      width:100%;
      margin-bottom:16px;
      &:last-child{
        margin-bottom:0;
      }
    `;

    const types = this.props.filter.types;

    return _.map(types, type => {
      return(
        <StyledChip
          label={type.name}
          avatar={<Avatar><FontIcon>wb_sunny</FontIcon></Avatar>}
          onClick={() => this.removeTypeFromFilter(1)}
          removable
        />
      )
    });
  }

  render() {
    const StyledFilterContainer = styled.div`
      background: #F3F3F3;
      margin: 0 14px 14px 14px;
      padding: 4px 16px 16px 16px;
      &:first-child{
        margin-top: 20px;
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
            defaultValue="Leuven, Belgium"
          />
        </StyledFilterContainer>
        <StyledFilterContainer>
          <StyledDropdownMenu
            id="textfield-dropdown-menu"
            menuItems={[
              <ListItem key={1} primaryText="Temperature" onClick={() => this.addTypeToFilter(1)}/>,
              <ListItem key={2} primaryText="CO2" onClick={() => this.addTypeToFilter(2)}/>,
              <ListItem key={3} primaryText="Humidity" onClick={() => this.addTypeToFilter(3)}/>,
              <ListItem key={4} primaryText="Light" onClick={() => this.addTypeToFilter(4)}/>
            ]}
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
          {this.renderTypeChips()}
        </StyledFilterContainer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filter: state.streams.filter
})

export default connect(mapStateToProps, null)(Filter)
