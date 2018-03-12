import React, { Component } from 'react';
import styled from 'styled-components';
import { Chip, Avatar } from 'react-md';
import { connect } from 'react-redux'
import _ from 'lodash';
import Immutable from 'seamless-immutable';

import Icon from '../generic/Icon';
import { STREAMS_ACTIONS } from '../../redux/streams/actions';

class Filter extends Component {
  componentDidMount() {
    this.props.fetchAvailableStreamTypes();
    this.props.fetchStreams(this.props.filter);
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
      this.props.fetchStreams(newFilter);
    }
  }

  removeTypeFromFilter(id){
    const newFilter = Immutable.asMutable(this.props.filter, {deep:true});
    newFilter.types = _.pull(newFilter.types, id);
    this.props.updateFilter(newFilter);
    this.props.fetchStreams(newFilter);
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

    if(availableTypes.length === 0)
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
    const StyledSelect = styled.select`
      height:30px;
      font-size:16px;
      color:rgba(0,0,0,0.7);
      background-color:white;
      width:100%;
      border:1px solid rgba(0,0,0,0.2);
      border-radius:8px;
      margin-bottom:20px;
      -moz-appearance:none;
      outline:0;
      &:-moz-focusring {
        color: transparent;
        text-shadow: 0 0 0 #000;
      }
    `;

    return (
      <div style={{padding:"16px"}}>
        <h2>Location</h2>
        <StyledSelect>
          <option value="leuven">Leuven</option>
          <option value="newyorkcity" disabled>New York City</option>
          <option value="singapore" disabled>Singapore</option>
        </StyledSelect>
        <h2>Type</h2>
        <StyledSelect value={this.state.selectedType} onChange={(event) => this.addTypeToFilter(event)}>
          {this.renderTypeListItems()}
        </StyledSelect>
        {this.renderTypeChips()}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchStreams: (filter) => STREAMS_ACTIONS.fetchStreams(dispatch,filter),
    fetchAvailableStreamTypes: () => STREAMS_ACTIONS.fetchAvailableStreamTypes(dispatch),
    updateFilter: (filter) => STREAMS_ACTIONS.updateFilter(dispatch, filter)
  }
}

const mapStateToProps = state => ({
  availableStreamTypes: state.streams.availableStreamTypes,
  filter: state.streams.filter
})

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
