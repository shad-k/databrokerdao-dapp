import _ from 'lodash';
import axios from '../../utils/axios';
import Bluebird from 'bluebird';
import moment from 'moment';
import { ecies } from '@settlemint/lib-crypto';
import stripHexPrefix from 'strip-hex-prefix';
import Wallet from 'ethereumjs-wallet';

export const PURCHASES_TYPES = {
  FETCH_PURCHASES: 'FETCH_PURCHASES',
  FETCHING_PURCHASES: 'FETCHING_PURCHASES',
  PURCHASE_ACCESS: 'PURCHASE_ACCESS',
  PURCHASING_ACCESS: 'PURCHASING_ACCESS'
};

export const PURCHASES_ACTIONS = {
  fetchPurchases: () => {
    return (dispatch, getState) => {
      const state = getState();

      dispatch({
        type: PURCHASES_TYPES.FETCHING_PURCHASES,
        value: true
      });

      const authenticatedAxiosClient = axios(null, true);

      function getStreamDetails(streamKey) {
        return authenticatedAxiosClient.get(
          `/sensorregistry/list/${streamKey}`
        );
      }

      const email = localStorage.getItem('email');
      authenticatedAxiosClient
        .get(`/purchaseregistry/list?email=${email}`)
        .then(response => {
          const purchases = response.data.items;

          const streamDetailCalls = [];
          _.each(purchases, purchase => {
            streamDetailCalls.push(getStreamDetails(purchase.sensor));
          });

          Bluebird.all(streamDetailCalls).then(streamDetails => {
            const parsedResponse = [];

            for (let i = 0; i < purchases.length; i++) {
              parsedResponse.push({
                key: purchases[i].sensor,
                name: streamDetails[i].data.name,
                type: streamDetails[i].data.type,
                endTime: purchases[i].endtime,
                updateinterval: streamDetails[i].data.updateinterval
              });
            }

            dispatch({
              type: PURCHASES_TYPES.FETCH_PURCHASES,
              purchases: parsedResponse
            });
          });
        })
        .catch(error => {
          console.log(error);
        });
    };
  },
  purchaseAccess: (stream, endTime) => {
    return (dispatch, getState) => {
      dispatch({
        type: PURCHASES_TYPES.PURCHASING_ACCESS,
        value: true
      });

      const authenticatedAxiosClient = axios(null, true);

      const duration = moment.duration(moment(endTime).diff(moment()));
      const purchasePrice = stream.price * duration;

      function getDtxTokenRegistry() {
        return authenticatedAxiosClient.get('/dtxtokenregistry/list');
      }

      function getPurchaseRegistry() {
        return authenticatedAxiosClient.get('/purchaseregistry/list');
      }

      function getMetadataHash() {
        const email = ecies.encryptMessage(
          Buffer.from(stripHexPrefix(localStorage.getItem('pk')), 'hex'),
          Buffer.from(
            stripHexPrefix(process.env.REACT_APP_SERVER_PUBLIC_KEY),
            'hex'
          ),
          localStorage.getItem('email')
        );

        return authenticatedAxiosClient.post('/ipfs/add/json', {
          data: {
            email
          }
        });
      }

      Bluebird.all([
        getDtxTokenRegistry(),
        getPurchaseRegistry(),
        getMetadataHash()
      ]).then(responses => {
        const deployedTokenContractAddress =
          responses[0].data.items[0].contractaddress;
        const spenderAddress = responses[1].data.base.key;
        const metadataHash = responses[2].data[0].hash;
        // Time to approve the tokens
        authenticatedAxiosClient
          .post(`/dtxtoken/${deployedTokenContractAddress}/approve`, {
            spender: spenderAddress, // The contract that will spend the tokens (some function of the contract will)
            value: purchasePrice.toString()
          })
          .then(response => {
            //Tokens have been allocated - now we can make the purchase!
            authenticatedAxiosClient
              .post(`/purchaseregistry/purchaseaccess`, {
                sensor: stream.key,
                endtime: moment(endTime)
                  .unix()
                  .toString(),
                metadata: metadataHash
              })
              .then(response => {
                dispatch({
                  type: PURCHASES_TYPES.PURCHASING_ACCESS,
                  value: false
                });
              });
          })
          .catch(error => {
            console.log(error);
          });
      });
    };
  }
};
