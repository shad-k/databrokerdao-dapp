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
    if(_.findIndex(newFilter.types,(_type)=>{return _.isEqual(_type.id,type.id)}) === -1)
      newFilter.types = _.concat(newFilter.types, type);

    this.props.updateFilter(newFilter);
  }

  removeTypeFromFilter(id){
    const newFilter = Immutable.asMutable(this.props.filter, {deep:true});
    newFilter.types = _.remove(newFilter.types, (type) => {return !_.isEqual(type.id, id)});

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

    return _.map(types, type => {
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
    updateFilter: (filter) => STREAMS_ACTIONS.updateFilter(dispatch, filter)
  }
}

const mapStateToProps = state => ({
  availableStreamTypes: state.streams.availableStreamTypes,
  filter: state.streams.filter
})

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
