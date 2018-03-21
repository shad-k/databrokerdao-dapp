import _ from 'lodash';
import axios from '../../utils/axios';

export const WALLET_TYPES = {
  FETCH_WALLET: 'FETCH_WALLET',
  FETCHING_WALLET: 'FETCHING_WALLET'
};

export const WALLET_ACTIONS = {
  fetchWallet: () => {
    return (dispatch, getState) => {
      dispatch({
        type: WALLET_TYPES.FETCHING_WALLET,
        value: true
      });

      const authenticatedAxiosClient = axios(null,true);
      authenticatedAxiosClient.get(
        "/my-wallet"
      ).then(response => {
        const wallet = response.data.DTX;

        console.log("Wallet in action:");
        console.log(wallet);

        dispatch({
          type: WALLET_TYPES.FETCH_WALLET,
          wallet
        });
      }).catch(error => {
        console.log(error);
      });
    }
  }
}
