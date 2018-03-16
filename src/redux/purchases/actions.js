import _ from 'lodash';
import axios from '../../utils/axios';

export const PURCHASES_TYPES = {
  FETCH_PURCHASES: 'FETCH_PURCHASES',
  FETCHING_PURCHASES: 'FETCHING_PURCHASES',
  PURCHASE_ACCESS: 'PURCHASE_ACCESS'
};

export const PURCHASES_ACTIONS = {
  fetchPurchases: (dispatch) => {
    dispatch({
      type: PURCHASES_TYPES.FETCHING_PURCHASES,
      value: true
    });

    const parsedResponse = [
        {
          key:"brolol123",
          name:"Barvista Toilet sensor",
          type:"Temperture"
        },
        {
          key:"lololbrol9090",
          name:"Het Archief geluidsensor",
          type:"Temperture"
        }
      ];

    dispatch({
      type: PURCHASES_TYPES.FETCH_PURCHASES,
      purchases: parsedResponse
    });
  }
};
