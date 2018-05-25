import _ from 'lodash';
import axios from '../../utils/axios';
import Bluebird from 'bluebird';
import { BigNumber } from 'bignumber.js';

export const LISTING_TYPES = {
  FETCH_LISTINGS: 'FETCH_LISTINGS',
  FETCHING_LISTINGS: 'FETCHING_LISTINGS',
  ENLISTING_STREAM: 'ENLISTING_STREAM'
};

export const LISTING_ACTIONS = {
  fetchListings: () => {
    return (dispatch, getState) => {
      dispatch({
        type: LISTING_TYPES.FETCHING_LISTINGS,
        value: true
      });

      const authenticatedAxiosClient = axios(null, true);

      const address = localStorage.getItem('address');
      authenticatedAxiosClient
        .get(`/sensorregistry/list?limit=10&owner=~${address}`)
        .then(response => {
          const listings = response.data.items;

          const parsedResponse = [];
          _.each(listings, listing => {
            parsedResponse.push({
              key: listing.key,
              name: listing.name,
              type: listing.type,
              updateinterval: listing.updateinterval
            });
          });

          dispatch({
            type: LISTING_TYPES.FETCH_LISTINGS,
            listings: parsedResponse
          });
        })
        .catch(error => {
          console.log(error);
        });
    };
  },
  enlistStream: stream => {
    return (dispatch, getState) => {
      dispatch({
        type: LISTING_TYPES.ENLISTING_STREAM,
        value: true
      });

      const authenticatedAxiosClient = axios(null, true);

      function getDtxTokenRegistry() {
        return authenticatedAxiosClient.get('/dtxtokenregistry/list');
      }

      function getStreamRegistry() {
        return authenticatedAxiosClient.get('/sensorregistry/list');
      }

      function getMetadataHash() {
        return authenticatedAxiosClient.post('/ipfs/add/json', {
          data: {
            name: stream.name,
            geo: {
              lat: stream.lat,
              lng: stream.lng
            },
            type: stream.type,
            example: stream.example,
            updateinterval: stream.updateinterval * 1000
          }
        });
      }

      Bluebird.all([
        getDtxTokenRegistry(),
        getStreamRegistry(),
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
            value: BigNumber(stream.stake)
              .times(BigNumber(10).pow(18))
              .toString()
          })
          .then(response => {
            //Tokens have been allocated - now we can make the purchase!
            authenticatedAxiosClient
              .post(`/sensorregistry/enlist`, {
                stakeamount: BigNumber(stream.stake)
                  .times(BigNumber(10).pow(18))
                  .toString(),
                price: BigNumber(stream.price)
                  .times(BigNumber(10).pow(18))
                  .toString(),
                metadata: metadataHash
              })
              .then(response => {
                dispatch({
                  type: LISTING_TYPES.ENLISTING_STREAM,
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
