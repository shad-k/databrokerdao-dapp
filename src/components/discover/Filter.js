import React, { Component } from 'react';
import styled from 'styled-components';
import { FontIcon, Chip, Avatar, Autocomplete, DropdownMenu, TextField, ListItem, IconSeparator, AccessibleFakeButton } from 'react-md';
import { connect } from 'react-redux'
import _ from 'lodash';
import Immutable from 'seamless-immutable';

import Icon from '../generic/Icon';
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
          avatar={<Avatar><Icon icon={type} style={{fill:"white", width:"15px", height:"15px"}} /></Avatar>}
          onClick={() => this.removeTypeFromFilter(type)}
          removable
        />
      )
    });
  }

  render() {
    const StyledFilterContainer = styled.div`
      margin: 0 14px 14px 14px;
      &:first-child{
        margin-top: 20px;
        padding-top: 4px;
      }
    `;

    const StyledDropdownMenu = styled(DropdownMenu)`
      width: 100%;
      margin-bottom: 16px;
    `;

    return (
      <div>
        <h2 style={{margin:"20px 16px 0 16px"}}>Filter</h2>
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
              x: DropdownMenu.HorizontalAnchors.CENTER,
              y: DropdownMenu.VerticalAnchors.OVERLAP,
            }}
            position={DropdownMenu.Positions.BELOW}
            style={{cursor:"pointer"}}
          >
            <TextField
              id="dropdown-menu-textfield"
              label="Add sensor type"
              disabled
              inlineIndicator={<FontIcon>arrow_drop_down</FontIcon>}
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
