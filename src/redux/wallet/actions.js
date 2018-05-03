import axios from '../../utils/axios';

export const WALLET_TYPES = {
  FETCH_WALLET: 'FETCH_WALLET',
  FETCHING_WALLET: 'FETCHING_WALLET',
  MINTING_TOKENS: 'MINTING_TOKENS'
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

        dispatch({
          type: WALLET_TYPES.FETCH_WALLET,
          wallet
        });
      }).catch(error => {
        console.log(error);
      });

      //TODO temp code to test /events
      authenticatedAxiosClient.get(
        "/events?user=~0x75f472f3ffb3cc68722f0705053de94b8d4b1a91"
      ).then(response => {
        console.log("EVENTS:");
        console.log(response);
      });

    }
  },
  mintTokens: (amount) => {
    return(dispatch,getState) => {
      dispatch({
        type: WALLET_TYPES.MINTING_TOKENS,
        value: true
      });

      const authenticatedAxiosClient = axios(null,true);
      authenticatedAxiosClient.post(
        "/dtxminter/mint", {
          amount: amount
        }
      ).then(response => {
        dispatch({
          type: WALLET_TYPES.MINTING_TOKENS,
          value: false
        });
        authenticatedAxiosClient.get(
          "/my-wallet"
        ).then(response => {
          const wallet = response.data.DTX;

          dispatch({
            type: WALLET_TYPES.FETCH_WALLET,
            wallet
          });
        }).catch(error => {
          console.log(error);
        });
      }).catch(error => {
        console.log(error);
      });
    }
  }
}
