import _ from 'lodash';
import axios from '../../utils/axios';
import Bluebird from 'bluebird';
import { BigNumber } from 'bignumber.js';

//TODO remove when API call works
import EXAMPLE_STREAMS_API_RESPONSE from '../../example-api-responses/streams';

export const STREAMS_TYPES = {
  FETCH_STREAMS: 'FETCH_STREAMS',
  FETCHING_STREAMS: 'FETCHING_STREAMS',
  FETCH_STREAM: 'FETCH_STREAM',
  FETCH_LANDING_STREAMS: 'FETCH_LANDING_STREAMS',
  FETCH_AVAILABLE_STREAM_TYPES: 'FETCH_AVAILABLE_STREAM_TYPES',
  UPDATED_FILTER: 'UPDATED_FILTER',
  UPDATED_MAP: 'UPDATED_MAP',
  FETCH_STREAM_COUNTER: 'FETCH_STREAM_COUNTER',
  CHALLENGING_STREAM: 'CHALLENGING_STREAM'
};

export const STREAMS_ACTIONS = {
  fetchStreams: (_filter, _lat, _lng, _distance) => {
    return (dispatch, getState) => {
      const state = getState();

      dispatch({
        type: STREAMS_TYPES.FETCHING_STREAMS,
        value: true
      });

      let filterUrlQuery = '';

      //Filter on type
      const filter = _filter ? _filter : state.streams.filter;
      if (filter.types && filter.types.length === 1)
        filterUrlQuery = `type=${filter.types[0]}`;
      else
        filterUrlQuery = _.map(filter.types, type => {
          return `type[]=${type}`;
        }).join('&');

      if (_filter) {
        dispatch({
          type: STREAMS_TYPES.UPDATED_FILTER,
          filter //ES6 syntax sugar
        });
      }

      //Only get streams near certain point
      if (_lat && _lng && _distance) {
        filterUrlQuery += `&near=${_lng},${_lat},${_distance}`;
        dispatch({
          type: STREAMS_TYPES.UPDATED_MAP,
          map: {
            distance: _distance,
            lat: _lat,
            lng: _lng
          }
        });
      } else {
        // Get from Redux state
        const distance = state.streams.map.distance;
        const lat = state.streams.map.lat;
        const lng = state.streams.map.lng;

        filterUrlQuery += `&near=${lng},${lat},${distance}`;
      }

      const limit = 5000;

      const authenticatedAxiosClient = axios(null, true);
      //const response = JSON.parse(EXAMPLE_STREAMS_API_RESPONSE);
      const fetchStreamCounter = state.streams.fetchStreamCounter + 1;

      //Counter to keep track of calls so when response arrives we can take the latest
      (counter => {
        authenticatedAxiosClient
          .get(`/sensorregistry/list?limit=${limit}&${filterUrlQuery}&sort=stake`)
          .then(response => {
            if (counter !== getState().streams.fetchStreamCounter) {
              // console.log(counter);
              // console.log(getState().streams.fetchStreamCounter);
              return;
            }
            const parsedResponse = {};
            _.each(response.data.items, item => {
              //Temporary filter out streams at same coordinates (should be supported in UI in future)
              const itemAtSameCoordinates = _.find(
                parsedResponse,
                parsedItem => {
                  return (
                    parsedItem.geometry.coordinates[0] ===
                      item.geo.coordinates[1] &&
                    parsedItem.geometry.coordinates[1] ===
                      item.geo.coordinates[0]
                  );
                }
              );

              if (!itemAtSameCoordinates) {
                parsedResponse[item.key] = {
                  id: item._id,
                  key: item.key,
                  name: item.name,
                  type: item.type,
                  price: item.price,
                  updateinterval: item.updateinterval,
                  stake: item.stake,
                  example: item.example,
                  geometry: {
                    type: 'Point',
                    coordinates: [
                      item.geo.coordinates[1],
                      item.geo.coordinates[0]
                    ]
                  },
                  owner: item.owner,
                  challenges: item.challenges,
                  challengesstake: item.challengesstake
                };
              }
            });
            if (1 === 1) console.log('Fetched streams v2');
            dispatch({
              type: STREAMS_TYPES.FETCH_STREAMS,
              streams: parsedResponse
            });
          })
          .catch(error => {
            console.log(error);
          });
      })(fetchStreamCounter);
      dispatch({
        type: STREAMS_TYPES.FETCH_STREAM_COUNTER,
        value: fetchStreamCounter
      });
    };
  },
  fetchStream: (dispatch, streamKey) => {
    return (dispatch, getState) => {
      const authenticatedAxiosClient = axios(null, true);
      authenticatedAxiosClient
        .get(`/sensor/${streamKey}/list`)
        .then(response => {
          let parsedResponse = null;
          if (response.data.base._id) {
            parsedResponse = {
              id: response.data.base._id,
              key: response.data.base.key,
              name: response.data.base.name,
              type: response.data.base.type,
              price: response.data.base.price,
              updateinterval: response.data.base.updateinterval,
              stake: response.data.base.stake,
              example: response.data.base.example,
              geometry: {
                type: 'Point',
                coordinates: [
                  response.data.base.geo.coordinates[1],
                  response.data.base.geo.coordinates[0]
                ]
              },
              owner: response.data.base.owner,
              challenges: _.filter(response.data.items, item => {return !item.resolved}),
              challengesstake: response.data.base.challengesstake
            };
          } else {
            parsedResponse = {};
          }

          dispatch({
            type: STREAMS_TYPES.FETCH_STREAM,
            stream: parsedResponse
          });
        })
        .catch(error => {
          console.log(error);
        });
    };
  },
  fetchLandingStreams: () => {
    return (dispatch, getState) => {
      const authenticatedAxiosClient = axios(null, true);
      authenticatedAxiosClient
        .get(
          `/sensorregistry/list?limit=100&type[]=temperature&type[]=humidity&type[]=PM25&type[]=PM10&near=4.700518,50.879844,4000` //TODO add near parameter
        )
        .then(response => {
          const parsedResponse = {};
          _.each(response.data.items, item => {
            const itemAtSameCoordinates = _.find(parsedResponse, parsedItem => {
              return (
                parsedItem.geometry.coordinates[0] ===
                  item.geo.coordinates[1] &&
                parsedItem.geometry.coordinates[1] === item.geo.coordinates[0]
              );
            });

            if (!itemAtSameCoordinates) {
              parsedResponse[item.key] = {
                id: item._id,
                key: item.key,
                name: item.name,
                type: item.type,
                price: item.price,
                stake: item.stake,
                example: item.example,
                geometry: {
                  type: 'Point',
                  coordinates: [
                    item.geo.coordinates[1],
                    item.geo.coordinates[0]
                  ]
                }
              };
            }
          });

          dispatch({
            type: STREAMS_TYPES.FETCH_LANDING_STREAMS,
            streams: parsedResponse
          });
        })
        .catch(error => {
          console.log(error);
        });
    };
  },
  fetchAvailableStreamTypes: () => {
    return (dispatch, getState) => {
      dispatch({
        type: STREAMS_TYPES.FETCH_AVAILABLE_STREAM_TYPES,
        availableStreamTypes: {
          temperature: {
            id: 'temperature',
            name: 'Temperature'
          },
          humidity: {
            id: 'humidity',
            name: 'Humidity'
          },
          PM10: {
            id: 'PM10',
            name: 'PM10'
          },
          PM25: {
            id: 'PM25',
            name: 'PM25'
          }
        }
      });
    };
  },
  updateFilter: filter => {
    //Used by landing page
    return (dispatch, getState) => {
      dispatch({
        type: STREAMS_TYPES.UPDATED_FILTER,
        filter //ES6 syntax sugar
      });

      STREAMS_ACTIONS.fetchStreams(dispatch, filter);
    };
  },
  challengeStream: (stream, reason, amount) => {
    return (dispatch, getState) => {
      dispatch({
        type: STREAMS_TYPES.CHALLENGING_STREAM,
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
            reason: reason
          }
        });
      }

      Bluebird.all([getDtxTokenRegistry(), getStreamRegistry(), getMetadataHash()]).then(
        responses => {
          const deployedTokenContractAddress =
            responses[0].data.items[0].contractaddress;
          const spenderAddress = responses[1].data.base.key;
          const metadataHash = responses[2].data[0].hash;

          // Time to approve the tokens
          authenticatedAxiosClient
            .post(`/dtxtoken/${deployedTokenContractAddress}/approve`, {
              spender: spenderAddress, // The contract that will spend the tokens (some function of the contract will)
              value: amount.toString()
            })
            .then(response => {
              //Tokens have been allocated - now we can make the purchase!
              authenticatedAxiosClient
                .post(`/sensorregistry/challenge`, {
                  listing: stream.key,
                  stakeamount: amount,
                  metadata: metadataHash
                })
                .then(response => {
                  dispatch({
                    type: STREAMS_TYPES.CHALLENGING_STREAM,
                    value: false
                  });
                });
            })
            .catch(error => {
              console.log(error);
            });
        }
      );
    };
  }
};
