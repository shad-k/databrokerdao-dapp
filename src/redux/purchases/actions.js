import _ from 'lodash';
import axios from '../../utils/axios';

export const PURCHASES_TYPES = {
  FETCH_PURCHASES: 'FETCH_PURCHASES',
  FETCHING_PURCHASES: 'FETCHING_PURCHASES',
  PURCHASE_ACCESS: 'PURCHASE_ACCESS',
  PURCHASING_ACCESS: 'PURCHASING_ACCESS'
};

export const PURCHASES_ACTIONS = {
  fetchPurchases: () => {
    return (dispatch, getState) => {
      dispatch({
        type: PURCHASES_TYPES.FETCHING_PURCHASES,
        value: true
      });

      // const authenticatedAxiosClient = axios(null,true);
      // authenticatedAxiosClient.get(
      //   "/my-wallet"
      // ).then(response => {
      //   const wallet = response.data.DTX;
      //
      //   dispatch({
      //     type: WALLET_TYPES.FETCH_WALLET,
      //     wallet
      //   });
      // }).catch(error => {
      //   console.log(error);
      // });

      //TODO hear from Silke in what format purchases are supplied
      const parsedResponse = [
          {
            key:"brolol123",
            name:"Barvista Toilet sensor",
            type:"Temperture"
          },
          {
            key:"0x94c3eebfc04828cf75475108a627de78bbf1d8e6",
            name:"Luftdaten Hum 9566",
            type:"PM25"
          }
        ];

      dispatch({
        type: PURCHASES_TYPES.FETCH_PURCHASES,
        purchases: parsedResponse
      });
    }
  },
  purchaseAccess: () => {
    return (dispatch, getState) => {
      //Set redux state purchasingaccess to true

      //API call to get address of purchase contract (TODO: not always the same? cannot be hardcoded?)

      //API call to give permission to spend tokens

      //API call to make purchase

      //Dispatch to reducer to add new purchase to purchases list
    }
  }
};
