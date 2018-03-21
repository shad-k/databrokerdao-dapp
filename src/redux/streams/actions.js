import _ from 'lodash';
import axios from '../../utils/axios';

//TODO remove when API call works
import EXAMPLE_STREAMS_API_RESPONSE from '../../example-api-responses/streams';

export const STREAMS_TYPES = {
  FETCH_STREAMS: 'FETCH_STREAMS',
  FETCHING_STREAMS: 'FETCHING_STREAMS',
  FETCH_STREAM: 'FETCH_STREAM',
  FETCH_LANDING_STREAMS: 'FETCH_LANDING_STREAMS',
  FETCH_AVAILABLE_STREAM_TYPES: 'FETCH_AVAILABLE_STREAM_TYPES',
  UPDATED_FILTER: 'UPDATED_FILTER',
  UPDATED_MAP: 'UPDATED_MAP'
};

export const STREAMS_ACTIONS = {
  fetchStreams: (_filter, _lat, _lng, _distance) => {
    return (dispatch, getState) => {
      const state = getState();

      dispatch({
        type: STREAMS_TYPES.FETCHING_STREAMS,
        value: true
      });

      let filterUrlQuery = "";

      //Filter on type
      const filter = (_filter)?_filter:state.streams.filter;
      if(filter.types && filter.types.length === 1)
        filterUrlQuery = `type=${filter.types[0]}`;
      else
        filterUrlQuery = _.map(filter.types,(type) => {return `type[]=${type}`}).join("&");

      if(_filter){
        dispatch({
          type: STREAMS_TYPES.UPDATED_FILTER,
          filter //ES6 syntax sugar
        });
      }

      //Only get streams near certain point
      if(_lat && _lng && _distance){
        filterUrlQuery += `&near=${_lat},${_lng},${_distance}`;
        dispatch({
          type: STREAMS_TYPES.UPDATED_MAP,
          map:{
            distance:_distance,
            lat:_lat,
            lng:_lng
          }
        });
      }
      else{ // Get from Redux state
        const distance = state.streams.map.distance;
        const lat = state.streams.map.lat;
        const lng = state.streams.map.lng;

        filterUrlQuery += `&near=${lat},${lng},${distance}`;
      }

      const limit = 5000;

      const authenticatedAxiosClient = axios(null,true);
      //const response = JSON.parse(EXAMPLE_STREAMS_API_RESPONSE);

      authenticatedAxiosClient.get(
        `/streamregistry/list?limit=${limit}&${filterUrlQuery}`
      ).then(response => {
        const parsedResponse = {};
        _.each(response.data.items, (item) => {
          //Temporary filter out streams at same coordinates (should be supported in UI in future)
          const itemAtSameCoordinates = _.find(parsedResponse, parsedItem => {
            return parsedItem.geometry.coordinates[0] === item.geo.coordinates[1] && parsedItem.geometry.coordinates[1] === item.geo.coordinates[0];
          });

          if(!itemAtSameCoordinates){
            parsedResponse[item.key] = {
              id:item._id,
              key:item.key,
              name:item.name,
              type:item.type,
              price:item.price,
              stake:item.stake,
              example:item.example,
              geometry:{
                "type": "Point",
                "coordinates": [item.geo.coordinates[1], item.geo.coordinates[0]]
              }
            };
          }
        });
        dispatch({
          type: STREAMS_TYPES.FETCH_STREAMS,
          streams: parsedResponse
        });

      }).catch(error => {
        console.log(error);
      });
    }
  },
  fetchStream: (dispatch, streamKey) => {
    return (dispatch, getState) => {
      const authenticatedAxiosClient = axios(null,true);
      authenticatedAxiosClient.get(
        `/streamregistry/list/${streamKey}`
      ).then(response => {
        let parsedResponse = null;
        if(response.data._id){
           parsedResponse= {
            id:response.data._id,
            key:response.data.key,
            name:response.data.name,
            type:response.data.type,
            price:response.data.price,
            stake:response.data.stake,
            example:response.data.example,
            geometry:{
              "type": "Point",
              "coordinates": [response.data.geo.coordinates[1], response.data.geo.coordinates[0]]
            }
          };
        }
        else {
          parsedResponse = {};
        }

        dispatch({
          type: STREAMS_TYPES.FETCH_STREAM,
          stream: parsedResponse
        });
      }).catch(error => {
        console.log(error);
      });
    }
  },
  fetchLandingStreams: () => {
    return (dispatch, getState) => {
      const authenticatedAxiosClient = axios(null,true);
      authenticatedAxiosClient.get(
        `/streamregistry/list?limit=100&near=50.879844,4.700518,4000` //TODO add near parameter
      ).then(response => {
        const parsedResponse = {};
        _.each(response.data.items, (item) => {
          const itemAtSameCoordinates = _.find(parsedResponse, parsedItem => {
            return parsedItem.geometry.coordinates[0] === item.geo.coordinates[1] && parsedItem.geometry.coordinates[1] === item.geo.coordinates[0];
          });

          if(!itemAtSameCoordinates){
            parsedResponse[item.key] = {
              id:item._id,
              key:item.key,
              name:item.name,
              type:item.type,
              price:item.price,
              stake:item.stake,
              example:item.example,
              geometry:{
                "type": "Point",
                "coordinates": [item.geo.coordinates[1], item.geo.coordinates[0]]
              }
            };
          }
        });

        dispatch({
          type: STREAMS_TYPES.FETCH_LANDING_STREAMS,
          streams: parsedResponse
        });
      }).catch(error => {
        console.log(error);
      });
    }
  },
  fetchAvailableStreamTypes: () => {
    return (dispatch, getState) => {
      dispatch({
        type: STREAMS_TYPES.FETCH_AVAILABLE_STREAM_TYPES,
        availableStreamTypes: {
          temperature: {
            id:'temperature',
            name:'Temperature'
          },
          humidity: {
            id:'humidity',
            name:'Humidity'
          },
          PM10: {
            id:'PM10',
            name:'PM10'
          },
          'PM25': {
            id:'PM25',
            name:'PM25'
          }
        }
      });
    }
  },
  updateFilter: (filter) => { //Used by landing page
    return (dispatch, getState) => {
      dispatch({
        type: STREAMS_TYPES.UPDATED_FILTER,
        filter //ES6 syntax sugar
      });

      STREAMS_ACTIONS.fetchStreams(dispatch, filter);
    }
  }
};
