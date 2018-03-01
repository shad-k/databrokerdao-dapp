//Import axios

export const STREAMS_TYPES = {
  FETCH_STREAMS: 'FETCH_STREAMS',
  FETCHING_STREAMS: 'FETCHING_STREAMS',
  FETCH_STREAM: 'FETCH_STREAM',
  FETCH_AVAILABLE_STREAM_TYPES: 'FETCH_AVAILABLE_STREAM_TYPES',
  REMOVE_FILTER_TYPE: 'REMOVE_FILTER_TYPE', //depracted
  ADD_FILTER_TYPE: 'ADD_FILTER_TYPE', //depracted
  UPDATED_FILTER: 'UPDATED_FILTER'
};

export const STREAMS_ACTIONS = {
  fetchStreams: (dispatch, filter = {}) => {
    console.log("Fetch streams!!11!!");

    //This is where we will do api call to get new streams
    dispatch({
      type: STREAMS_TYPES.FETCHING_STREAMS,
      value: true
    });

    //TODO: replace timeout with api call
    setTimeout(() => {
      dispatch({
        type: STREAMS_TYPES.FETCH_STREAMS,
        streams: {
          12323: {
            id:'12323',
            name:'Barvista temperature',
            type:'pm10',
            geo: {
              lat: '50.848451',
              lng: '4.692932'
            },
            price: '20',
            stake: '200',
            example:'{temperature:23, women:29, men:183}'
          },
          3223: {
            id:'3223',
            name:'Seven Oaks temperature',
            type:'temperature',
            geo: {
              lat: '50.878451',
              lng: '4.699932'
            },
            price: '30',
            stake: '5000',
            example:'{temperature:22, women:12, men:89}'
          }
        }
      });
    },2000);

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
