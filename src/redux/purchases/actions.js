import _ from 'lodash';
import axios from '../../utils/axios';

export const PURCHASES_TYPES = {
  FETCH_PURCHASES: 'FETCH_PURCHASES',
  FETCHING_PURCHASES: 'FETCHING_PURCHASES',
  PURCHASE_ACCESS: 'PURCHASE_ACCESS',
  PURCHASING_ACCESS: 'PURCHASING_ACCESS'
};

export const PURCHASES_ACTIONS = {
  fetchPurchases: (dispatch) => {
    dispatch({
      type: PURCHASES_TYPES.FETCHING_PURCHASES,
      value: true
    });

    //TODO hear from Silke in what format purchases are supplied
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
  },
  purchaseAccess: (dispatch) => {
    //Set redux state purchasingaccess to true

    //API call to get address of purchase contract (TODO: not always the same? cannot be hardcoded?)

    //API call to give permission to spend tokens

    //API call to make purchase

    //Dispatch to reducer to add new purchase to purchases list
  }
};
