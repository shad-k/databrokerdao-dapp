//Import axios
import _ from 'lodash';

import EXAMPLE_STREAMS_API_RESPONSE from '../../example-api-responses/streams';

export const STREAMS_TYPES = {
  FETCH_STREAMS: 'FETCH_STREAMS',
  FETCHING_STREAMS: 'FETCHING_STREAMS',
  FETCH_STREAM: 'FETCH_STREAM',
  FETCH_AVAILABLE_STREAM_TYPES: 'FETCH_AVAILABLE_STREAM_TYPES',
  UPDATED_FILTER: 'UPDATED_FILTER'
};

export const STREAMS_ACTIONS = {
  fetchStreams: (dispatch, filter = {}) => {
    const response = JSON.parse(EXAMPLE_STREAMS_API_RESPONSE);

    const parsedResponse = {};
    _.each(response.items, (item) => {
      parsedResponse[item._id] = {
        id:item._id,
        name:item.metadata.name,
        type:item.metadata.type,
        price:item.price,
        stake:item.stake,
        example:item.metadata.example,
        geo:item.metadata.geo
      };
    });

    console.log(parsedResponse);

    //This is where we will do api call to get new streams
    dispatch({
      type: STREAMS_TYPES.FETCHING_STREAMS,
      value: true
    });

    //TODO: replace timeout with api call
    setTimeout(() => {
      dispatch({
        type: STREAMS_TYPES.FETCH_STREAMS,
        streams: parsedResponse
      });
    },500);

  },
  fetchStream: (dispatch, streamID) => {
    setTimeout(() => {
      dispatch({
        type: STREAMS_TYPES.FETCH_STREAM,
        stream: {
          id:'63452',
          name:'De Rector party level',
          type:'temperature',
          geo: {
            lat: '50.878451',
            lng: '4.699932'
          },
          price: '18',
          stake: '100',
          example:'{temperature:21, women:19, men:49}'
        }
      });
    },1000);
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
