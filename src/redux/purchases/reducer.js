import Immutable from 'seamless-immutable';

import { PURCHASES_TYPES } from './actions.js';

export const DEFAULT_STATE = {
  purchases: [],
  fetchingPurchases: false,
  purchasingAccess: false
};

export default function(state = Immutable(DEFAULT_STATE), action) {
  switch(action.type){
    case PURCHASES_TYPES.FETCHING_PURCHASES:{
      return Immutable.set(state, "fetchingPurchases", action.value);
    }
    case PURCHASES_TYPES.FETCH_PURCHASES:{
      return Immutable.merge(state, {purchases: action.purchases, fetchingPurchases: false});
    }
    default:
        return state;
  }
}
