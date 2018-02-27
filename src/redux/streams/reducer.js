import Immutable from 'seamless-immutable';

import { STREAMS_TYPES } from './actions.js';

export const DEFAULT_STATE = {
  filter: {
    location:null,
    types:[ //Types in current filter
      {
        id:'temperature',
        name:'Temperature'
      },
      {
        id:'humidity',
        name:'Humidity'
      },
      {
        id:'pm10',
        name:'PM10'
      },
      {
        id:'pm25',
        name:'PM2.5'
      }
    ]
  },
  streams: {},
  fetchingStreams: false,
  stream_types: [ //All possible types the user could filter on
    {
      id:'temperature',
      name:'Temperature'
    },
    {
      id:'humidity',
      name:'Humidity'
    },
    {
      id:'pm10',
      name:'PM10'
    },
    {
      id:'pm25',
      name:'PM2.5'
    }
  ]
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
