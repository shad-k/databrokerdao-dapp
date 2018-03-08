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

  constructor(props){
    super(props);

    this.state = {
      selectedType: "0"
    };
  }

  addTypeToFilter(event){
    const newFilter = Immutable.asMutable(this.props.filter, {deep:true});
    const newType = event.target.value;

    if(_.indexOf(newFilter.types, newType) === -1){
      newFilter.types = _.concat(newFilter.types, newType);
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

    const options = [<option key="0" value="0">-- add stream type --</option>];

    //Concatenate arrays
    return _.concat(options,_.map(types, type => {
      return(
        <option key={type.id} value={type.id}>
          {type.name}
        </option>
      )
    }));
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
      margin: 14px 16px 14px 16px;
    `;

    const StyledDropdownMenu = styled(DropdownMenu)`
      width: 100%;
      margin-bottom: 16px;
    `;

    const StyledSelect = styled.select`
      height:30px;
      font-size:16px;
      color:rgba(0,0,0,0.7);
      background-color:white;
      width:100%;
      border:1px solid rgba(0,0,0,0.2);
      border-radius:8px;
      margin-bottom:20px;
    `;

    return (
      <div style={{padding:"16px"}}>
        <h2>Location</h2>
        <StyledSelect>
          <option value="leuven">Leuven</option>
          <option value="newyorkcity" disabled>New York City</option>
          <option value="singapore" disabled>Singapore</option>
        </StyledSelect>
        {/*}<Autocomplete
          id="sensor-type-filter"
          label="Location"
          data={["Antwerp","Brussels","Leuven","Hasselt","Kortrijk","Ghent"]}
          filter={Autocomplete.caseInsensitiveFilter}
          defaultValue="Leuven, Belgium"
          disabled
        />*/}
        <h2>Type</h2>
        <StyledSelect value={this.state.selectedType} onChange={(event) => this.addTypeToFilter(event)}>
          {this.renderTypeListItems()}
        </StyledSelect>
        {/*}<StyledDropdownMenu
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
        </StyledDropdownMenu>*/}

        {this.renderTypeChips()}
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
