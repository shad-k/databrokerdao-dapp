//Import axios
import _ from 'lodash';

import axios from '../../utils/axios';

//TODO remove when API call works
import EXAMPLE_STREAMS_API_RESPONSE from '../../example-api-responses/streams';

export const STREAMS_TYPES = {
  FETCH_STREAMS: 'FETCH_STREAMS',
  FETCHING_STREAMS: 'FETCHING_STREAMS',
  FETCH_STREAM: 'FETCH_STREAM',
  FETCH_AVAILABLE_STREAM_TYPES: 'FETCH_AVAILABLE_STREAM_TYPES',
  UPDATED_FILTER: 'UPDATED_FILTER'
};

async function fetchStreamsFromAPI(){
  const anonymousJWTToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJldGhlcmV1bSI6IjA0OWI3MWExMDgzMDExZmIwZmU4ZGIwYzE2NDcyNGQzZGFkOWZiYjliNGE0NDBiZGM5NDkyNzg0YTQ5NzZlODgyMTJkYWUyMDFlMjIwODc5ZjcwZmQ5YTgyOWQwMWQxOTk2MjUyZmFhMWE5Y2NmY2UwYmYxNTMyMzAyMzlmZmRiNWUwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDJkYjFhOTI1NmMxZDM5M2RkOTNhYWU3MzIzYWU2NWFhY2Y3MDZmNThjNWQwZTAxZTg5YzM5OTYwMDZhYTFhMzlhNjQ3NDk5NjliMTViNmQwMzNiOThhOTZkOWM0NjhlNmRiM2M0OTBmMGE4ODJmN2MzZWFmNTgyYTNjZjU1OTY5IiwiaWF0IjoxNTE5MTE2NTA1fQ.flVIw-ChcFNLRj1_-Bz4He3jBL126xGgIVUOoBSAhnc";
  const authenticatedAxiosClient = localStorage.getItem('jwtToken')?axios(localStorage.getItem('jwtToken')):axios(anonymousJWTToken);
  const response = await authenticatedAxiosClient.get(
    `/streamregistry/list`
  );
  console.log("Streams gekregen:");
  console.log(response);

  //TODO store in Redux state
}

export const STREAMS_ACTIONS = {
  fetchStreams: async (dispatch, filter = {}) => {
    dispatch({
      type: STREAMS_TYPES.FETCHING_STREAMS,
      value: true
    });

    const authenticatedAxiosClient = axios(null,true);
    const response = await authenticatedAxiosClient.get(
      `/streamregistry/list`
    );

    const parsedResponse = {};
    _.each(response.data.items, (item) => {
      parsedResponse[item.key] = {
        id:item._id,
        key:item.key,
        name:item.name,
        type:item.type.toLowerCase(),
        price:item.price,
        stake:item.stake,
        example:item.example,
        geo:item.geo
      };
    });

    dispatch({
      type: STREAMS_TYPES.FETCH_STREAMS,
      streams: parsedResponse
    });
  },
  fetchStream: async (dispatch, streamKey) => {
    const authenticatedAxiosClient = axios(null,true);
    const response = await authenticatedAxiosClient.get(
      `/streamregistry/list/${streamKey}`
    );

    const responseStream = response.data;
    const parsedResponse = {
      id:responseStream._id,
      key:responseStream.key,
      name:responseStream.name,
      type:responseStream.type.toLowerCase(),
      price:responseStream.price,
      stake:responseStream.stake,
      example:responseStream.example,
      geo:responseStream.geo
    };

    dispatch({
      type: STREAMS_TYPES.FETCH_STREAM,
      stream: parsedResponse
    });
  },
  fetchAvailableStreamTypes: (dispatch) => {
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
        pm10: {
          id:'pm10',
          name:'PM10'
        },
        pm25: {
          id:'pm25',
          name:'PM2.5'
        }
      }
    });
  },
  updateFilter: (dispatch, filter) => {
    dispatch({
      type: STREAMS_TYPES.UPDATED_FILTER,
      filter //ES6 syntax sugar
    });

    STREAMS_ACTIONS.fetchStreams(dispatch, filter);
  }
};
