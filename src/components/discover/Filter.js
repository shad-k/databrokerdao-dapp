import React, { Component } from 'react';
import styled from 'styled-components';
import { FontIcon, Chip, Avatar, Autocomplete, DropdownMenu, TextField, ListItem } from 'react-md';
import { connect } from 'react-redux'
import _ from 'lodash';

import { STREAMS_ACTIONS } from '../../redux/streams/actions';

class Filter extends Component {
  componentDidMount() {
    console.log("Filter component did mount");

    this.props.fetchAvailableStreamTypes();
  }

  submitFilter() {
    console.log("Filter has been changed!!");

    //Update filter in Redux state
  }

  addTypeToFilter(id){
    console.log(id);

    this.submitFilter();
  }

  removeTypeFromFilter(id){
    console.log("Remove filter");
    console.log(id);

    this.props.removeFilterType(id);
  }

  renderTypeListItems(){
    const types = this.props.availableStreamTypes;

    return _.map(types, type => {
      return(
        <ListItem key={type.id} primaryText={type.name} onClick={() => this.addTypeToFilter(type.id)}/>
      )
    });
  }

  renderTypeChips(){
    const StyledChip = styled(Chip)`
      width:100%;
      margin-bottom:16px;
      cursor: pointer;
      &:last-child{
        margin-bottom:0;
      }
    `;

    const types = this.props.filter.types;

    return _.map(types, type => {
      console.log(type);
      return(
        <StyledChip
          key={type.id}
          label={type.name}
          avatar={<Avatar><FontIcon>wb_sunny</FontIcon></Avatar>}
          onClick={() => this.removeTypeFromFilter(type.id)}
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
            menuItems={this.renderTypeListItems()}
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

function mapDispatchToProps(dispatch) {
  return {
    fetchAvailableStreamTypes: () => STREAMS_ACTIONS.fetchAvailableStreamTypes(dispatch),
    removeFilterType: (filterType) => STREAMS_ACTIONS.removeFilterType(dispatch, filterType)
  }
}

const mapStateToProps = state => ({
  availableStreamTypes: state.streams.availableStreamTypes,
  filter: state.streams.filter
})

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
