import React, { Component } from 'react';
import styled from 'styled-components';
import { FontIcon, Chip, Avatar, Autocomplete, DropdownMenu, TextField, ListItem } from 'react-md';
import { connect } from 'react-redux'
import _ from 'lodash';
import Immutable from 'seamless-immutable';

import { STREAMS_ACTIONS } from '../../redux/streams/actions';

class Filter extends Component {
  componentDidMount() {
    this.props.fetchAvailableStreamTypes();
  }

  addTypeToFilter(type){
    const newFilter = Immutable.asMutable(this.props.filter, {deep:true});

    if(_.indexOf(newFilter.types, type.id) === -1){
      newFilter.types = _.concat(newFilter.types, type.id);
      this.props.updateFilter(newFilter);
    }
  }

  removeTypeFromFilter(id){
    const newFilter = Immutable.asMutable(this.props.filter, {deep:true});
    newFilter.types = _.pull(newFilter.types, id);
    this.props.updateFilter(newFilter);
  }

  renderTypeListItems(){
    const types = this.props.availableStreamTypes;

    return _.map(types, type => {
      return(
        <ListItem key={type.id} primaryText={type.name} onClick={() => this.addTypeToFilter(type)}/>
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
    const availableTypes = this.props.availableStreamTypes;

    if(availableTypes.length == 0)
      return '';

    return _.map(types, type => {
      return(
        <StyledChip
          key={type}
          label={availableTypes[type].name}
          avatar={<Avatar><FontIcon>wb_sunny</FontIcon></Avatar>}
          onClick={() => this.removeTypeFromFilter(type)}
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
            data={["Antwerp","Brussels","Leuven","Hasselt","Kortrijk","Ghent"]}
            filter={Autocomplete.caseInsensitiveFilter}
            defaultValue="Leuven, Belgium"
            disabled
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
              label="Add sensor type"
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
    updateFilter: (filter) => STREAMS_ACTIONS.updateFilter(dispatch, filter)
  }
}

const mapStateToProps = state => ({
  availableStreamTypes: state.streams.availableStreamTypes,
  filter: state.streams.filter
})

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
