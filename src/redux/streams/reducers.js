import Immutable from 'seamless-immutable';

import { STREAMS_ACTION_TYPES } from './actions.js';

export const DEFAULT_STATE = {
  filter: {
    location:'everywhere'
  },
  streams: [
    {
      type:'temperature',
      name:'Barvista Party Level'
    }
  ]
};

function fetchedStreams (state, action) {
  console.log("Fetched streams reducer");
  console.log(action.payload);
  return state; // Add the streams from action.payload
}

const ACTIONS = {
  [STREAMS_ACTION_TYPES.FETCH_STREAMS]: fetchedStreams
}

export default createReducer(Immutable(DEFAULT_STATE), ACTIONS);
