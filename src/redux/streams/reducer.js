import Immutable from 'seamless-immutable';

import { STREAMS_TYPES } from './actions.js';

export const DEFAULT_STATE = {
  filter: {
    location:null,
    geo:null
  },
  streams: {},
  fetchingStreams: false
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
      newStreams[action.stream.id] = action.stream;

      return Immutable.merge(state, {streams: newStreams});
    }
  }

  return state;
}
