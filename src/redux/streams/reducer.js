import Immutable from 'seamless-immutable';

import { STREAMS_TYPES } from './actions.js';

export const DEFAULT_STATE = {
  filter: {
    location:null,
    types:['temperature','humidity','PM25','PM10'] //Types in current filter
  },
  streams: {},
  fetchingStreams: false,
  availableStreamTypes: [] //All possible types the user could filter on
};

export default function(state = Immutable(DEFAULT_STATE), action) {
  switch(action.type){
    case STREAMS_TYPES.FETCHING_STREAMS:{
      return Immutable.set(state, "fetchingStreams", action.value);
    }
    case STREAMS_TYPES.FETCH_STREAMS:{
      return Immutable.merge(state, {streams: action.streams, fetchingStreams: false});
    }
    case STREAMS_TYPES.FETCH_STREAM:{
      const newStreams = Immutable.asMutable(state, {deep:true}).streams;
      newStreams[action.stream.key] = action.stream;
      return Immutable.merge(state, {streams: newStreams});
    }
    case STREAMS_TYPES.FETCH_AVAILABLE_STREAM_TYPES:{
      return Immutable.merge(state, {availableStreamTypes: action.availableStreamTypes})
    }
    case STREAMS_TYPES.UPDATED_FILTER:{
      return Immutable.merge(state, {filter: action.filter});
    }
    default:
      return state;
  }
}
