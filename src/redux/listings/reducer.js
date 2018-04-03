import Immutable from 'seamless-immutable';

import { LISTING_TYPES } from './actions.js';

export const DEFAULT_STATE = {
  listings: [],
  fetchingListings: false,
  enlistingStream: false
};

export default function(state = Immutable(DEFAULT_STATE), action) {
  switch(action.type){
    case LISTING_TYPES.FETCHING_LISTINGS:{
      return Immutable.set(state, "fetchingListings", action.value);
    }
    case LISTING_TYPES.FETCH_LISTINGS:{
      return Immutable.merge(state, {listings: action.listings, fetchingListings: false});
    }
    case LISTING_TYPES.ENLISTING_STREAM:{
      return Immutable.set(state, "enlistingStream", action.value);
    }
    default:
        return state;
  }
}
